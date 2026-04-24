function isoDate(daysFromToday, hour = 8, minute = 0) {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString();
}

function buildDefaultDemoState() {
  return {
    meta: {
      generatedAt: new Date().toISOString(),
      version: 1
    },
    users: [
      {
        id: "user-admin",
        name: "System Admin",
        email: "admin@umuganda.rw",
        phone: "0781234567",
        village: "Kigali Central",
        nationalId: "100000001",
        role: "admin",
        status: "approved",
        permissions: {
          canManageWork: true
        },
        password: "admin123"
      },
      {
        id: "user-leader-1",
        name: "Leader Nyabugogo",
        email: "leader@umuganda.rw",
        phone: "0781234568",
        village: "Nyabugogo",
        nationalId: "100000002",
        role: "leader",
        status: "approved",
        permissions: {
          canManageWork: true
        },
        password: "leader123"
      },
      {
        id: "user-citizen-1",
        name: "Mukamana Marie",
        email: "marie@umuganda.rw",
        phone: "0789123456",
        village: "Kacyiru",
        nationalId: "300000001",
        role: "citizen",
        status: "approved",
        permissions: {
          canManageWork: false
        },
        password: "pass123"
      },
      {
        id: "user-citizen-2",
        name: "Niyonzima Pierre",
        email: "pierre@umuganda.rw",
        phone: "0789123457",
        village: "Kacyiru",
        nationalId: "300000002",
        role: "citizen",
        status: "approved",
        permissions: {
          canManageWork: false
        },
        password: "pass123"
      },
      {
        id: "user-citizen-3",
        name: "Uwimana Jeanne",
        email: "jeanne@umuganda.rw",
        phone: "0789123458",
        village: "Remera",
        nationalId: "300000003",
        role: "citizen",
        status: "approved",
        permissions: {
          canManageWork: false
        },
        password: "pass123"
      },
      {
        id: "user-pending-leader",
        name: "Habimana Eric",
        email: "eric@umuganda.rw",
        phone: "0789000001",
        village: "Kimironko",
        nationalId: "300000004",
        role: "leader",
        status: "pending",
        permissions: {
          canManageWork: false
        },
        password: "leader123"
      }
    ],
    events: [
      {
        id: "event-1",
        title: "Tree Planting - Nyarugenge",
        date: isoDate(2, 8, 0),
        location: "Sector Office Grounds",
        description: "Plant native trees and clean the drainage path.",
        createdBy: "user-leader-1"
      },
      {
        id: "event-2",
        title: "Drainage Cleaning - Gasabo",
        date: isoDate(30, 8, 0),
        location: "Kibagabaga Main Road",
        description: "Remove debris and improve access for rainy season drainage.",
        createdBy: "user-leader-1"
      }
    ],
    tasks: [
      {
        id: "task-1",
        eventId: "event-1",
        assignedTo: "user-citizen-1",
        description: "Clear overgrowth from the roadside",
        zone: "Nyarugenge",
        status: "pending",
        createdBy: "user-leader-1",
        createdAt: new Date().toISOString()
      },
      {
        id: "task-2",
        eventId: "event-1",
        assignedTo: "user-citizen-2",
        description: "Distribute seedlings to village elders",
        zone: "Nyarugenge",
        status: "in_progress",
        createdBy: "user-leader-1",
        createdAt: new Date().toISOString()
      },
      {
        id: "task-3",
        eventId: "event-2",
        assignedTo: "user-citizen-3",
        description: "Register new participants at the assembly point",
        zone: "Gasabo",
        status: "scheduled",
        createdBy: "user-leader-1",
        createdAt: new Date().toISOString()
      }
    ],
    attendance: [
      {
        id: "attendance-1",
        userId: "user-citizen-1",
        eventId: "event-1",
        status: "present",
        method: "qr",
        scannedAt: new Date().toISOString()
      }
    ],
    fines: [
      {
        id: "fine-1",
        userId: "user-citizen-2",
        eventId: "event-1",
        amount: 5000,
        reason: "Absent from Umuganda",
        status: "unpaid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    rewards: [
      {
        id: "reward-1",
        userId: "user-citizen-1",
        points: 20,
        badge: "Community Starter",
        updatedAt: new Date().toISOString()
      }
    ],
    payments: {
      collectionGoal: 50000,
      collectedAmount: 12000,
      deposits: [
        {
          id: "deposit-1",
          userId: "user-citizen-1",
          amount: 2000,
          createdAt: new Date().toISOString()
        },
        {
          id: "deposit-2",
          userId: "user-citizen-3",
          amount: 10000,
          createdAt: new Date().toISOString()
        }
      ]
    },
    feedback: [
      {
        id: "feedback-1",
        name: "Mukamana Marie",
        email: "marie@umuganda.rw",
        userId: "user-citizen-1",
        message: "Road safety campaign idea.",
        status: "Approved",
        createdAt: new Date().toISOString()
      },
      {
        id: "feedback-2",
        name: "Niyonzima Pierre",
        email: "pierre@umuganda.rw",
        userId: "user-citizen-2",
        message: "Tool distribution request.",
        status: "In review",
        createdAt: new Date().toISOString()
      },
      {
        id: "feedback-3",
        name: "Uwimana Jeanne",
        email: "jeanne@umuganda.rw",
        userId: "user-citizen-3",
        message: "Weekend training session.",
        status: "Scheduled",
        createdAt: new Date().toISOString()
      }
    ],
    contacts: []
  };
}

module.exports = {
  buildDefaultDemoState
};
