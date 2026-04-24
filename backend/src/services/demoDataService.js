const { mkdir, readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const bcrypt = require("bcrypt");

const { buildDefaultDemoState } = require("../data/defaultDemoState");

class DemoDataService {
  constructor({ filePath }) {
    this.filePath = filePath;
    this.state = null;
    this.writeQueue = Promise.resolve();
  }

  async init() {
    await mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      const raw = await readFile(this.filePath, "utf8");
      this.state = JSON.parse(raw);
    } catch (error) {
      this.state = await this.buildSeedState();
      await this.persist();
    }

    return this;
  }

  async reset() {
    this.state = await this.buildSeedState();
    await this.persist();
    return this.getBootstrap();
  }

  async buildSeedState() {
    const state = buildDefaultDemoState();

    state.users = await Promise.all(
      state.users.map(async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 10);
        const { password, ...safeUser } = user;
        return {
          ...safeUser,
          passwordHash,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      })
    );

    return state;
  }

  clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  async persist() {
    const content = JSON.stringify(this.state, null, 2);
    this.writeQueue = this.writeQueue.then(() =>
      writeFile(this.filePath, content, "utf8")
    );
    return this.writeQueue;
  }

  sanitizeUser(user) {
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return this.clone(safeUser);
  }

  normalizeRole(role) {
    const value = String(role || "").trim().toLowerCase();
    if (value === "user") return "citizen";
    if (value === "community leader") return "leader";
    return value;
  }

  normalizeStatus(status) {
    const value = String(status || "").trim().toLowerCase();
    return value === "approved" || value === "rejected" ? value : "pending";
  }

  getUsers({ role, status } = {}) {
    return this.state.users.filter((user) => {
      const matchesRole = role ? user.role === this.normalizeRole(role) : true;
      const matchesStatus = status ? user.status === this.normalizeStatus(status) : true;
      return matchesRole && matchesStatus;
    });
  }

  getUserById(userId) {
    return this.state.users.find((user) => user.id === userId) || null;
  }

  getEventById(eventId) {
    return this.state.events.find((eventItem) => eventItem.id === eventId) || null;
  }

  getTaskById(taskId) {
    return this.state.tasks.find((task) => task.id === taskId) || null;
  }

  getFineById(fineId) {
    return this.state.fines.find((fine) => fine.id === fineId) || null;
  }

  validateRole(role) {
    const normalizedRole = this.normalizeRole(role);
    if (!["citizen", "leader", "admin"].includes(normalizedRole)) {
      const error = new Error("Invalid role. Must be citizen, leader, or admin.");
      error.statusCode = 400;
      throw error;
    }

    return normalizedRole;
  }

  createAuthError(message, statusCode = 401) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  async registerUser({ name, email, phone, password, role, village }) {
    const normalizedRole = this.validateRole(role);

    if (normalizedRole === "admin") {
      throw this.createAuthError("Admin accounts cannot be registered here.", 403);
    }

    if (!name || !password || (!email && !phone)) {
      const error = new Error("Provide name, password, and either email or phone.");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPhone = String(phone || "").trim();

    const duplicate = this.state.users.find(
      (user) =>
        (normalizedEmail && user.email?.toLowerCase() === normalizedEmail) ||
        (normalizedPhone && user.phone === normalizedPhone)
    );

    if (duplicate) {
      const error = new Error("An account with that email or phone already exists.");
      error.statusCode = 409;
      throw error;
    }

    const nextUser = {
      id: randomUUID(),
      name: String(name).trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      village: String(village || "Community Area").trim(),
      nationalId: "",
      role: normalizedRole,
      status: normalizedRole === "leader" ? "pending" : "approved",
      permissions: {
        canManageWork: false
      },
      passwordHash: await bcrypt.hash(password, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.state.users.push(nextUser);
    await this.persist();

    return {
      user: this.sanitizeUser(nextUser),
      approvalRequired: nextUser.status !== "approved"
    };
  }

  async login({ identifier, password, role }) {
    const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
    const requestedRole = role ? this.normalizeRole(role) : "";

    const user = this.state.users.find((entry) => {
      return (
        entry.email?.toLowerCase() === normalizedIdentifier ||
        entry.phone === normalizedIdentifier ||
        entry.phone === String(identifier || "").trim()
      );
    });

    if (!user) {
      throw this.createAuthError("User not found.", 404);
    }

    const passwordMatches = await bcrypt.compare(String(password || ""), user.passwordHash);
    if (!passwordMatches) {
      throw this.createAuthError("Invalid credentials.");
    }

    if (requestedRole && user.role !== requestedRole) {
      throw this.createAuthError("That account does not match the selected role.", 403);
    }

    if (user.status !== "approved") {
      throw this.createAuthError("This account is still waiting for approval.", 403);
    }

    return this.sanitizeUser(user);
  }

  async submitForgotPassword({ identifier }) {
    if (!identifier) {
      const error = new Error("Enter your email or phone first.");
      error.statusCode = 400;
      throw error;
    }

    return {
      message: `Password reset instructions were sent to ${identifier}.`
    };
  }

  async listUsers(filters) {
    return this.getUsers(filters).map((user) => this.sanitizeUser(user));
  }

  async updateApproval(userId, status) {
    const user = this.getUserById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    user.status = this.normalizeStatus(status);
    user.updatedAt = new Date().toISOString();
    await this.persist();
    return this.sanitizeUser(user);
  }

  async updateUserRole(userId, role) {
    const user = this.getUserById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    user.role = this.validateRole(role);
    if (user.role !== "leader") {
      user.permissions.canManageWork = false;
    }
    user.status = "approved";
    user.updatedAt = new Date().toISOString();
    await this.persist();
    return this.sanitizeUser(user);
  }

  async updateLeaderPermissions(userId, canManageWork) {
    const user = this.getUserById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== "leader") {
      const error = new Error("Only leader accounts can receive leader work permissions.");
      error.statusCode = 400;
      throw error;
    }

    user.permissions.canManageWork = Boolean(canManageWork);
    user.updatedAt = new Date().toISOString();
    await this.persist();
    return this.sanitizeUser(user);
  }

  async listEvents() {
    return this.clone(
      [...this.state.events].sort((left, right) =>
        new Date(left.date).getTime() - new Date(right.date).getTime()
      )
    );
  }

  async createEvent({ title, date, location, description, createdBy }) {
    if (!title || !date || !location) {
      const error = new Error("Provide title, date, and location.");
      error.statusCode = 400;
      throw error;
    }

    const eventItem = {
      id: randomUUID(),
      title: String(title).trim(),
      date: new Date(date).toISOString(),
      location: String(location).trim(),
      description: String(description || "").trim(),
      createdBy,
      createdAt: new Date().toISOString()
    };

    this.state.events.unshift(eventItem);
    await this.persist();
    return this.clone(eventItem);
  }

  async updateEvent(eventId, updates = {}) {
    const eventItem = this.getEventById(eventId);
    if (!eventItem) {
      const error = new Error("Event not found.");
      error.statusCode = 404;
      throw error;
    }

    if (updates.title) {
      eventItem.title = String(updates.title).trim();
    }
    if (updates.location) {
      eventItem.location = String(updates.location).trim();
    }
    if (updates.date) {
      eventItem.date = new Date(updates.date).toISOString();
    }
    if (updates.description !== undefined) {
      eventItem.description = String(updates.description || "").trim();
    }

    await this.persist();
    return this.clone(eventItem);
  }

  async sendReminder(eventId) {
    const eventItem = this.getEventById(eventId);
    if (!eventItem) {
      const error = new Error("Event not found.");
      error.statusCode = 404;
      throw error;
    }

    const recipients = this.getUsers({ status: "approved" }).length;
    return {
      recipients,
      sentAt: new Date().toISOString(),
      event: this.clone(eventItem)
    };
  }

  async listTasks({ userId, eventId } = {}) {
    const filtered = this.state.tasks.filter((task) => {
      const matchesUser = userId ? task.assignedTo === userId : true;
      const matchesEvent = eventId ? task.eventId === eventId : true;
      return matchesUser && matchesEvent;
    });

    return this.clone(filtered);
  }

  async createTask({ eventId, assignedTo, description, zone, createdBy }) {
    if (!eventId || !assignedTo || !description) {
      const error = new Error("Provide eventId, assignedTo, and description.");
      error.statusCode = 400;
      throw error;
    }

    const eventItem = this.getEventById(eventId);
    const assignee = this.getUserById(assignedTo);
    if (!eventItem || !assignee) {
      const error = new Error("Select a valid event and user for the task.");
      error.statusCode = 400;
      throw error;
    }

    const task = {
      id: randomUUID(),
      eventId,
      assignedTo,
      description: String(description).trim(),
      zone: String(zone || assignee.village || "").trim(),
      status: "pending",
      createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.state.tasks.unshift(task);
    await this.persist();
    return this.clone(task);
  }

  async updateTask(taskId, updates = {}) {
    const task = this.getTaskById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      error.statusCode = 404;
      throw error;
    }

    if (updates.description) {
      task.description = String(updates.description).trim();
    }
    if (updates.zone !== undefined) {
      task.zone = String(updates.zone || "").trim();
    }
    if (updates.assignedTo) {
      const assignee = this.getUserById(updates.assignedTo);
      if (!assignee) {
        const error = new Error("Assigned user not found.");
        error.statusCode = 404;
        throw error;
      }
      task.assignedTo = updates.assignedTo;
    }
    if (updates.status) {
      task.status = this.normalizeTaskStatus(updates.status);
    }
    task.updatedAt = new Date().toISOString();

    await this.persist();
    return this.clone(task);
  }

  normalizeTaskStatus(status) {
    const normalizedStatus = String(status || "").trim().toLowerCase();
    const allowedStatuses = ["pending", "in_progress", "scheduled", "done"];
    if (!allowedStatuses.includes(normalizedStatus)) {
      const error = new Error("Task status must be pending, in_progress, scheduled, or done.");
      error.statusCode = 400;
      throw error;
    }
    return normalizedStatus;
  }

  async updateTaskStatus(taskId, status) {
    return this.updateTask(taskId, { status });
  }

  async markAttendance({ userId, eventId, status = "present", qrData }) {
    const eventItem = this.getEventById(eventId);
    if (!eventItem) {
      const error = new Error("Event not found.");
      error.statusCode = 404;
      throw error;
    }

    if (qrData) {
      const expected = `umuganda:event:${eventId}`;
      if (qrData !== expected) {
        const error = new Error("Invalid QR code.");
        error.statusCode = 400;
        throw error;
      }
    }

    const existing = this.state.attendance.find(
      (record) => record.userId === userId && record.eventId === eventId
    );
    if (existing) {
      const error = new Error("Attendance already marked for this event.");
      error.statusCode = 409;
      throw error;
    }

    const attendance = {
      id: randomUUID(),
      userId,
      eventId,
      status: status === "absent" ? "absent" : "present",
      method: qrData ? "qr" : "manual",
      scannedAt: new Date().toISOString()
    };

    this.state.attendance.push(attendance);

    if (attendance.status === "present") {
      let reward = this.state.rewards.find((entry) => entry.userId === userId);
      if (!reward) {
        reward = {
          id: randomUUID(),
          userId,
          points: 0,
          badge: "Community Starter",
          updatedAt: new Date().toISOString()
        };
        this.state.rewards.push(reward);
      }

      reward.points += 10;
      reward.updatedAt = new Date().toISOString();
    } else {
      this.state.fines.push({
        id: randomUUID(),
        userId,
        eventId,
        amount: 5000,
        reason: "Absent from Umuganda",
        status: "unpaid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    await this.persist();
    return this.clone(attendance);
  }

  async generateFines(eventId) {
    const eventItem = this.getEventById(eventId);
    if (!eventItem) {
      const error = new Error("Event not found.");
      error.statusCode = 404;
      throw error;
    }

    const presentIds = new Set(
      this.state.attendance
        .filter((record) => record.eventId === eventId && record.status === "present")
        .map((record) => record.userId)
    );

    const citizens = this.getUsers({ role: "citizen", status: "approved" });
    let generated = 0;

    citizens.forEach((citizen) => {
      if (presentIds.has(citizen.id)) {
        return;
      }

      const alreadyExists = this.state.fines.some(
        (fine) => fine.userId === citizen.id && fine.eventId === eventId
      );

      if (alreadyExists) {
        return;
      }

      this.state.fines.push({
        id: randomUUID(),
        userId: citizen.id,
        eventId,
        amount: 5000,
        reason: "Absent from Umuganda",
        status: "unpaid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      generated += 1;
    });

    await this.persist();
    return {
      generated,
      event: this.clone(eventItem)
    };
  }

  getAttendanceScans() {
    return this.state.attendance
      .filter((record) => record.status === "present")
      .map((record) => {
        const user = this.getUserById(record.userId);
        const eventItem = this.getEventById(record.eventId);
        return {
          id: record.id,
          accountId: record.userId,
          eventId: record.eventId,
          name: user?.name || "Community Member",
          email: user?.email || "",
          eventName: eventItem?.title || "",
          location: eventItem?.location || "",
          date: eventItem?.date || "",
          scannedAt: record.scannedAt
        };
      })
      .sort((left, right) => new Date(left.scannedAt) - new Date(right.scannedAt));
  }

  async listFinesForUser(userId) {
    return this.clone(
      this.state.fines
        .filter((fine) => fine.userId === userId)
        .map((fine) => ({
          ...fine,
          event: this.getEventById(fine.eventId)
        }))
    );
  }

  async payFine(fineId, user) {
    const fine = this.getFineById(fineId);
    if (!fine) {
      const error = new Error("Fine not found.");
      error.statusCode = 404;
      throw error;
    }

    if (user.role === "citizen" && fine.userId !== user.id) {
      const error = new Error("You can only pay your own fines.");
      error.statusCode = 403;
      throw error;
    }

    fine.status = "paid";
    fine.updatedAt = new Date().toISOString();
    await this.persist();
    return this.clone(fine);
  }

  async getLeaderboard() {
    return this.clone(
      [...this.state.rewards]
        .sort((left, right) => right.points - left.points)
        .map((reward) => ({
          ...reward,
          user: this.sanitizeUser(this.getUserById(reward.userId))
        }))
    );
  }

  async setCollectionGoal(amount) {
    if (!Number.isFinite(Number(amount)) || Number(amount) < 100) {
      const error = new Error("Collection goal must be at least 100 RWF.");
      error.statusCode = 400;
      throw error;
    }

    this.state.payments.collectionGoal = Number(amount);
    await this.persist();
    return this.clone(this.state.payments);
  }

  async depositContribution({ userId, amount }) {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 100) {
      const error = new Error("Deposit amount must be at least 100 RWF.");
      error.statusCode = 400;
      throw error;
    }

    this.state.payments.collectedAmount += numericAmount;
    this.state.payments.deposits.push({
      id: randomUUID(),
      userId,
      amount: numericAmount,
      createdAt: new Date().toISOString()
    });

    await this.persist();

    return {
      collectedAmount: this.state.payments.collectedAmount,
      collectionGoal: this.state.payments.collectionGoal,
      remaining: Math.max(
        this.state.payments.collectionGoal - this.state.payments.collectedAmount,
        0
      )
    };
  }

  getPaymentsSummary(userId) {
    const deposits = this.state.payments.deposits.filter(
      (deposit) => deposit.userId === userId
    );

    return this.clone({
      collectionGoal: this.state.payments.collectionGoal,
      collectedAmount: this.state.payments.collectedAmount,
      remaining: Math.max(
        this.state.payments.collectionGoal - this.state.payments.collectedAmount,
        0
      ),
      deposits
    });
  }

  async submitFeedback({ name, email, message, userId }) {
    if (!name || !email || !message) {
      const error = new Error("Provide name, email, and feedback message.");
      error.statusCode = 400;
      throw error;
    }

    const feedbackItem = {
      id: randomUUID(),
      userId: userId || null,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      status: "In review",
      createdAt: new Date().toISOString()
    };

    this.state.feedback.unshift(feedbackItem);
    await this.persist();
    return this.clone(feedbackItem);
  }

  listFeedback({ userId, email, limit = 8 } = {}) {
    const filtered = this.state.feedback.filter((item) => {
      const matchesUser = userId ? item.userId === userId : true;
      const matchesEmail = email ? item.email === String(email).trim().toLowerCase() : true;
      return matchesUser && matchesEmail;
    });

    return this.clone(filtered.slice(0, limit));
  }

  async submitContact({ name, email, message }) {
    if (!name || !email || !message) {
      const error = new Error("Provide name, email, and a message.");
      error.statusCode = 400;
      throw error;
    }

    const contact = {
      id: randomUUID(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      createdAt: new Date().toISOString()
    };

    this.state.contacts.unshift(contact);
    await this.persist();
    return this.clone(contact);
  }

  computeHomeStats() {
    const adultUsers = this.getUsers({ status: "approved" }).filter(
      (user) => user.role !== "admin"
    );
    const uniquePresentUsers = new Set(
      this.state.attendance
        .filter((record) => record.status === "present")
        .map((record) => record.userId)
    );
    const attendanceRate =
      adultUsers.length === 0
        ? 0
        : Math.round((uniquePresentUsers.size / adultUsers.length) * 100);

    return {
      attendanceRate,
      adultsTracked: adultUsers.length
    };
  }

  getAdminAccessSummary() {
    return {
      accounts: this.getUsers().map((user) => this.sanitizeUser(user))
    };
  }

  getUpcomingEventLocation() {
    const events = [...this.state.events].sort(
      (left, right) => new Date(left.date) - new Date(right.date)
    );
    return events[0]?.location || "";
  }

  getFeedbackStatuses(user) {
    if (!user) {
      return this.listFeedback({ limit: 3 });
    }

    if (user.role === "admin") {
      return this.listFeedback({ limit: 6 });
    }

    const userFeedback = this.listFeedback({
      userId: user.id,
      email: user.email,
      limit: 6
    });

    return userFeedback.length > 0 ? userFeedback : this.listFeedback({ limit: 3 });
  }

  async getDashboard(user) {
    const homeStats = this.computeHomeStats();
    const events = await this.listEvents();
    const attendanceScans = this.getAttendanceScans();
    const feedback = this.getFeedbackStatuses(user);
    const payments = this.getPaymentsSummary(user.id);
    const fines = await this.listFinesForUser(user.id);
    const leaderboard = await this.getLeaderboard();

    let tasks = [];
    if (user.role === "citizen") {
      tasks = await this.listTasks({ userId: user.id });
    } else {
      tasks = await this.listTasks();
    }

    return {
      homeStats,
      events,
      tasks,
      attendanceScans,
      admin: user.role === "admin" ? this.getAdminAccessSummary() : null,
      members:
        user.role === "leader" || user.role === "admin"
          ? this.getUsers({ status: "approved", role: "citizen" }).map((member) =>
              this.sanitizeUser(member)
            )
          : [],
      feedback,
      payments,
      fines,
      leaderboard,
      nextEventLocation: this.getUpcomingEventLocation()
    };
  }

  getParticipationByEvent() {
    return this.state.events.map((eventItem) => {
      const eventAttendance = this.state.attendance.filter(
        (record) => record.eventId === eventItem.id
      );
      const present = eventAttendance.filter((record) => record.status === "present").length;
      const total = this.getUsers({ role: "citizen", status: "approved" }).length;
      const rate = total === 0 ? 0 : present / total;

      return {
        eventId: eventItem.id,
        location: eventItem.location,
        date: eventItem.date,
        present,
        total,
        rate
      };
    });
  }

  async getAdminStats() {
    const overallParticipation = this.getParticipationByEvent();
    return {
      overallParticipation,
      lowParticipationAreas: overallParticipation.filter((entry) => entry.rate < 0.5),
      totalFines: this.state.fines.length,
      collectionGoal: this.state.payments.collectionGoal,
      collectedAmount: this.state.payments.collectedAmount,
      homeStats: this.computeHomeStats()
    };
  }

  async getReport(year) {
    const yearPrefix = year ? String(year) : "";
    const reportItems = this.state.attendance
      .filter((record) =>
        yearPrefix ? record.scannedAt.startsWith(yearPrefix) : true
      )
      .map((record) => ({
        ...record,
        user: this.sanitizeUser(this.getUserById(record.userId)),
        event: this.getEventById(record.eventId)
      }));

    return this.clone(reportItems);
  }

  getBootstrap() {
    return {
      homeStats: this.computeHomeStats(),
      events: this.clone(this.state.events),
      feedback: this.listFeedback({ limit: 3 }),
      dataMode: "demo-json"
    };
  }
}

module.exports = {
  DemoDataService
};
