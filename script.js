document.addEventListener('DOMContentLoaded', () => {
  const loginMethod = document.querySelector('#loginMethod');
  const loginMethodButtons = document.querySelectorAll('.login-method-btn');
  const loginRole = document.querySelector('#loginRole');
  const loginInput = document.querySelector('#loginInput');
  const loginInputLabel = document.querySelector('#loginInputLabel');
  const loginForm = document.querySelector('#loginForm');
  const loginRoleResult = document.querySelector('#loginRoleResult');
  const forgotPasswordButton = document.querySelector('#forgotPasswordButton');
  const forgotPasswordResult = document.querySelector('#forgotPasswordResult');
  const feedbackForm = document.querySelector('#feedbackForm');
  const feedbackResult = document.querySelector('#feedbackResult');
  const contactForm = document.querySelector('#contactForm');
  const contactResult = document.querySelector('#contactResult');
  const siteHeader = document.querySelector('#siteHeader');
  const brandSubtitle = document.querySelector('.brand-subtitle');
  const menuToggle = document.querySelector('#menuToggle');
  const siteNav = document.querySelector('.site-nav');
  const showRegisterLink = document.querySelector('#showRegisterForm');
  const hideRegisterLink = document.querySelector('#hideRegisterForm');
  const loginRegisterPrompt = document.querySelector('#loginRegisterPrompt');
  const registerApprovalNote = document.querySelector('#registerApprovalNote');
  const registerLoginPrompt = document.querySelector('#registerLoginPrompt');
  const loginCard = document.querySelector('#loginCard');
  const registerPanel = document.querySelector('#registerPanel');
  const registerForm = document.querySelector('#registerForm');
  const registerRole = document.querySelector('#registerRole');
  const registerRoleResult = document.querySelector('#registerRoleResult');
  const viewOverviewButton = document.querySelector('#viewOverviewButton');
  const attendanceRateValue = document.querySelector('#attendanceRateValue');
  const adultsTrackedValue = document.querySelector('#adultsTrackedValue');
  const attendanceProgressFill = document.querySelector('#attendanceProgressFill');
  const closeViewerPanel = document.querySelector('#closeViewerPanel');
  const viewerPanel = document.querySelector('#viewerPanel');
  const viewerList = document.querySelector('#viewerList');
  const activeViewersCount = document.querySelector('#activeViewersCount');
  const newViewersCount = document.querySelector('#newViewersCount');
  const dashboardSection = document.querySelector('#dashboard');
  const dashboardWelcomeTitle = document.querySelector('#dashboardWelcomeTitle');
  const dashboardNotifications = document.querySelector('#dashboardNotifications');
  const notificationToggle = document.querySelector('#notificationToggle');
  const notificationCount = document.querySelector('#notificationCount');
  const notificationDropdown = document.querySelector('#notificationDropdown');
  const notificationList = document.querySelector('#notificationList');
  const dashboardAccount = document.querySelector('#dashboardAccount');
  const accountToggle = document.querySelector('#accountToggle');
  const accountAvatar = document.querySelector('#accountAvatar');
  const accountDropdown = document.querySelector('#accountDropdown');
  const accountEmailDisplay = document.querySelector('#accountEmailDisplay');
  const accountLogoutButton = document.querySelector('#accountLogoutButton');
  const dashboardLinks = document.querySelectorAll('.sidebar-link[data-target]');
  const dashboardPanels = document.querySelectorAll('.dashboard-panel');
  const qrRoleNote = document.querySelector('#qrRoleNote');
  const qrScannerContainer = document.querySelector('#qrScannerContainer');
  const qrScannerMessage = document.querySelector('#qrScannerMessage');
  const confirmQrScanButton = document.querySelector('#confirmQrScanButton');
  const cancelQrScanButton = document.querySelector('#cancelQrScanButton');
  const qrScanResult = document.querySelector('#qrScanResult');
  const notificationsList = document.querySelector('#notificationsList');
  const markReadButton = document.querySelector('#markReadButton');
  const notificationsResult = document.querySelector('#notificationsResult');
  const sendReminderButton = document.querySelector('#sendReminderButton');
  const eventsResult = document.querySelector('#eventsResult');
  const eventsList = document.querySelector('#eventsList');
  const tasksList = document.querySelector('#tasksList');
  const syncTasksButton = document.querySelector('#syncTasksButton');
  const tasksResult = document.querySelector('#tasksResult');
  const approvalRequestsList = document.querySelector('#approvalRequestsList');
  const approvalRequestsResult = document.querySelector('#approvalRequestsResult');
  const leaderPermissionsList = document.querySelector('#leaderPermissionsList');
  const leaderPermissionsResult = document.querySelector('#leaderPermissionsResult');
  const memberRoleList = document.querySelector('#memberRoleList');
  const memberRoleResult = document.querySelector('#memberRoleResult');
  const feedbackStatusList = document.querySelector('#feedbackStatusList');
  const exportFeedbackButton = document.querySelector('#exportFeedbackButton');
  const feedbackDownloadLink = document.querySelector('#feedbackDownloadLink');
  const attendanceList = document.querySelector('#attendanceList');
  const downloadAttendanceButton = document.querySelector('#downloadAttendanceButton');
  const attendanceDownloadLink = document.querySelector('#attendanceDownloadLink');
  const settingsForm = document.querySelector('#settingsForm');
  const settingsChannelSelect = document.querySelector('#settingsChannel');
  const settingsLanguageSelect = document.querySelector('#settingsLanguage');
  const settingsNameInput = document.querySelector('#settingsName');
  const settingsResult = document.querySelector('#settingsResult');
  const publicLanguageLabel = document.querySelector('#publicLanguageLabel');
  const publicLanguageSelect = document.querySelector('#publicLanguageSelect');
  const leaderEventForm = document.querySelector('#leaderEventForm');
  const leaderEventResult = document.querySelector('#leaderEventResult');
  const leaderEventUpdateForm = document.querySelector('#leaderEventUpdateForm');
  const leaderEventSelect = document.querySelector('#leaderEventSelect');
  const leaderUpdatedLocation = document.querySelector('#leaderUpdatedLocation');
  const leaderUpdatedDate = document.querySelector('#leaderUpdatedDate');
  const leaderEventUpdateResult = document.querySelector('#leaderEventUpdateResult');
  const leaderTaskForm = document.querySelector('#leaderTaskForm');
  const leaderTaskResult = document.querySelector('#leaderTaskResult');
  const leaderTaskUpdateForm = document.querySelector('#leaderTaskUpdateForm');
  const leaderTaskSelect = document.querySelector('#leaderTaskSelect');
  const leaderUpdatedTaskName = document.querySelector('#leaderUpdatedTaskName');
  const leaderTaskUpdateResult = document.querySelector('#leaderTaskUpdateResult');
  const leaderTaskPermissionNote = document.querySelector('#leaderTaskPermissionNote');
  const leaderCollectionForm = document.querySelector('#leaderCollectionForm');
  const leaderCollectionResult = document.querySelector('#leaderCollectionResult');
  const depositForm = document.querySelector('#depositForm');
  const depositResult = document.querySelector('#depositResult');
  const nextEventLocationDisplay = document.querySelector('#nextEventLocationDisplay');

  const SETTINGS_STORAGE_KEY = 'umugandaSettings';
  const LEADER_DATA_STORAGE_KEY = 'umugandaLeaderData';
  const HOME_STATS_STORAGE_KEY = 'umugandaHomeStats';
  const ACCOUNTS_STORAGE_KEY = 'umugandaAccounts';
  const ATTENDANCE_SCANS_STORAGE_KEY = 'umugandaAttendanceScans';
  const AI_TRANSLATION_CACHE_KEY = 'umugandaAiTranslationCache';

  const DEFAULT_ADMIN_ACCOUNT = {
    id: 'admin-seed',
    name: 'System Admin',
    email: 'admin@umuganda.rw',
    phone: '',
    password: 'Admin123!',
    role: 'Admin',
    status: 'approved',
    permissions: {
      canAddTasks: true
    }
  };

  const translations = {
    English: {
      meta: {
        htmlLang: 'en',
        locale: 'en-US',
        title: 'Umuganda-T | Community Work Tracker'
      },
      roles: {
        User: 'User',
        Admin: 'Admin',
        Leader: 'Community Leader'
      },
      options: {
        channels: {
          'Email + SMS': 'Email + SMS',
          'Email only': 'Email only',
          'SMS only': 'SMS only'
        },
        languages: {
          English: 'English',
          Kinyarwanda: 'Kinyarwanda',
          French: 'French'
        }
      },
      brand: {
        subtitle: 'Tracking community action in Rwanda'
      },
      common: {
        emailAddress: 'Email address',
        phoneNumber: 'Phone number',
        password: 'Password',
        fullName: 'Full name',
        pageLanguage: 'Page language',
        location: 'Location',
        dateAndTime: 'Date and time',
        generated: 'Generated',
        logout: 'Logout',
        communityMember: 'Community Member',
        toggleNavigation: 'Toggle navigation',
        supportTeam: 'Support Team',
        office: 'Office',
        phone: 'Phone',
        email: 'Email'
      },
      nav: {
        home: 'Home',
        about: 'About',
        feedback: 'Feedback',
        login: 'Login',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'Community, accountability, action',
        title: "Umuganda-T keeps Rwanda's obligation work visible and organized.",
        description: 'See attendance, follow community engagements, manage feedback, and support participation for adults taking part in Umuganda.',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        liveOverview: 'Live Overview',
        attendanceRate: 'Attendance rate',
        adultsTracked: 'Adults tracked'
      },
      viewer: {
        eyebrow: 'Viewer List',
        title: 'People currently viewing Umuganda-T',
        summary: 'These visitors are checking the overview and attendance activity now.',
        activeViewers: 'Active viewers',
        newThisHour: 'New this hour',
        close: 'Close overview',
        pill: '{name} - online {time}'
      },
      about: {
        eyebrow: 'About the App',
        title: 'Designed for stronger community organization.',
        description: 'Umuganda-T is built to show how work is scheduled, track who attended, flag absences, and help communities keep transparent records.',
        backHome: 'Back to Home',
        cards: [
          {
            title: 'Community Planning',
            description: 'Present upcoming Umuganda events clearly so citizens know when and where to join.'
          },
          {
            title: 'Attendance Tracking',
            description: 'Capture who came, who missed, and highlight members over 18 for any follow-up actions.'
          },
          {
            title: 'Feedback Approval',
            description: 'Submit improvement ideas and get quick status feedback on approval or next steps.'
          }
        ]
      },
      learnMore: {
        eyebrow: 'Learn More',
        title: 'Deep dive into Umuganda-T features and benefits.',
        description: 'Explore advanced tools for community management, data insights, and integration with local government systems.',
        cards: [
          {
            title: 'Data Analytics',
            description: 'Get detailed reports on participation trends, demographic breakdowns, and historical attendance data.'
          },
          {
            title: 'Integration with Gov Systems',
            description: "Seamlessly connect with Rwanda's local administration for verified citizen data and compliance tracking."
          },
          {
            title: 'Mobile Accessibility',
            description: 'Access the app on any device with responsive design optimized for smartphones and tablets.'
          },
          {
            title: 'Real-time Notifications',
            description: 'Receive instant alerts for event updates, attendance confirmations, and community announcements.'
          }
        ]
      },
      feedbackSection: {
        eyebrow: 'Feedback',
        title: 'Send your update or idea for Umuganda-T.',
        description: 'Share your thoughts and receive a simulated approval response from the community coordinator.',
        nameLabel: 'Full name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email address',
        emailPlaceholder: 'name@example.com',
        messageLabel: 'Message',
        messagePlaceholder: "Tell us what you'd like to improve",
        submit: 'Submit Feedback'
      },
      auth: {
        eyebrow: 'Access',
        title: 'Login or register for your Umuganda-T account.',
        description: 'Choose email or phone login, or create an account if you are new.',
        loginHeading: 'Login',
        registerHeading: 'Register',
        continueAs: 'Continue as',
        selectRole: 'Select role',
        loginMethod: 'Login method',
        emailMethod: 'Email',
        phoneMethod: 'Phone',
        passwordPlaceholder: 'Enter your password',
        loginButton: 'Login',
        forgotPassword: 'Forgot Password',
        noAccount: "Don't have an account?",
        registerHere: 'Register here',
        registerNamePlaceholder: 'Your full name',
        registerEmailPlaceholder: 'name@example.com',
        registerPasswordPlaceholder: 'Create a password',
        registerButton: 'Register',
        approvalNote: 'New user and community leader accounts must be approved by the admin before they can log in.',
        alreadyHave: 'Already have an account?',
        loginHere: 'Login here'
      },
      dashboard: {
        eyebrow: 'Dashboard',
        welcomeDefault: 'Welcome back to Umuganda-T.',
        welcomeUser: 'Welcome back, {name} ({role}).',
        intro: 'Use the sidebar to navigate notifications, feedback, attendance, and settings.',
        qrAttendanceScans: 'QR Attendance Scans',
        signedInAs: 'Signed in as',
        tabs: {
          notifications: 'Notifications',
          events: 'Events',
          tasks: 'Tasks',
          accessControl: 'Access Control',
          feedback: 'Feedback',
          attendance: 'Attendance',
          settings: 'Settings',
          leaderTools: 'Leader Tools',
          payments: 'My Deposit'
        },
        notificationPanel: {
          title: 'Notifications',
          markRead: 'Mark All as Read',
          noQrScans: 'No QR attendance scans yet.'
        },
        eventsPanel: {
          title: 'Upcoming Events',
          description: 'Find where your next community work will take place:',
          sendReminder: 'Send Event Reminder',
          scanButton: 'Scan Attendance QR',
          qrLoggedOut: 'Login as a user to scan the Umuganda attendance QR code.',
          qrUser: 'User accounts mark attendance by scanning the QR code provided at the Umuganda place.',
          qrOther: 'Only user accounts can mark attendance by scanning the QR code.',
          qrScannerDefault: 'Camera access requested for scanning...',
          qrScannerView: '[QR Scanner View]',
          qrReady: 'Ready to scan attendance for {event}.',
          confirmScan: 'Confirm QR Scan',
          cancelScan: 'Cancel'
        },
        tasksPanel: {
          title: 'My Tasks',
          description: 'Assigned work for current and upcoming Umuganda sessions:',
          syncTasks: 'Sync Tasks',
          statusPending: 'Pending',
          statusInProgress: 'In Progress',
          statusScheduled: 'Scheduled',
          statusSynced: 'Synced'
        },
        accessPanel: {
          title: 'Access Control',
          description: 'Approve member accounts, promote users to community leaders, and decide which leaders can manage tasks and event locations.',
          pendingApprovals: 'Pending approvals',
          noPendingApprovals: 'No pending accounts right now.',
          approve: 'Approve',
          reject: 'Reject',
          leaderPermissions: 'Leader work permissions',
          noApprovedLeaders: 'No approved community leaders available yet.',
          allowWorkAccess: 'Allow Work Access',
          removeWorkAccess: 'Remove Work Access',
          memberRoleChanges: 'Member role changes',
          noUsersForPromotion: 'No approved user accounts available for promotion.',
          promoteToLeader: 'Change to Community Leader',
          currentRole: 'Current role',
          workAccessAllowed: 'Allowed',
          workAccessDenied: 'Not allowed'
        },
        feedbackPanel: {
          title: 'Feedback',
          description: 'Recent feedback status updates from your community team:',
          export: 'Export Feedback',
          download: 'Download Feedback Report'
        },
        attendancePanel: {
          title: 'Attendance Overview',
          description: 'Current participation metrics:',
          download: 'Generate Attendance Report',
          downloadReady: 'Download Attendance Report',
          totalScans: 'Total QR scans recorded: {count}',
          uniqueUsers: 'Unique users checked in: {count}',
          latestScan: 'Latest scan: {detail}',
          noLatestScan: 'No attendance scans yet'
        },
        leaderPanel: {
          title: 'Leader Tools',
          description: 'Community leaders can add events, update event location, adjust tasks, and collect Umuganda contribution goals after admin approval.',
          eventName: 'Event name',
          eventNamePlaceholder: 'e.g. Road Repair - Kicukiro',
          eventLocation: 'Location',
          eventLocationPlaceholder: 'Sector, cell or meeting point',
          eventDate: 'Date and time',
          eventDatePlaceholder: 'Sat, May 15, 8:00 AM',
          addEvent: 'Add Event',
          chooseEvent: 'Choose event to update',
          updatedLocation: 'New event location',
          updatedLocationPlaceholder: 'Updated location',
          updatedDate: 'New event date and time',
          updatedDatePlaceholder: 'Updated date and time',
          updateEvent: 'Update Event Place',
          taskName: 'Task to assign',
          taskNamePlaceholder: 'Task description',
          addTask: 'Add Task',
          chooseTask: 'Choose task to update',
          updatedTask: 'Updated task',
          updatedTaskPlaceholder: 'Updated task description',
          updateTask: 'Update Task',
          permissionActive: 'Admin permission is active. You can add tasks and update event location details.',
          permissionLocked: 'Task and event updates stay locked until an admin gives this leader account work permission.',
          collectionGoal: 'Collection goal (RWF)',
          collectionGoalPlaceholder: 'e.g. 50000',
          setCollectionGoal: 'Set Collection Goal'
        },
        paymentPanel: {
          title: 'Deposit Umuganda Contribution',
          description: 'Users can deposit contribution and see where the next Umuganda will take place.',
          amount: 'Amount (RWF)',
          amountPlaceholder: 'e.g. 2000',
          deposit: 'Deposit',
          nextLocation: 'Next Umuganda location: {location}'
        },
        settingsPanel: {
          title: 'Settings',
          description: 'Manage your account and notification preferences.',
          notificationChannel: 'Notification channel',
          language: 'Language',
          displayName: 'Display name',
          save: 'Save Settings'
        }
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Connect with the Umuganda-T support team.',
        description: 'Reach out for help, feedback, or questions about attending community work.',
        supportTitle: 'Support Team',
        supportDescription: 'For app support and community coordination questions, contact us using the form.',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message'
      },
      defaults: {
        notificationItems: [
          'Reminder: Umuganda starts this Saturday at 8:00 AM.',
          'Attendance report for March has been approved.',
          'New community cleanup event created for next month.'
        ],
        feedbackItems: [
          'Road safety campaign idea - Approved.',
          'Tool distribution request - In review.',
          'Weekend training session - Scheduled.'
        ],
        events: [
          {
            id: 'default-tree-planting',
            name: 'Tree Planting - Nyarugenge',
            location: 'Sector Office Grounds',
            date: 'Sat, April 27, 8:00 AM'
          },
          {
            id: 'default-drainage-cleaning',
            name: 'Drainage Cleaning - Gasabo',
            location: 'Kibagabaga Main Road',
            date: 'Sat, May 25, 8:00 AM'
          }
        ],
        tasks: [
          'Clear overgrowth from the roadside (Nyarugenge)',
          'Distribute seedlings to village elders (Nyarugenge)',
          'Register new participants at the assembly point (Gasabo)'
        ]
      },
      messages: {
        forgotNeedAccount: 'Enter your email or phone first, then click Forgot Password.',
        forgotSent: 'Password reset instructions were sent to {target}.',
        selectRoleLogin: 'Please select a role before login.',
        adminDenied: 'You cannot enter the admin dashboard with those details.',
        invalidLogin: 'Incorrect login details. Check your account and password.',
        wrongRole: 'This account is registered as {role}. It cannot log in as {selectedRole}.',
        pendingApproval: 'This account is waiting for admin approval before it can log in.',
        onlyUsersCanScan: 'Only user accounts can scan the QR attendance code.',
        onlyUsersCanConfirmScan: 'Only user accounts can confirm a QR attendance scan.',
        chooseQrEvent: 'Choose an event QR scan first.',
        alreadyScanned: 'Your attendance is already marked for this event.',
        attendanceMarked: 'Attendance marked for {event}.',
        attendanceAccepted: 'QR scan accepted. Your attendance has been recorded.',
        notificationsRead: 'All notifications marked as read.',
        reminderSent: 'Reminder sent to all registered participants at {time}.',
        accountApproved: '{name} can now log in as {role}.',
        accountRejected: 'Account request rejected and removed.',
        leaderPermissionGranted: '{name} can now manage tasks and event updates.',
        leaderPermissionRemoved: '{name} can no longer manage tasks and event updates.',
        promotedToLeader: '{name} is now a community leader and can log in with the Leader role after admin work permission is granted.',
        eventAdded: 'Event added successfully.',
        leaderEventUpdateDenied: 'An admin must allow this leader account to update event locations first.',
        eventUpdated: 'Event place and schedule updated successfully.',
        leaderTaskAddDenied: 'An admin must allow this leader account to add tasks first.',
        taskAdded: 'Task added for members.',
        leaderTaskUpdateDenied: 'An admin must allow this leader account to update tasks first.',
        taskUpdated: 'Task updated successfully.',
        collectionGoalSet: 'Collection goal set to {goal} RWF.',
        depositReceived: 'Deposit received: {amount} RWF. Remaining to goal: {remaining} RWF.',
        tasksSynced: 'Task list synced and latest statuses applied.',
        settingsSaved: 'Settings saved successfully.',
        feedbackSubmitted: 'Thank you! Your feedback is received and approved for review.',
        selectRoleRegister: 'Please select a role before registering.',
        adminRegisterBlocked: 'Admin accounts cannot be registered here.',
        emailExists: 'An account with this email already exists.',
        registrationSubmitted: 'Registration submitted for {role}. Wait for admin approval before login.',
        contactSent: 'Message sent successfully. Our team will contact you soon.'
      }
    },
    Kinyarwanda: {
      meta: {
        htmlLang: 'rw',
        locale: 'rw-RW',
        title: "Umuganda-T | Gukurikirana Umuganda"
      },
      roles: {
        User: 'Umukoresha',
        Admin: 'Admin',
        Leader: "Umuyobozi w'umuganda"
      },
      options: {
        channels: {
          'Email + SMS': 'Imeli + SMS',
          'Email only': 'Imeli gusa',
          'SMS only': 'SMS gusa'
        },
        languages: {
          English: 'Icyongereza',
          Kinyarwanda: 'Ikinyarwanda',
          French: 'Igifaransa'
        }
      },
      brand: {
        subtitle: "Gukurikirana ibikorwa by'umuganda mu Rwanda"
      },
      common: {
        emailAddress: 'Aderesi ya imeli',
        phoneNumber: 'Nimero ya telefone',
        password: 'Ijambo banga',
        fullName: 'Amazina yose',
        pageLanguage: "Ururimi rw'urupapuro",
        location: 'Aho bizabera',
        dateAndTime: 'Itariki n isaha',
        generated: 'Byakozwe ku',
        logout: 'Sohoka',
        communityMember: "Umunyamuryango",
        toggleNavigation: 'Fungura menyu',
        supportTeam: 'Itsinda rifasha',
        office: 'Ibiro',
        phone: 'Telefone',
        email: 'Imeli'
      },
      nav: {
        home: 'Ahabanza',
        about: 'Ibyerekeye',
        feedback: 'Ibitekerezo',
        login: 'Injira',
        contact: 'Twandikire'
      },
      hero: {
        eyebrow: 'Umuganda, ubazwa inshingano, igikorwa',
        title: "Umuganda-T ituma ibikorwa by'umuganda mu Rwanda bigaragara kandi biteguwe neza.",
        description: "Reba attendance, ukurikirane ibikorwa by'abaturage, tegura ibitekerezo, kandi ushyigikire kwitabira Umuganda.",
        getStarted: 'Tangira',
        learnMore: 'Menya byinshi',
        liveOverview: "Incamake y'ako kanya",
        attendanceRate: 'Ijanisha ry abitabiriye',
        adultsTracked: 'Abakuru bakurikiranwa'
      },
      viewer: {
        eyebrow: 'Urutonde rwabareba',
        title: 'Abareba Umuganda-T ubu',
        summary: "Aba bantu bari kureba incamake n'ibijyanye na attendance ubu.",
        activeViewers: 'Abareba ubu',
        newThisHour: 'Bashya muri iyi saha',
        close: 'Funga incamake',
        pill: '{name} - kuri interineti {time}'
      },
      about: {
        eyebrow: 'Ibyerekeye porogaramu',
        title: "Yakozwe kugira ngo imiyoborere y'abaturage irusheho gukomera.",
        description: "Umuganda-T yerekana gahunda z'umuganda, ikabika abitabiriye, ikerekana abataraje, kandi igafasha kugira amakuru asobanutse.",
        backHome: 'Garuka ahabanza',
        cards: [
          {
            title: 'Gutegura ibikorwa',
            description: "Garagaza ibikorwa by'umuganda bizaza kugira ngo abaturage bamenye igihe n aho bazahurira."
          },
          {
            title: 'Gukurikirana attendance',
            description: 'Menya abaje n abataraje kandi werekane abantu bakuru bakenera gukurikiranwa.'
          },
          {
            title: 'Kwemeza ibitekerezo',
            description: 'Ohereza ibitekerezo kandi ubone igisubizo ku byemejwe cyangwa ibizakurikiraho.'
          }
        ]
      },
      learnMore: {
        eyebrow: 'Menya byinshi',
        title: 'Menya neza imikorere n inyungu za Umuganda-T.',
        description: "Reba ibikoresho byimbitse byo kuyobora abaturage, gusuzuma amakuru, no guhuza n'inzego z'ubuyobozi.",
        cards: [
          {
            title: 'Isesengura ry amakuru',
            description: 'Bona raporo zirambuye ku kwitabira, ibyiciro by abantu, n amateka ya attendance.'
          },
          {
            title: "Guhuza n'inzego z'ubuyobozi",
            description: "Huza porogaramu n'inzego z'ibanze kugira ngo amakuru yemejwe abe meza."
          },
          {
            title: 'Gukoresha kuri telefoni',
            description: 'Koresha porogaramu ku gikoresho icyo ari cyo cyose harimo telefoni na tablet.'
          },
          {
            title: 'Amakuru yihuse',
            description: 'Akira ubutumwa bwihuse ku mpinduka z ibikorwa, attendance n amatangazo.'
          }
        ]
      },
      feedbackSection: {
        eyebrow: 'Ibitekerezo',
        title: 'Ohereza igitekerezo cyawe kuri Umuganda-T.',
        description: "Sangira ibitekerezo byawe kandi ubone igisubizo kivuye ku muyobozi w'umuryango.",
        nameLabel: 'Amazina yose',
        namePlaceholder: 'Andika amazina yawe',
        emailLabel: 'Aderesi ya imeli',
        emailPlaceholder: 'izina@example.com',
        messageLabel: 'Ubutumwa',
        messagePlaceholder: "Tubwire icyo ushaka ko cyahinduka",
        submit: 'Ohereza igitekerezo'
      },
      auth: {
        eyebrow: 'Kwemererwa',
        title: 'Injira cyangwa wiyandikishe kuri konte yawe ya Umuganda-T.',
        description: 'Hitamo kwinjira ukoresheje imeli cyangwa telefoni, cyangwa ufungure konti nshya.',
        loginHeading: 'Injira',
        registerHeading: 'Iyandikishe',
        continueAs: 'Komeza nka',
        selectRole: 'Hitamo uruhare',
        loginMethod: 'Uburyo bwo kwinjira',
        emailMethod: 'Imeli',
        phoneMethod: 'Telefone',
        passwordPlaceholder: 'Andika ijambo banga',
        loginButton: 'Injira',
        forgotPassword: 'Wibagiwe ijambo banga',
        noAccount: 'Nta konti ufite?',
        registerHere: 'Iyandikishe hano',
        registerNamePlaceholder: 'Andika amazina yawe',
        registerEmailPlaceholder: 'izina@example.com',
        registerPasswordPlaceholder: 'Hanga ijambo banga',
        registerButton: 'Iyandikishe',
        approvalNote: "Konti z'abakoresha n'abayobozi b'umuganda zigomba kubanza kwemezwa na admin mbere yo kwinjira.",
        alreadyHave: 'Usanzwe ufite konti?',
        loginHere: 'Injira hano'
      },
      dashboard: {
        eyebrow: 'Imbonerahamwe',
        welcomeDefault: 'Murakaza neza kuri Umuganda-T.',
        welcomeUser: 'Murakaza neza, {name} ({role}).',
        intro: 'Koresha menu yo ku ruhande urebe amakuru, ibitekerezo, attendance n igenamiterere.',
        qrAttendanceScans: 'Scan za QR za attendance',
        signedInAs: 'Winjiye nka',
        tabs: {
          notifications: 'Amakuru',
          events: 'Ibikorwa',
          tasks: 'Inshingano',
          accessControl: 'Igenzura ry uburenganzira',
          feedback: 'Ibitekerezo',
          attendance: 'Attendance',
          settings: 'Igenamiterere',
          leaderTools: "Ibikoresho by'umuyobozi",
          payments: 'Ubwizigame bwanjye'
        },
        notificationPanel: {
          title: 'Amakuru',
          markRead: 'Shyira byose ku byasomwe',
          noQrScans: 'Nta scan ya QR ya attendance irabaho.'
        },
        eventsPanel: {
          title: 'Ibikorwa bizaza',
          description: "Menya aho ibikorwa by'umuganda bizabera ubutaha:",
          sendReminder: 'Ohereza kwibutsa',
          scanButton: 'Scan QR ya attendance',
          qrLoggedOut: "Injira nka umukoresha kugira ngo ushyire attendance ukoresheje QR.",
          qrUser: "Abakoresha bashyira attendance bakoresheje QR iri aho umuganda ubera.",
          qrOther: 'Abakoresha gusa ni bo bashobora gushyira attendance bakoresheje QR.',
          qrScannerDefault: 'Turimo gusaba uburenganzira bwo gukoresha camera...',
          qrScannerView: '[Aho scan ya QR igaragara]',
          qrReady: 'Witeguye gukora scan ya attendance ya {event}.',
          confirmScan: 'Emeza scan ya QR',
          cancelScan: 'Hagarika'
        },
        tasksPanel: {
          title: 'Inshingano zanjye',
          description: "Inshingano zateganyijwe ku muganda uriho n'uzakurikiraho:",
          syncTasks: 'Hinduranya inshingano',
          statusPending: 'Bitegereje',
          statusInProgress: 'Birakorwa',
          statusScheduled: 'Byateganyijwe',
          statusSynced: 'Byahujwe'
        },
        accessPanel: {
          title: 'Igenzura ry uburenganzira',
          description: "Emeza konti z'abanyamuryango, hindura abakoresha babe abayobozi b'umuganda, kandi ugenzure abayobozi bashobora gucunga inshingano n'aho ibikorwa bibera.",
          pendingApprovals: 'Konti zitegereje kwemezwa',
          noPendingApprovals: 'Nta konti zitegereje kwemezwa ubu.',
          approve: 'Emeza',
          reject: 'Yangira',
          leaderPermissions: "Uburenganzira bw'umuyobozi",
          noApprovedLeaders: "Nta bayobozi b'umuganda bemejwe ubu.",
          allowWorkAccess: 'Tanga uburenganzira',
          removeWorkAccess: 'Kuraho uburenganzira',
          memberRoleChanges: "Guhindura uruhare rw'abanyamuryango",
          noUsersForPromotion: 'Nta bakoresha bemejwe bahari kugira ngo bazamurwe.',
          promoteToLeader: "Hindura abe umuyobozi w'umuganda",
          currentRole: 'Uruhare ruriho',
          workAccessAllowed: 'Yemerewe',
          workAccessDenied: 'Ntiyemerewe'
        },
        feedbackPanel: {
          title: 'Ibitekerezo',
          description: "Dore uko ibitekerezo biheruka byitwayemo mu buyobozi bw'umuryango:",
          export: 'Bika ibitekerezo',
          download: 'Kuramo raporo y ibitekerezo'
        },
        attendancePanel: {
          title: 'Incamake ya attendance',
          description: 'Imibare ya attendance iriho:',
          download: 'Kora raporo ya attendance',
          downloadReady: 'Kuramo raporo ya attendance',
          totalScans: 'Umubare wa scan za QR zabitswe: {count}',
          uniqueUsers: 'Abakoresha badasubirwamo bitabiriye: {count}',
          latestScan: 'Scan iheruka: {detail}',
          noLatestScan: 'Nta scan ya attendance irabaho'
        },
        leaderPanel: {
          title: "Ibikoresho by'umuyobozi",
          description: "Abayobozi b'umuganda bashobora kongeramo ibikorwa, guhindura aho bibera, guhindura inshingano no gushyiraho intego z'inkunga nyuma yo kwemererwa na admin.",
          eventName: "Izina ry'igikorwa",
          eventNamePlaceholder: 'urugero: Gusana umuhanda - Kicukiro',
          eventLocation: 'Aho bizabera',
          eventLocationPlaceholder: 'Akagari, umurenge cyangwa aho bazahurira',
          eventDate: 'Itariki n isaha',
          eventDatePlaceholder: 'Kuwa Gatandatu, 15 Gicurasi, 08:00',
          addEvent: 'Ongeraho igikorwa',
          chooseEvent: 'Hitamo igikorwa cyo guhindura',
          updatedLocation: 'Aho hashya hazabera',
          updatedLocationPlaceholder: 'Aho hashya',
          updatedDate: 'Itariki nshya n isaha',
          updatedDatePlaceholder: 'Itariki nshya n isaha',
          updateEvent: 'Hindura aho igikorwa kibera',
          taskName: 'Inshingano yo gutanga',
          taskNamePlaceholder: 'Ibisobanuro by inshingano',
          addTask: 'Ongeraho inshingano',
          chooseTask: 'Hitamo inshingano yo guhindura',
          updatedTask: 'Inshingano yahinduwe',
          updatedTaskPlaceholder: 'Ibisobanuro bishya by inshingano',
          updateTask: 'Hindura inshingano',
          permissionActive: "Uburenganzira bwa admin burahari. Ushobora kongeraho inshingano no guhindura aho igikorwa kibera.",
          permissionLocked: "Guhindura inshingano n'aho igikorwa kibera birafunze kugeza admin abitanzeho uburenganzira.",
          collectionGoal: "Intego y'inkunga (RWF)",
          collectionGoalPlaceholder: 'urugero: 50000',
          setCollectionGoal: "Shyiraho intego y'inkunga"
        },
        paymentPanel: {
          title: "Kubitsa umusanzu w'umuganda",
          description: "Abakoresha bashobora kubitsa umusanzu kandi bakabona aho umuganda uzabera ubutaha.",
          amount: 'Amafaranga (RWF)',
          amountPlaceholder: 'urugero: 2000',
          deposit: 'Bitsa',
          nextLocation: "Aho umuganda uzabera ubutaha: {location}"
        },
        settingsPanel: {
          title: 'Igenamiterere',
          description: 'Hindura konti yawe n uko wakira ubutumwa.',
          notificationChannel: 'Uburyo bwo kohereza ubutumwa',
          language: 'Ururimi',
          displayName: 'Izina rigaragara',
          save: 'Bika igenamiterere'
        }
      },
      contact: {
        eyebrow: 'Twandikire',
        title: 'Hamagara itsinda rya Umuganda-T.',
        description: "Twandikire niba ukeneye ubufasha, ufite igitekerezo cyangwa ikibazo ku muganda.",
        supportTitle: 'Itsinda rifasha',
        supportDescription: 'Ku bibazo bya porogaramu n imikoranire y umuryango, twandikire ukoresheje ifishi.',
        name: 'Izina',
        email: 'Imeli',
        message: 'Ubutumwa',
        send: 'Ohereza ubutumwa'
      },
      defaults: {
        notificationItems: [
          'Kwibutsa: Umuganda utangira kuwa Gatandatu saa 08:00.',
          'Raporo ya attendance ya Werurwe yemejwe.',
          "Hashyizweho igikorwa gishya cyo gukora isuku y'umuryango ukwezi gutaha."
        ],
        feedbackItems: [
          'Igitekerezo cyo gukangurira umutekano wo mu muhanda - Cyemejwe.',
          'Gusaba ibikoresho - Biracyasuzumwa.',
          'Amahugurwa yo mu mpera z icyumweru - Byateganyijwe.'
        ],
        events: [
          {
            id: 'default-tree-planting',
            name: 'Gutera ibiti - Nyarugenge',
            location: 'Ku biro by umurenge',
            date: 'Kuwa Gatandatu, 27 Mata, 08:00'
          },
          {
            id: 'default-drainage-cleaning',
            name: 'Gusukura imiferege - Gasabo',
            location: 'Umuhanda mukuru wa Kibagabaga',
            date: 'Kuwa Gatandatu, 25 Gicurasi, 08:00'
          }
        ],
        tasks: [
          'Kuvanaho ibyatsi byinshi ku muhanda (Nyarugenge)',
          "Gutanga ingemwe ku bakuru b'umudugudu (Nyarugenge)",
          "Kwandikisha abitabira bashya aho bahurira (Gasabo)"
        ]
      },
      messages: {
        forgotNeedAccount: 'Banza wandike imeli cyangwa telefone hanyuma ukande Wibagiwe ijambo banga.',
        forgotSent: 'Amabwiriza yo gusubiramo ijambo banga yoherejwe kuri {target}.',
        selectRoleLogin: 'Hitamo uruhare mbere yo kwinjira.',
        adminDenied: "Ntushobora kwinjira muri admin ukoresheje ayo makuru.",
        invalidLogin: 'Amakuru yo kwinjira si yo. Ongera ugenzure konti n ijambo banga.',
        wrongRole: 'Iyi konti yanditswe nka {role}. Ntishobora kwinjira nka {selectedRole}.',
        pendingApproval: 'Iyi konti iracyategereje kwemezwa na admin mbere yo kwinjira.',
        onlyUsersCanScan: 'Abakoresha gusa ni bo bashobora gukora scan ya QR ya attendance.',
        onlyUsersCanConfirmScan: 'Abakoresha gusa ni bo bashobora kwemeza scan ya QR ya attendance.',
        chooseQrEvent: 'Banza uhitemo igikorwa ushakamo QR.',
        alreadyScanned: 'Attendance yawe kuri iki gikorwa yamaze kubikwa.',
        attendanceMarked: 'Attendance yashyizweho kuri {event}.',
        attendanceAccepted: 'QR yemeye scan yawe. Attendance yawe yabitswe.',
        notificationsRead: 'Amakuru yose yashyizwe ku byasomwe.',
        reminderSent: 'Ubutumwa bwo kwibutsa bwoherejwe ku bitabiriye bose saa {time}.',
        accountApproved: '{name} ashobora noneho kwinjira nka {role}.',
        accountRejected: 'Gusaba konti kwanzwe kandi byavanyweho.',
        leaderPermissionGranted: '{name} ashobora noneho gucunga inshingano n impinduka z ibikorwa.',
        leaderPermissionRemoved: '{name} ntakemerewe gucunga inshingano n impinduka z ibikorwa.',
        promotedToLeader: "{name} yabaye umuyobozi w'umuganda kandi ashobora kwinjira nka Leader nyuma yo guhabwa uburenganzira bwa admin.",
        eventAdded: 'Igikorwa cyongeweho neza.',
        leaderEventUpdateDenied: "Admin agomba kubanza kwemerera iyi konti y'umuyobozi guhindura aho ibikorwa bibera.",
        eventUpdated: 'Aho igikorwa kibera n igihe cyacyo byahinduwe neza.',
        leaderTaskAddDenied: "Admin agomba kubanza kwemerera iyi konti y'umuyobozi kongeraho inshingano.",
        taskAdded: "Inshingano yongewe ku banyamuryango.",
        leaderTaskUpdateDenied: "Admin agomba kubanza kwemerera iyi konti y'umuyobozi guhindura inshingano.",
        taskUpdated: 'Inshingano yahinduwe neza.',
        collectionGoalSet: "Intego y'inkunga yashyizwe kuri {goal} RWF.",
        depositReceived: 'Kubitsa kwakiriwe: {amount} RWF. Hasigaye {remaining} RWF kugira ngo intego igerweho.',
        tasksSynced: 'Urutonde rw inshingano rwahujwe kandi imiterere igezweho yashyizweho.',
        settingsSaved: 'Igenamiterere ryabitswe neza.',
        feedbackSubmitted: 'Murakoze. Igitekerezo cyawe cyakiriwe kandi cyoherejwe gusuzumwa.',
        selectRoleRegister: 'Hitamo uruhare mbere yo kwiyandikisha.',
        adminRegisterBlocked: 'Konti za admin ntiziyandikishiriza hano.',
        emailExists: 'Hari konti isanzwe ikoresha iyi imeli.',
        registrationSubmitted: 'Kwiyandikisha nka {role} byoherejwe. Tegereza ko admin abyemeza mbere yo kwinjira.',
        contactSent: 'Ubutumwa bwoherejwe neza. Itsinda ryacu riraguhamagara vuba.'
      }
    },
    French: {
      meta: {
        htmlLang: 'fr',
        locale: 'fr-FR',
        title: 'Umuganda-T | Suivi du travail communautaire'
      },
      roles: {
        User: 'Utilisateur',
        Admin: 'Administrateur',
        Leader: 'Leader communautaire'
      },
      options: {
        channels: {
          'Email + SMS': 'Email + SMS',
          'Email only': 'Email seulement',
          'SMS only': 'SMS seulement'
        },
        languages: {
          English: 'Anglais',
          Kinyarwanda: 'Kinyarwanda',
          French: 'Francais'
        }
      },
      brand: {
        subtitle: 'Suivi des actions communautaires au Rwanda'
      },
      common: {
        emailAddress: 'Adresse email',
        phoneNumber: 'Numero de telephone',
        password: 'Mot de passe',
        fullName: 'Nom complet',
        pageLanguage: 'Langue de la page',
        location: 'Lieu',
        dateAndTime: 'Date et heure',
        generated: 'Genere le',
        logout: 'Se deconnecter',
        communityMember: 'Membre communautaire',
        toggleNavigation: 'Ouvrir la navigation',
        supportTeam: "Equipe d'assistance",
        office: 'Bureau',
        phone: 'Telephone',
        email: 'Email'
      },
      nav: {
        home: 'Accueil',
        about: 'A propos',
        feedback: 'Avis',
        login: 'Connexion',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'Communaute, responsabilite, action',
        title: 'Umuganda-T rend le travail communautaire visible et bien organise.',
        description: 'Suivez la participation, les activites communautaires, les avis et la coordination des adultes qui prennent part a Umuganda.',
        getStarted: 'Commencer',
        learnMore: 'En savoir plus',
        liveOverview: 'Vue en direct',
        attendanceRate: 'Taux de participation',
        adultsTracked: 'Adultes suivis'
      },
      viewer: {
        eyebrow: 'Liste des visiteurs',
        title: 'Personnes qui consultent Umuganda-T maintenant',
        summary: 'Ces visiteurs regardent actuellement la vue generale et la participation.',
        activeViewers: 'Visiteurs actifs',
        newThisHour: 'Nouveaux cette heure',
        close: 'Fermer la vue',
        pill: '{name} - en ligne {time}'
      },
      about: {
        eyebrow: "A propos de l'application",
        title: "Concue pour une meilleure organisation communautaire.",
        description: "Umuganda-T montre comment le travail est planifie, suit les presences, signale les absences et aide les communautes a garder des dossiers transparents.",
        backHome: "Retour a l'accueil",
        cards: [
          {
            title: 'Planification communautaire',
            description: 'Presentez clairement les prochains evenements Umuganda pour que les citoyens sachent quand et ou participer.'
          },
          {
            title: 'Suivi de la presence',
            description: 'Enregistrez les personnes presentes, les absents et les adultes qui demandent un suivi.'
          },
          {
            title: 'Validation des avis',
            description: "Soumettez des idees d'amelioration et obtenez rapidement un statut de validation."
          }
        ]
      },
      learnMore: {
        eyebrow: 'En savoir plus',
        title: 'Decouvrez les fonctions et avantages de Umuganda-T.',
        description: 'Explorez des outils avances pour la gestion communautaire, les analyses et les integrations administratives.',
        cards: [
          {
            title: 'Analyse des donnees',
            description: 'Obtenez des rapports detailles sur les tendances de participation et les historiques de presence.'
          },
          {
            title: "Integration avec l'administration",
            description: "Connectez facilement le systeme avec les structures locales pour des donnees verifiees."
          },
          {
            title: 'Accessibilite mobile',
            description: 'Accedez a la plateforme sur telephone, tablette et ordinateur.'
          },
          {
            title: 'Notifications en temps reel',
            description: 'Recevez des alertes instantanees pour les mises a jour, confirmations et annonces.'
          }
        ]
      },
      feedbackSection: {
        eyebrow: 'Avis',
        title: 'Envoyez votre mise a jour ou votre idee pour Umuganda-T.',
        description: 'Partagez vos idees et recevez une reponse simulee du coordinateur communautaire.',
        nameLabel: 'Nom complet',
        namePlaceholder: 'Votre nom',
        emailLabel: 'Adresse email',
        emailPlaceholder: 'nom@example.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Dites-nous ce que vous souhaitez ameliorer',
        submit: 'Envoyer un avis'
      },
      auth: {
        eyebrow: 'Acces',
        title: 'Connectez-vous ou inscrivez-vous sur votre compte Umuganda-T.',
        description: 'Choisissez la connexion par email ou telephone, ou creez un compte si vous etes nouveau.',
        loginHeading: 'Connexion',
        registerHeading: 'Inscription',
        continueAs: 'Continuer comme',
        selectRole: 'Choisir un role',
        loginMethod: 'Methode de connexion',
        emailMethod: 'Email',
        phoneMethod: 'Telephone',
        passwordPlaceholder: 'Entrez votre mot de passe',
        loginButton: 'Se connecter',
        forgotPassword: 'Mot de passe oublie',
        noAccount: "Vous n'avez pas de compte ?",
        registerHere: "S'inscrire ici",
        registerNamePlaceholder: 'Votre nom complet',
        registerEmailPlaceholder: 'nom@example.com',
        registerPasswordPlaceholder: 'Creez un mot de passe',
        registerButton: "S'inscrire",
        approvalNote: 'Les nouveaux comptes utilisateur et leader communautaire doivent etre approuves par un administrateur avant la connexion.',
        alreadyHave: 'Vous avez deja un compte ?',
        loginHere: 'Connectez-vous ici'
      },
      dashboard: {
        eyebrow: 'Tableau de bord',
        welcomeDefault: 'Bienvenue sur Umuganda-T.',
        welcomeUser: 'Bienvenue, {name} ({role}).',
        intro: 'Utilisez le menu lateral pour parcourir les notifications, avis, presences et parametres.',
        qrAttendanceScans: 'Scans QR de presence',
        signedInAs: 'Connecte en tant que',
        tabs: {
          notifications: 'Notifications',
          events: 'Evenements',
          tasks: 'Taches',
          accessControl: "Controle d'acces",
          feedback: 'Avis',
          attendance: 'Presence',
          settings: 'Parametres',
          leaderTools: 'Outils du leader',
          payments: 'Mon depot'
        },
        notificationPanel: {
          title: 'Notifications',
          markRead: 'Tout marquer comme lu',
          noQrScans: 'Aucun scan QR de presence pour le moment.'
        },
        eventsPanel: {
          title: 'Evenements a venir',
          description: 'Trouvez ou votre prochain travail communautaire aura lieu :',
          sendReminder: 'Envoyer un rappel',
          scanButton: 'Scanner le QR de presence',
          qrLoggedOut: 'Connectez-vous comme utilisateur pour scanner le QR de presence.',
          qrUser: "Les comptes utilisateur marquent la presence en scannant le QR fourni sur le lieu d'Umuganda.",
          qrOther: 'Seuls les comptes utilisateur peuvent marquer la presence avec le QR.',
          qrScannerDefault: "Acces a la camera demande pour le scan...",
          qrScannerView: '[Vue du scanner QR]',
          qrReady: 'Pret a scanner la presence pour {event}.',
          confirmScan: 'Confirmer le scan QR',
          cancelScan: 'Annuler'
        },
        tasksPanel: {
          title: 'Mes taches',
          description: 'Travaux assignes pour les sessions Umuganda en cours et a venir :',
          syncTasks: 'Synchroniser les taches',
          statusPending: 'En attente',
          statusInProgress: 'En cours',
          statusScheduled: 'Planifie',
          statusSynced: 'Synchronise'
        },
        accessPanel: {
          title: "Controle d'acces",
          description: "Approuvez les comptes, promouvez des utilisateurs en leaders communautaires et decidez quels leaders peuvent gerer les taches et les lieux d'evenement.",
          pendingApprovals: 'Demandes en attente',
          noPendingApprovals: "Aucun compte en attente pour l'instant.",
          approve: 'Approuver',
          reject: 'Refuser',
          leaderPermissions: 'Permissions des leaders',
          noApprovedLeaders: 'Aucun leader communautaire approuve pour le moment.',
          allowWorkAccess: "Autoriser l'acces",
          removeWorkAccess: "Retirer l'acces",
          memberRoleChanges: 'Changements de role',
          noUsersForPromotion: 'Aucun utilisateur approuve disponible pour la promotion.',
          promoteToLeader: 'Changer en leader communautaire',
          currentRole: 'Role actuel',
          workAccessAllowed: 'Autorise',
          workAccessDenied: 'Non autorise'
        },
        feedbackPanel: {
          title: 'Avis',
          description: "Mises a jour recentes des avis de votre equipe communautaire :",
          export: 'Exporter les avis',
          download: "Telecharger le rapport d'avis"
        },
        attendancePanel: {
          title: 'Vue de la presence',
          description: 'Indicateurs actuels de participation :',
          download: 'Generer le rapport de presence',
          downloadReady: 'Telecharger le rapport de presence',
          totalScans: 'Total des scans QR enregistres : {count}',
          uniqueUsers: 'Utilisateurs uniques presentes : {count}',
          latestScan: 'Dernier scan : {detail}',
          noLatestScan: 'Aucun scan de presence pour le moment'
        },
        leaderPanel: {
          title: 'Outils du leader',
          description: "Les leaders communautaires peuvent ajouter des evenements, modifier le lieu, ajuster les taches et fixer les objectifs de contribution apres autorisation de l'administrateur.",
          eventName: "Nom de l'evenement",
          eventNamePlaceholder: 'ex. Reparation de route - Kicukiro',
          eventLocation: 'Lieu',
          eventLocationPlaceholder: 'Secteur, cellule ou point de rencontre',
          eventDate: 'Date et heure',
          eventDatePlaceholder: 'Sam. 15 mai, 08:00',
          addEvent: "Ajouter l'evenement",
          chooseEvent: "Choisir l'evenement a modifier",
          updatedLocation: 'Nouveau lieu',
          updatedLocationPlaceholder: 'Lieu mis a jour',
          updatedDate: 'Nouvelle date et heure',
          updatedDatePlaceholder: 'Date et heure mises a jour',
          updateEvent: "Mettre a jour le lieu de l'evenement",
          taskName: 'Tache a assigner',
          taskNamePlaceholder: 'Description de la tache',
          addTask: 'Ajouter une tache',
          chooseTask: 'Choisir la tache a modifier',
          updatedTask: 'Tache mise a jour',
          updatedTaskPlaceholder: 'Nouvelle description de la tache',
          updateTask: 'Mettre a jour la tache',
          permissionActive: "L'autorisation administrateur est active. Vous pouvez ajouter des taches et modifier les lieux d'evenement.",
          permissionLocked: "Les mises a jour des taches et lieux restent bloquees tant que l'administrateur n'accorde pas cette permission.",
          collectionGoal: 'Objectif de collecte (RWF)',
          collectionGoalPlaceholder: 'ex. 50000',
          setCollectionGoal: "Definir l'objectif"
        },
        paymentPanel: {
          title: 'Deposer la contribution Umuganda',
          description: "Les utilisateurs peuvent deposer leur contribution et voir le lieu du prochain Umuganda.",
          amount: 'Montant (RWF)',
          amountPlaceholder: 'ex. 2000',
          deposit: 'Deposer',
          nextLocation: 'Lieu du prochain Umuganda : {location}'
        },
        settingsPanel: {
          title: 'Parametres',
          description: 'Gerez votre compte et vos preferences de notification.',
          notificationChannel: 'Canal de notification',
          language: 'Langue',
          displayName: 'Nom affiche',
          save: 'Enregistrer'
        }
      },
      contact: {
        eyebrow: 'Contact',
        title: "Contactez l'equipe Umuganda-T.",
        description: "Contactez-nous pour l'assistance, les avis ou les questions sur la participation.",
        supportTitle: "Equipe d'assistance",
        supportDescription: "Pour l'aide sur l'application et la coordination communautaire, contactez-nous avec le formulaire.",
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        send: 'Envoyer le message'
      },
      defaults: {
        notificationItems: [
          "Rappel : Umuganda commence ce samedi a 08:00.",
          'Le rapport de presence de mars a ete approuve.',
          'Un nouvel evenement de nettoyage communautaire a ete cree pour le mois prochain.'
        ],
        feedbackItems: [
          'Idee de campagne pour la securite routiere - Approuvee.',
          "Demande de distribution d'outils - En cours d'examen.",
          'Session de formation du week-end - Planifiee.'
        ],
        events: [
          {
            id: 'default-tree-planting',
            name: "Plantation d'arbres - Nyarugenge",
            location: 'Terrain du bureau du secteur',
            date: 'Sam. 27 avril, 08:00'
          },
          {
            id: 'default-drainage-cleaning',
            name: 'Nettoyage des caniveaux - Gasabo',
            location: 'Route principale de Kibagabaga',
            date: 'Sam. 25 mai, 08:00'
          }
        ],
        tasks: [
          'Nettoyer la vegetation le long de la route (Nyarugenge)',
          'Distribuer les plants aux anciens du village (Nyarugenge)',
          "Enregistrer les nouveaux participants au point de rassemblement (Gasabo)"
        ]
      },
      messages: {
        forgotNeedAccount: "Entrez d'abord votre email ou telephone puis cliquez sur Mot de passe oublie.",
        forgotSent: 'Les instructions de reinitialisation ont ete envoyees a {target}.',
        selectRoleLogin: 'Veuillez choisir un role avant la connexion.',
        adminDenied: "Vous ne pouvez pas entrer dans l'espace administrateur avec ces informations.",
        invalidLogin: 'Informations de connexion incorrectes. Verifiez votre compte et votre mot de passe.',
        wrongRole: 'Ce compte est enregistre comme {role}. Il ne peut pas se connecter comme {selectedRole}.',
        pendingApproval: "Ce compte attend l'approbation de l'administrateur avant de se connecter.",
        onlyUsersCanScan: 'Seuls les comptes utilisateur peuvent scanner le QR de presence.',
        onlyUsersCanConfirmScan: 'Seuls les comptes utilisateur peuvent confirmer un scan QR de presence.',
        chooseQrEvent: "Choisissez d'abord un evenement QR.",
        alreadyScanned: 'Votre presence est deja enregistree pour cet evenement.',
        attendanceMarked: 'Presence enregistree pour {event}.',
        attendanceAccepted: 'Le scan QR a ete accepte. Votre presence a ete enregistree.',
        notificationsRead: 'Toutes les notifications ont ete marquees comme lues.',
        reminderSent: 'Le rappel a ete envoye a tous les participants enregistres a {time}.',
        accountApproved: '{name} peut maintenant se connecter comme {role}.',
        accountRejected: 'La demande de compte a ete refusee et supprimee.',
        leaderPermissionGranted: '{name} peut maintenant gerer les taches et les mises a jour des evenements.',
        leaderPermissionRemoved: '{name} ne peut plus gerer les taches et les mises a jour des evenements.',
        promotedToLeader: "{name} est maintenant leader communautaire et peut se connecter avec le role Leader apres autorisation de travail de l'administrateur.",
        eventAdded: 'Evenement ajoute avec succes.',
        leaderEventUpdateDenied: "Un administrateur doit d'abord autoriser ce compte leader a modifier les lieux d'evenement.",
        eventUpdated: "Le lieu et l'horaire de l'evenement ont ete mis a jour.",
        leaderTaskAddDenied: "Un administrateur doit d'abord autoriser ce compte leader a ajouter des taches.",
        taskAdded: 'Tache ajoutee pour les membres.',
        leaderTaskUpdateDenied: "Un administrateur doit d'abord autoriser ce compte leader a modifier les taches.",
        taskUpdated: 'Tache mise a jour avec succes.',
        collectionGoalSet: 'Objectif de collecte fixe a {goal} RWF.',
        depositReceived: 'Depot recu : {amount} RWF. Reste pour atteindre l objectif : {remaining} RWF.',
        tasksSynced: 'La liste des taches a ete synchronisee et les nouveaux statuts ont ete appliques.',
        settingsSaved: 'Parametres enregistres avec succes.',
        feedbackSubmitted: 'Merci. Votre avis a ete recu et envoye pour examen.',
        selectRoleRegister: "Veuillez choisir un role avant l'inscription.",
        adminRegisterBlocked: "Les comptes administrateur ne peuvent pas etre crees ici.",
        emailExists: 'Un compte utilisant cet email existe deja.',
        registrationSubmitted: "L'inscription comme {role} a ete envoyee. Attendez l'approbation de l'administrateur avant la connexion.",
        contactSent: 'Message envoye avec succes. Notre equipe vous contactera bientot.'
      }
    }
  };

  const liveViewerNames = [
    'Jeanine', 'Eric', 'Mugisha', 'Amina', 'Emmanuel', 'Claudine',
    'Patrick', 'Diane', 'Samuel', 'Yvette', 'Didier', 'Chantal'
  ];

  let currentLanguage = 'English';
  let isLoggedIn = false;
  let currentRole = '';
  let currentAccount = null;
  let liveOverviewInterval = null;
  let homeStatsInterval = null;
  let selectedScanEventIndex = null;
  let notificationsMarkedRead = false;
  let homeStats = {
    attendanceRate: 78,
    adultsTracked: 95
  };
  let leaderData = {
    events: [],
    tasks: [],
    collectionGoal: 0,
    collectedAmount: 0
  };
  let accounts = [];
  let attendanceScans = [];
  let aiTranslationCache = {};
  let translationRenderVersion = 0;

  function setResult(element, message, color = '#9cffc7') {
    if (!element) return;
    element.textContent = message;
    element.style.color = color;
  }

  function setText(element, text) {
    if (element) element.textContent = text;
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function resolveTranslation(path, language = currentLanguage) {
    const source = translations[language] || translations.English;
    return path.split('.').reduce((current, part) => current?.[part], source);
  }

  function t(path, vars = {}, language = currentLanguage) {
    const value = resolveTranslation(path, language);
    if (typeof value !== 'string') return '';

    return Object.entries(vars).reduce((text, [key, replacement]) => {
      return text.replaceAll(`{${key}}`, String(replacement));
    }, value);
  }

  function getLocale(language = currentLanguage) {
    return translations[language]?.meta?.locale || translations.English.meta.locale;
  }

  function formatDateTime(dateValue) {
    return new Date(dateValue).toLocaleString(getLocale());
  }

  function formatTime(dateValue) {
    return new Date(dateValue).toLocaleTimeString(getLocale(), { hour: '2-digit', minute: '2-digit' });
  }

  function formatNumber(value) {
    return Number(value).toLocaleString(getLocale());
  }

  function roleLabel(role, language = currentLanguage) {
    return t(`roles.${role}`, {}, language) || role;
  }

  function currentTranslation() {
    return translations[currentLanguage] || translations.English;
  }

  function getDefaultEvents() {
    return currentTranslation().defaults.events.map((eventItem) => ({ ...eventItem }));
  }

  function getDefaultTasks() {
    return [...currentTranslation().defaults.tasks];
  }

  function getDefaultNotificationItems() {
    return [...currentTranslation().defaults.notificationItems];
  }

  function getDefaultFeedbackItems() {
    return [...currentTranslation().defaults.feedbackItems];
  }

  function setSelectOptionText(selectElement, value, label) {
    if (!selectElement) return;
    const option = Array.from(selectElement.options).find((item) => item.value === value);
    if (option) option.textContent = label;
  }

  function saveSettingsState(showFeedback = false) {
    const channel = settingsChannelSelect?.value || 'Email + SMS';
    const name = settingsNameInput?.value.trim() || currentAccount?.name || t('common.communityMember');

    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        channel,
        language: currentLanguage,
        name
      })
    );

    if (showFeedback) {
      setResult(settingsResult, t('messages.settingsSaved'));
    }
  }

  function updateHeaderVisibility() {
    siteHeader.classList.toggle('hidden', isLoggedIn);
  }

  function closeAccountMenu() {
    if (!accountDropdown || !accountToggle) return;
    accountDropdown.classList.add('hidden');
    accountToggle.setAttribute('aria-expanded', 'false');
  }

  function closeNotificationMenu() {
    if (!notificationDropdown || !notificationToggle) return;
    notificationDropdown.classList.add('hidden');
    notificationToggle.setAttribute('aria-expanded', 'false');
  }

  function closeQrScanner(clearMessage = false) {
    selectedScanEventIndex = null;
    qrScannerContainer?.classList.add('hidden');
    if (clearMessage) {
      setResult(qrScanResult, '');
    }
  }

  function renderWelcomeTitle() {
    setText(
      dashboardWelcomeTitle,
      isLoggedIn && currentAccount
        ? t('dashboard.welcomeUser', { name: currentAccount.name, role: roleLabel(currentRole) })
        : t('dashboard.welcomeDefault')
    );
  }

  function updateAccountMenu() {
    const accountLabel = accountDropdown?.querySelector('.account-label');

    if (!dashboardAccount || !accountEmailDisplay || !accountAvatar) return;

    setText(accountLabel, t('dashboard.signedInAs'));
    setText(accountLogoutButton, t('common.logout'));

    if (!isLoggedIn || !currentAccount) {
      dashboardAccount.classList.add('hidden');
      accountEmailDisplay.textContent = '';
      accountAvatar.textContent = 'U';
      closeAccountMenu();
      return;
    }

    const accountIdentity = currentAccount.email || currentAccount.phone || 'No contact';
    const avatarSeed = currentAccount.name || accountIdentity;
    dashboardAccount.classList.remove('hidden');
    accountEmailDisplay.textContent = accountIdentity;
    accountAvatar.textContent = avatarSeed.trim().charAt(0).toUpperCase() || 'U';
  }

  function getEventSnapshot(scanRecord) {
    const visibleEvent = getVisibleEvents().find((eventItem) => eventItem.id === scanRecord.eventId);

    return {
      name: visibleEvent?.name || scanRecord.eventName || '',
      location: visibleEvent?.location || scanRecord.location || '',
      date: visibleEvent?.date || scanRecord.date || ''
    };
  }

  async function updateNotificationMenu() {
    const notificationLabel = notificationDropdown?.querySelector('.account-label');
    setText(notificationLabel, t('dashboard.qrAttendanceScans'));

    if (!dashboardNotifications || !notificationCount || !notificationList) return;

    const showNotifications = isLoggedIn && currentRole === 'Admin';
    dashboardNotifications.classList.toggle('hidden', !showNotifications);

    if (!showNotifications) {
      closeNotificationMenu();
      return;
    }

    notificationCount.textContent = String(attendanceScans.length);

    if (attendanceScans.length === 0) {
      notificationList.innerHTML = `<li>${t('dashboard.notificationPanel.noQrScans')}</li>`;
      return;
    }

    const latestScans = [...attendanceScans].reverse().slice(0, 8);
    const eventNames = await translateDynamicTexts(latestScans.map((scan) => getEventSnapshot(scan).name));
    const eventLocations = await translateDynamicTexts(latestScans.map((scan) => getEventSnapshot(scan).location));

    notificationList.innerHTML = latestScans
      .map((scan, index) => {
        return `<li><strong>${scan.name}</strong><p>${eventNames[index] || getEventSnapshot(scan).name} - ${eventLocations[index] || getEventSnapshot(scan).location}</p><p>${formatDateTime(scan.scannedAt)}</p></li>`;
      })
      .join('');
  }

  function showOnlySection(targetId) {
    const sections = document.querySelectorAll('main > section');

    if (targetId === 'home') {
      document.body.style.overflowY = 'auto';
      sections.forEach((section) => {
        if (section.id === 'dashboard') {
          section.classList.toggle('hidden', !isLoggedIn);
        } else {
          section.classList.remove('hidden');
        }
      });
      return;
    }

    document.body.style.overflowY = 'auto';
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.classList.remove('hidden');
      } else if (section.id === 'dashboard' && !isLoggedIn) {
        section.classList.add('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }

  function updateLoginMethod() {
    if (!loginMethod) return;

    if (loginMethod.value === 'phone') {
      loginInputLabel.textContent = t('common.phoneNumber');
      loginInput.placeholder = '+250 7XX XXX XXX';
      loginInput.type = 'tel';
    } else {
      loginInputLabel.textContent = t('common.emailAddress');
      loginInput.placeholder = 'name@example.com';
      loginInput.type = 'email';
    }
  }

  function normalizeAccountTarget(value) {
    return value.trim().toLowerCase();
  }

  function saveAccounts() {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }

  function saveLeaderData() {
    localStorage.setItem(LEADER_DATA_STORAGE_KEY, JSON.stringify(leaderData));
  }

  function saveHomeStats() {
    localStorage.setItem(HOME_STATS_STORAGE_KEY, JSON.stringify(homeStats));
  }

  function saveAttendanceScans() {
    localStorage.setItem(ATTENDANCE_SCANS_STORAGE_KEY, JSON.stringify(attendanceScans));
  }

  function saveAiTranslationCache() {
    localStorage.setItem(AI_TRANSLATION_CACHE_KEY, JSON.stringify(aiTranslationCache));
  }

  function loadSettings() {
    if (!settingsForm) return;
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      currentLanguage = translations[parsed.language] ? parsed.language : 'English';
      settingsChannelSelect.value = parsed.channel || 'Email + SMS';
      settingsLanguageSelect.value = currentLanguage;
      settingsNameInput.value = parsed.name || '';
    } catch (error) {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    }
  }

  function loadAccounts() {
    const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);

    if (!saved) {
      accounts = [DEFAULT_ADMIN_ACCOUNT];
      saveAccounts();
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      accounts = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      accounts = [];
    }

    const hasAdmin = accounts.some((account) => account.role === 'Admin');
    if (!hasAdmin) {
      accounts.unshift(DEFAULT_ADMIN_ACCOUNT);
    }

    accounts = accounts.map((account) => ({
      ...account,
      status: account.status || (account.role === 'Admin' ? 'approved' : 'pending'),
      permissions: {
        canAddTasks: Boolean(account.permissions?.canAddTasks || account.role === 'Admin')
      }
    }));

    saveAccounts();
  }

  function loadLeaderData() {
    const saved = localStorage.getItem(LEADER_DATA_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      leaderData.events = Array.isArray(parsed.events)
        ? parsed.events.map((eventItem, index) => ({
            id: eventItem.id || `legacy-event-${index}-${slugify(eventItem.name)}`,
            ...eventItem
          }))
        : [];
      leaderData.tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
      leaderData.collectionGoal = Number(parsed.collectionGoal) || 0;
      leaderData.collectedAmount = Number(parsed.collectedAmount) || 0;
    } catch (error) {
      localStorage.removeItem(LEADER_DATA_STORAGE_KEY);
    }
  }

  function loadHomeStats() {
    const saved = localStorage.getItem(HOME_STATS_STORAGE_KEY);
    if (!saved) {
      renderHomeStats();
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      const attendanceRate = Number(parsed.attendanceRate);
      const adultsTracked = Number(parsed.adultsTracked);
      homeStats.attendanceRate = Number.isFinite(attendanceRate) ? attendanceRate : 78;
      homeStats.adultsTracked = Number.isFinite(adultsTracked) ? adultsTracked : 95;
    } catch (error) {
      localStorage.removeItem(HOME_STATS_STORAGE_KEY);
    }

    homeStats.adultsTracked = Math.max(95, Math.min(442, homeStats.adultsTracked));
    renderHomeStats();
  }

  function loadAttendanceScans() {
    const saved = localStorage.getItem(ATTENDANCE_SCANS_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      attendanceScans = Array.isArray(parsed)
        ? parsed.map((scan, index) => ({
            id: scan.id || `legacy-scan-${index}`,
            ...scan
          }))
        : [];
    } catch (error) {
      attendanceScans = [];
      localStorage.removeItem(ATTENDANCE_SCANS_STORAGE_KEY);
    }
  }

  function loadAiTranslationCache() {
    const saved = localStorage.getItem(AI_TRANSLATION_CACHE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      aiTranslationCache = parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      aiTranslationCache = {};
      localStorage.removeItem(AI_TRANSLATION_CACHE_KEY);
    }
  }

  function getCachedTranslation(language, text) {
    return aiTranslationCache?.[language]?.[text];
  }

  function setCachedTranslation(language, text, translatedText) {
    if (!aiTranslationCache[language]) {
      aiTranslationCache[language] = {};
    }

    aiTranslationCache[language][text] = translatedText;
  }

  async function translateDynamicTexts(texts, targetLanguage = currentLanguage) {
    if (!Array.isArray(texts) || texts.length === 0) {
      return [];
    }

    const normalizedTexts = texts.map((item) => (typeof item === 'string' ? item.trim() : ''));
    const missingTexts = [...new Set(normalizedTexts.filter((item) => item && !getCachedTranslation(targetLanguage, item)))];

    if (missingTexts.length > 0) {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            targetLanguage,
            texts: missingTexts
          })
        });

        if (response.ok) {
          const payload = await response.json();
          if (Array.isArray(payload.translations)) {
            missingTexts.forEach((text, index) => {
              setCachedTranslation(targetLanguage, text, payload.translations[index] || text);
            });
            saveAiTranslationCache();
          }
        }
      } catch (error) {
        // Keep original text when the AI translator API is unavailable.
      }
    }

    return normalizedTexts.map((text) => {
      if (!text) return '';
      return getCachedTranslation(targetLanguage, text) || text;
    });
  }

  function getAccountByLogin(method, value) {
    const normalizedValue = normalizeAccountTarget(value);
    return accounts.find((account) => {
      if (method === 'phone') {
        return normalizeAccountTarget(account.phone || '') === normalizedValue;
      }
      return normalizeAccountTarget(account.email || '') === normalizedValue;
    });
  }

  function ensureEditableEvents() {
    if (leaderData.events.length === 0) {
      leaderData.events = getDefaultEvents().map((eventItem) => ({ ...eventItem }));
    }
  }

  function ensureEditableTasks() {
    if (leaderData.tasks.length === 0) {
      leaderData.tasks = getDefaultTasks();
    }
  }

  function getVisibleEvents() {
    return leaderData.events.length > 0 ? leaderData.events : getDefaultEvents();
  }

  function getVisibleTasks() {
    return leaderData.tasks.length > 0 ? leaderData.tasks : getDefaultTasks();
  }

  function canCurrentLeaderManageWork() {
    return currentRole === 'Leader' && Boolean(currentAccount?.permissions?.canAddTasks);
  }

  function updateHomeStatsOnNewLogin() {
    const previousRate = homeStats.attendanceRate;
    const change = Math.floor(Math.random() * 8) - 4;
    const nextRate = Math.max(65, Math.min(95, previousRate + change));
    homeStats.attendanceRate = nextRate;
    homeStats.adultsTracked = Math.min(442, Math.max(95, homeStats.adultsTracked + 1));
    saveHomeStats();
    renderHomeStats();
  }

  function updateHomeStatsPeriodically() {
    const previousRate = homeStats.attendanceRate;
    const change = Math.floor(Math.random() * 5) - 2;
    const nextRate = Math.max(65, Math.min(95, previousRate + change));
    homeStats.attendanceRate = nextRate;
    homeStats.adultsTracked = Math.min(442, Math.max(95, homeStats.adultsTracked + Math.floor(Math.random() * 2)));
    saveHomeStats();
    renderHomeStats();
  }

  function renderHomeStats() {
    attendanceRateValue.textContent = `${homeStats.attendanceRate}%`;
    adultsTrackedValue.textContent = String(homeStats.adultsTracked);
    attendanceProgressFill.style.width = `${homeStats.attendanceRate}%`;
  }

  function renderNotificationPanelItems() {
    const items = getDefaultNotificationItems();
    notificationsList.innerHTML = '';

    items.forEach((itemText) => {
      const li = document.createElement('li');
      li.textContent = itemText;
      if (notificationsMarkedRead) {
        li.classList.add('is-read');
      }
      notificationsList.appendChild(li);
    });
  }

  function renderFeedbackStatusItems() {
    const items = getDefaultFeedbackItems();
    feedbackStatusList.innerHTML = '';

    items.forEach((itemText) => {
      const li = document.createElement('li');
      li.textContent = itemText;
      feedbackStatusList.appendChild(li);
    });
  }

  async function renderEventsList() {
    const items = getVisibleEvents();
    const canScanAttendance = currentRole === 'User';
    const translatedNames = leaderData.events.length > 0 ? await translateDynamicTexts(items.map((eventItem) => eventItem.name)) : items.map((eventItem) => eventItem.name);
    const translatedLocations = leaderData.events.length > 0 ? await translateDynamicTexts(items.map((eventItem) => eventItem.location)) : items.map((eventItem) => eventItem.location);
    const translatedDates = leaderData.events.length > 0 ? await translateDynamicTexts(items.map((eventItem) => eventItem.date)) : items.map((eventItem) => eventItem.date);
    eventsList.innerHTML = '';

    items.forEach((eventItem, index) => {
      const li = document.createElement('li');
      const scanButton = canScanAttendance
        ? `<button class="button button-secondary scan-qr-button" type="button" data-event-index="${index}">${t('dashboard.eventsPanel.scanButton')}</button>`
        : '';

      li.innerHTML = `<strong>${translatedNames[index] || eventItem.name}</strong><p>${t('common.location')}: ${translatedLocations[index] || eventItem.location} | ${translatedDates[index] || eventItem.date}</p>${scanButton}`;
      eventsList.appendChild(li);
    });

    if (items.length > 0) {
      nextEventLocationDisplay.textContent = t('dashboard.paymentPanel.nextLocation', { location: translatedLocations[0] || items[0].location });
    } else {
      nextEventLocationDisplay.textContent = '';
    }
  }

  async function renderTasksList() {
    const items = getVisibleTasks();
    const translatedTasks = leaderData.tasks.length > 0 ? await translateDynamicTexts(items) : items;
    const statuses = [
      t('dashboard.tasksPanel.statusPending'),
      t('dashboard.tasksPanel.statusInProgress'),
      t('dashboard.tasksPanel.statusScheduled')
    ];

    tasksList.innerHTML = '';
    items.forEach((taskItem, index) => {
      const li = document.createElement('li');
      const status =
        index === 1 && leaderData.tasks.length === 0
          ? statuses[1]
          : index === 2 && leaderData.tasks.length === 0
            ? statuses[2]
            : statuses[0];

      li.innerHTML = `${translatedTasks[index] || taskItem} - <span class="visual-tag task-status-tag">${status}</span>`;
      tasksList.appendChild(li);
    });
  }

  async function renderLeaderSelectors() {
    if (leaderEventSelect) {
      const events = getVisibleEvents();
      const translatedNames = leaderData.events.length > 0 ? await translateDynamicTexts(events.map((eventItem) => eventItem.name)) : events.map((eventItem) => eventItem.name);
      const translatedLocations = leaderData.events.length > 0 ? await translateDynamicTexts(events.map((eventItem) => eventItem.location)) : events.map((eventItem) => eventItem.location);
      leaderEventSelect.innerHTML = events
        .map((eventItem, index) => `<option value="${index}">${translatedNames[index] || eventItem.name} - ${translatedLocations[index] || eventItem.location}</option>`)
        .join('');
      leaderEventSelect.disabled = events.length === 0;
    }

    if (leaderTaskSelect) {
      const tasks = getVisibleTasks();
      const translatedTasks = leaderData.tasks.length > 0 ? await translateDynamicTexts(tasks) : tasks;
      leaderTaskSelect.innerHTML = tasks
        .map((taskItem, index) => `<option value="${index}">${translatedTasks[index] || taskItem}</option>`)
        .join('');
      leaderTaskSelect.disabled = tasks.length === 0;
    }
  }

  async function renderAttendanceOverview() {
    if (!attendanceList) return;

    const totalScans = attendanceScans.length;
    const uniqueUsers = new Set(attendanceScans.map((scan) => scan.accountId)).size;
    const latestScan = attendanceScans.length > 0 ? attendanceScans[attendanceScans.length - 1] : null;
    let latestDetail = t('dashboard.attendancePanel.noLatestScan');

    if (latestScan) {
      const [translatedEventName] = await translateDynamicTexts([getEventSnapshot(latestScan).name]);
      latestDetail = `${latestScan.name} - ${translatedEventName || getEventSnapshot(latestScan).name} - ${formatDateTime(latestScan.scannedAt)}`;
    }

    attendanceList.innerHTML = [
      `<li>${t('dashboard.attendancePanel.totalScans', { count: totalScans })}</li>`,
      `<li>${t('dashboard.attendancePanel.uniqueUsers', { count: uniqueUsers })}</li>`,
      `<li>${t('dashboard.attendancePanel.latestScan', { detail: latestDetail })}</li>`
    ].join('');
  }

  function renderDynamicData() {
    renderNotificationPanelItems();
    renderFeedbackStatusItems();
    renderEventsList();
    renderTasksList();
    renderLeaderSelectors();
    renderAttendanceOverview();
  }

  function renderAdminPanels() {
    if (!approvalRequestsList || !leaderPermissionsList || !memberRoleList) return;

    const pendingAccounts = accounts.filter((account) => account.role !== 'Admin' && account.status === 'pending');
    approvalRequestsList.innerHTML = '';

    if (pendingAccounts.length === 0) {
      approvalRequestsList.innerHTML = `<li>${t('dashboard.accessPanel.noPendingApprovals')}</li>`;
    } else {
      pendingAccounts.forEach((account) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${account.name}</strong>
          <p>${roleLabel(account.role)} - ${account.email}</p>
          <div class="inline-actions">
            <button class="button button-primary account-action" type="button" data-action="approve" data-account-id="${account.id}">${t('dashboard.accessPanel.approve')}</button>
            <button class="button button-secondary account-action" type="button" data-action="reject" data-account-id="${account.id}">${t('dashboard.accessPanel.reject')}</button>
          </div>
        `;
        approvalRequestsList.appendChild(li);
      });
    }

    const leaderAccounts = accounts.filter((account) => account.role === 'Leader' && account.status === 'approved');
    leaderPermissionsList.innerHTML = '';

    if (leaderAccounts.length === 0) {
      leaderPermissionsList.innerHTML = `<li>${t('dashboard.accessPanel.noApprovedLeaders')}</li>`;
    } else {
      leaderAccounts.forEach((account) => {
        const li = document.createElement('li');
        const buttonLabel = account.permissions.canAddTasks
          ? t('dashboard.accessPanel.removeWorkAccess')
          : t('dashboard.accessPanel.allowWorkAccess');
        const permissionLabel = account.permissions.canAddTasks
          ? t('dashboard.accessPanel.workAccessAllowed')
          : t('dashboard.accessPanel.workAccessDenied');

        li.innerHTML = `
          <strong>${account.name}</strong>
          <p>${account.email} - ${t('dashboard.accessPanel.currentRole')}: ${roleLabel(account.role)} - ${permissionLabel}</p>
          <button class="button button-secondary leader-permission-toggle" type="button" data-account-id="${account.id}">
            ${buttonLabel}
          </button>
        `;
        leaderPermissionsList.appendChild(li);
      });
    }

    const approvedUsers = accounts.filter((account) => account.role === 'User' && account.status === 'approved');
    memberRoleList.innerHTML = '';

    if (approvedUsers.length === 0) {
      memberRoleList.innerHTML = `<li>${t('dashboard.accessPanel.noUsersForPromotion')}</li>`;
    } else {
      approvedUsers.forEach((account) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${account.name}</strong>
          <p>${account.email} - ${t('dashboard.accessPanel.currentRole')}: ${roleLabel('User')}</p>
          <button class="button button-secondary member-role-toggle" type="button" data-account-id="${account.id}">
            ${t('dashboard.accessPanel.promoteToLeader')}
          </button>
        `;
        memberRoleList.appendChild(li);
      });
    }
  }

  function updateLeaderTaskAccessUI() {
    const canManageWork = canCurrentLeaderManageWork();

    leaderTaskForm?.classList.toggle('hidden', currentRole === 'Leader' && !canManageWork);
    leaderEventUpdateForm?.classList.toggle('hidden', currentRole === 'Leader' && !canManageWork);
    leaderTaskUpdateForm?.classList.toggle('hidden', currentRole === 'Leader' && !canManageWork);

    if (!leaderTaskPermissionNote) return;

    if (currentRole === 'Leader') {
      leaderTaskPermissionNote.textContent = canManageWork
        ? t('dashboard.leaderPanel.permissionActive')
        : t('dashboard.leaderPanel.permissionLocked');
      return;
    }

    leaderTaskPermissionNote.textContent = '';
  }

  function updateQrAccessNote() {
    if (!qrRoleNote) return;

    if (!isLoggedIn) {
      qrRoleNote.textContent = t('dashboard.eventsPanel.qrLoggedOut');
      return;
    }

    if (currentRole === 'User') {
      qrRoleNote.textContent = t('dashboard.eventsPanel.qrUser');
      return;
    }

    qrRoleNote.textContent = t('dashboard.eventsPanel.qrOther');
  }

  function applyRolePermissions() {
    dashboardLinks.forEach((link) => {
      const role = link.dataset.role || 'all';
      const allowed = role === 'all' || role === currentRole;
      link.classList.toggle('hidden', !allowed);
    });

    renderDynamicData();
    renderAdminPanels();
    updateLeaderTaskAccessUI();
    updateQrAccessNote();
    updateNotificationMenu();
    closeQrScanner(true);

    const firstVisible = Array.from(dashboardLinks).find((link) => !link.classList.contains('hidden'));
    if (firstVisible) {
      dashboardLinks.forEach((item) => item.classList.remove('active'));
      firstVisible.classList.add('active');
      dashboardPanels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.id !== firstVisible.dataset.target);
      });
    }
  }

  function downloadTextFile(fileName, content, anchorElement) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    anchorElement.href = objectUrl;
    anchorElement.download = fileName;
    anchorElement.classList.remove('hidden');
    anchorElement.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  }

  function renderLiveViewers() {
    const count = Math.floor(Math.random() * 7) + 6;
    const shuffled = [...liveViewerNames].sort(() => Math.random() - 0.5).slice(0, count);
    const now = formatTime(new Date());

    viewerList.innerHTML = shuffled
      .map((name) => `<span class="viewer-pill">${t('viewer.pill', { name, time: now })}</span>`)
      .join('');

    activeViewersCount.textContent = String(count);
    newViewersCount.textContent = String(Math.floor(Math.random() * 7) + 2);
  }

  function startLiveOverview() {
    renderLiveViewers();
    if (liveOverviewInterval) clearInterval(liveOverviewInterval);
    liveOverviewInterval = setInterval(renderLiveViewers, 5000);
  }

  function stopLiveOverview() {
    if (liveOverviewInterval) {
      clearInterval(liveOverviewInterval);
      liveOverviewInterval = null;
    }
  }

  function applyTranslations() {
    const aboutIntro = document.querySelector('#about .section-intro');
    const aboutCards = document.querySelectorAll('#about .feature-card');
    const learnMoreIntro = document.querySelector('#learn-more .section-intro');
    const learnMoreCards = document.querySelectorAll('#learn-more .feature-card');
    const feedbackIntro = document.querySelector('#feedback .section-intro');
    const loginIntro = document.querySelector('#login .section-intro');
    const dashboardIntro = document.querySelector('#dashboard .section-intro');
    const contactIntro = document.querySelector('#contact .section-intro');
    const heroButtons = document.querySelectorAll('.hero-actions .button');
    const heroStatsLabels = document.querySelectorAll('.visual-row p');
    const viewerStatsLabels = document.querySelectorAll('.viewer-stats span');
    const navLinks = siteNav.querySelectorAll('a');
    const loginLabels = loginForm.querySelectorAll('label');
    const registerLabels = registerForm.querySelectorAll('label');
    const dashboardTabKeys = [
      'dashboard.tabs.notifications',
      'dashboard.tabs.events',
      'dashboard.tabs.tasks',
      'dashboard.tabs.accessControl',
      'dashboard.tabs.feedback',
      'dashboard.tabs.attendance',
      'dashboard.tabs.settings',
      'dashboard.tabs.leaderTools',
      'dashboard.tabs.payments'
    ];
    const contactStrongLabels = document.querySelectorAll('#contact .contact-info li strong');

    document.documentElement.lang = currentTranslation().meta.htmlLang;
    document.title = currentTranslation().meta.title;

    setText(brandSubtitle, t('brand.subtitle'));
    menuToggle.setAttribute('aria-label', t('common.toggleNavigation'));
    closeViewerPanel.setAttribute('aria-label', t('viewer.close'));
    notificationToggle?.setAttribute('aria-label', t('dashboard.qrAttendanceScans'));
    accountToggle?.setAttribute('aria-label', t('dashboard.signedInAs'));

    navLinks[0].textContent = t('nav.home');
    navLinks[1].textContent = t('nav.about');
    navLinks[2].textContent = t('nav.feedback');
    navLinks[3].textContent = t('nav.login');
    navLinks[4].textContent = t('nav.contact');

    setText(document.querySelector('.hero-copy .eyebrow'), t('hero.eyebrow'));
    setText(document.querySelector('.hero-copy h1'), t('hero.title'));
    setText(document.querySelector('.hero-copy > p:not(.eyebrow)'), t('hero.description'));
    heroButtons[0].textContent = t('hero.getStarted');
    heroButtons[1].textContent = t('hero.learnMore');
    heroButtons[2].textContent = t('hero.liveOverview');
    setText(document.querySelector('.visual-card > .visual-tag'), t('hero.liveOverview'));
    heroStatsLabels[0].textContent = t('hero.attendanceRate');
    heroStatsLabels[1].textContent = t('hero.adultsTracked');
    setText(viewerPanel.querySelector('.eyebrow'), t('viewer.eyebrow'));
    setText(viewerPanel.querySelector('h3'), t('viewer.title'));
    setText(viewerPanel.querySelector('.viewer-summary'), t('viewer.summary'));
    viewerStatsLabels[0].textContent = t('viewer.activeViewers');
    viewerStatsLabels[1].textContent = t('viewer.newThisHour');

    setText(aboutIntro.querySelector('.eyebrow'), t('about.eyebrow'));
    setText(aboutIntro.querySelector('h2'), t('about.title'));
    setText(aboutIntro.querySelector('p:not(.eyebrow)'), t('about.description'));
    setText(document.querySelector('.back-home'), t('about.backHome'));
    aboutCards.forEach((card, index) => {
      setText(card.querySelector('h3'), currentTranslation().about.cards[index].title);
      setText(card.querySelector('p'), currentTranslation().about.cards[index].description);
    });

    setText(learnMoreIntro.querySelector('.eyebrow'), t('learnMore.eyebrow'));
    setText(learnMoreIntro.querySelector('h2'), t('learnMore.title'));
    setText(learnMoreIntro.querySelector('p:not(.eyebrow)'), t('learnMore.description'));
    learnMoreCards.forEach((card, index) => {
      setText(card.querySelector('h3'), currentTranslation().learnMore.cards[index].title);
      setText(card.querySelector('p'), currentTranslation().learnMore.cards[index].description);
    });

    setText(feedbackIntro.querySelector('.eyebrow'), t('feedbackSection.eyebrow'));
    setText(feedbackIntro.querySelector('h2'), t('feedbackSection.title'));
    setText(feedbackIntro.querySelector('p:not(.eyebrow)'), t('feedbackSection.description'));
    setText(document.querySelector('label[for="feedbackName"]'), t('feedbackSection.nameLabel'));
    setText(document.querySelector('label[for="feedbackEmail"]'), t('feedbackSection.emailLabel'));
    setText(document.querySelector('label[for="feedbackMessage"]'), t('feedbackSection.messageLabel'));
    document.querySelector('#feedbackName').placeholder = t('feedbackSection.namePlaceholder');
    document.querySelector('#feedbackEmail').placeholder = t('feedbackSection.emailPlaceholder');
    document.querySelector('#feedbackMessage').placeholder = t('feedbackSection.messagePlaceholder');
    setText(feedbackForm.querySelector('button[type="submit"]'), t('feedbackSection.submit'));

    setText(loginIntro.querySelector('.eyebrow'), t('auth.eyebrow'));
    setText(loginIntro.querySelector('h2'), t('auth.title'));
    setText(loginIntro.querySelector('p:not(.eyebrow)'), t('auth.description'));
    setText(loginCard.querySelector('h3'), t('auth.loginHeading'));
    setText(loginLabels[0], t('auth.continueAs'));
    setText(loginLabels[1], t('auth.loginMethod'));
    setText(document.querySelector('label[for="loginPassword"]'), t('common.password'));
    document.querySelector('#loginPassword').placeholder = t('auth.passwordPlaceholder');
    setText(loginMethodButtons[0], t('auth.emailMethod'));
    setText(loginMethodButtons[1], t('auth.phoneMethod'));
    setSelectOptionText(loginRole, '', t('auth.selectRole'));
    setSelectOptionText(loginRole, 'User', roleLabel('User'));
    setSelectOptionText(loginRole, 'Admin', roleLabel('Admin'));
    setSelectOptionText(loginRole, 'Leader', roleLabel('Leader'));
    setText(loginForm.querySelector('button[type="submit"]'), t('auth.loginButton'));
    setText(forgotPasswordButton, t('auth.forgotPassword'));
    setText(loginRegisterPrompt, t('auth.noAccount'));
    setText(showRegisterLink, t('auth.registerHere'));

    setText(registerPanel.querySelector('h3'), t('auth.registerHeading'));
    setText(registerLabels[0], t('auth.continueAs'));
    setText(document.querySelector('label[for="registerName"]'), t('common.fullName'));
    setText(document.querySelector('label[for="registerEmail"]'), t('common.emailAddress'));
    setText(document.querySelector('label[for="registerPassword"]'), t('common.password'));
    document.querySelector('#registerName').placeholder = t('auth.registerNamePlaceholder');
    document.querySelector('#registerEmail').placeholder = t('auth.registerEmailPlaceholder');
    document.querySelector('#registerPassword').placeholder = t('auth.registerPasswordPlaceholder');
    setSelectOptionText(registerRole, '', t('auth.selectRole'));
    setSelectOptionText(registerRole, 'User', roleLabel('User'));
    setSelectOptionText(registerRole, 'Leader', roleLabel('Leader'));
    setText(registerForm.querySelector('button[type="submit"]'), t('auth.registerButton'));
    setText(registerApprovalNote, t('auth.approvalNote'));
    setText(registerLoginPrompt, t('auth.alreadyHave'));
    setText(hideRegisterLink, t('auth.loginHere'));
    updateLoginMethod();

    setText(dashboardIntro.querySelector('.eyebrow'), t('dashboard.eyebrow'));
    setText(dashboardIntro.querySelector('p:not(.eyebrow)'), t('dashboard.intro'));
    renderWelcomeTitle();

    dashboardLinks.forEach((link, index) => {
      const translationKey = dashboardTabKeys[index];
      if (translationKey) {
        link.textContent = t(translationKey);
      }
    });

    setText(document.querySelector('#panel-notifications h3'), t('dashboard.notificationPanel.title'));
    setText(markReadButton, t('dashboard.notificationPanel.markRead'));
    setText(document.querySelector('#panel-events h3'), t('dashboard.eventsPanel.title'));
    setText(document.querySelector('#panel-events > p'), t('dashboard.eventsPanel.description'));
    setText(sendReminderButton, t('dashboard.eventsPanel.sendReminder'));
    setText(qrScannerMessage, selectedScanEventIndex === null ? t('dashboard.eventsPanel.qrScannerDefault') : qrScannerMessage.textContent);
    setText(confirmQrScanButton, t('dashboard.eventsPanel.confirmScan'));
    setText(cancelQrScanButton, t('dashboard.eventsPanel.cancelScan'));
    setText(document.querySelector('#panel-events .qr-placeholder'), t('dashboard.eventsPanel.qrScannerView'));

    setText(document.querySelector('#panel-tasks h3'), t('dashboard.tasksPanel.title'));
    setText(document.querySelector('#panel-tasks > p'), t('dashboard.tasksPanel.description'));
    setText(syncTasksButton, t('dashboard.tasksPanel.syncTasks'));

    setText(document.querySelector('#panel-admin-access h3'), t('dashboard.accessPanel.title'));
    setText(document.querySelector('#panel-admin-access > p'), t('dashboard.accessPanel.description'));
    setText(document.querySelector('#panel-admin-access .admin-access-card:nth-of-type(1) h4'), t('dashboard.accessPanel.pendingApprovals'));
    setText(document.querySelector('#panel-admin-access .admin-access-card:nth-of-type(2) h4'), t('dashboard.accessPanel.leaderPermissions'));
    setText(document.querySelector('#panel-admin-access .admin-access-card:nth-of-type(3) h4'), t('dashboard.accessPanel.memberRoleChanges'));

    setText(document.querySelector('#panel-feedback h3'), t('dashboard.feedbackPanel.title'));
    setText(document.querySelector('#panel-feedback > p'), t('dashboard.feedbackPanel.description'));
    setText(exportFeedbackButton, t('dashboard.feedbackPanel.export'));
    setText(feedbackDownloadLink, t('dashboard.feedbackPanel.download'));

    setText(document.querySelector('#panel-attendance h3'), t('dashboard.attendancePanel.title'));
    setText(document.querySelector('#panel-attendance > p'), t('dashboard.attendancePanel.description'));
    setText(downloadAttendanceButton, t('dashboard.attendancePanel.download'));
    setText(attendanceDownloadLink, t('dashboard.attendancePanel.downloadReady'));

    setText(document.querySelector('#panel-leader-tools h3'), t('dashboard.leaderPanel.title'));
    setText(document.querySelector('#panel-leader-tools > p'), t('dashboard.leaderPanel.description'));
    setText(document.querySelector('label[for="leaderEventName"]'), t('dashboard.leaderPanel.eventName'));
    setText(document.querySelector('label[for="leaderEventLocation"]'), t('dashboard.leaderPanel.eventLocation'));
    setText(document.querySelector('label[for="leaderEventDate"]'), t('dashboard.leaderPanel.eventDate'));
    document.querySelector('#leaderEventName').placeholder = t('dashboard.leaderPanel.eventNamePlaceholder');
    document.querySelector('#leaderEventLocation').placeholder = t('dashboard.leaderPanel.eventLocationPlaceholder');
    document.querySelector('#leaderEventDate').placeholder = t('dashboard.leaderPanel.eventDatePlaceholder');
    setText(leaderEventForm.querySelector('button[type="submit"]'), t('dashboard.leaderPanel.addEvent'));
    setText(document.querySelector('label[for="leaderEventSelect"]'), t('dashboard.leaderPanel.chooseEvent'));
    setText(document.querySelector('label[for="leaderUpdatedLocation"]'), t('dashboard.leaderPanel.updatedLocation'));
    setText(document.querySelector('label[for="leaderUpdatedDate"]'), t('dashboard.leaderPanel.updatedDate'));
    leaderUpdatedLocation.placeholder = t('dashboard.leaderPanel.updatedLocationPlaceholder');
    leaderUpdatedDate.placeholder = t('dashboard.leaderPanel.updatedDatePlaceholder');
    setText(leaderEventUpdateForm.querySelector('button[type="submit"]'), t('dashboard.leaderPanel.updateEvent'));
    setText(document.querySelector('label[for="leaderTaskName"]'), t('dashboard.leaderPanel.taskName'));
    document.querySelector('#leaderTaskName').placeholder = t('dashboard.leaderPanel.taskNamePlaceholder');
    setText(leaderTaskForm.querySelector('button[type="submit"]'), t('dashboard.leaderPanel.addTask'));
    setText(document.querySelector('label[for="leaderTaskSelect"]'), t('dashboard.leaderPanel.chooseTask'));
    setText(document.querySelector('label[for="leaderUpdatedTaskName"]'), t('dashboard.leaderPanel.updatedTask'));
    leaderUpdatedTaskName.placeholder = t('dashboard.leaderPanel.updatedTaskPlaceholder');
    setText(leaderTaskUpdateForm.querySelector('button[type="submit"]'), t('dashboard.leaderPanel.updateTask'));
    setText(document.querySelector('label[for="leaderCollectionGoal"]'), t('dashboard.leaderPanel.collectionGoal'));
    document.querySelector('#leaderCollectionGoal').placeholder = t('dashboard.leaderPanel.collectionGoalPlaceholder');
    setText(leaderCollectionForm.querySelector('button[type="submit"]'), t('dashboard.leaderPanel.setCollectionGoal'));

    setText(document.querySelector('#panel-payments h3'), t('dashboard.paymentPanel.title'));
    setText(document.querySelector('#panel-payments > p'), t('dashboard.paymentPanel.description'));
    setText(document.querySelector('label[for="depositAmount"]'), t('dashboard.paymentPanel.amount'));
    document.querySelector('#depositAmount').placeholder = t('dashboard.paymentPanel.amountPlaceholder');
    setText(depositForm.querySelector('button[type="submit"]'), t('dashboard.paymentPanel.deposit'));

    setText(document.querySelector('#panel-settings h3'), t('dashboard.settingsPanel.title'));
    setText(document.querySelector('#panel-settings > p'), t('dashboard.settingsPanel.description'));
    setText(document.querySelector('label[for="settingsChannel"]'), t('dashboard.settingsPanel.notificationChannel'));
    setText(document.querySelector('label[for="settingsLanguage"]'), t('dashboard.settingsPanel.language'));
    setText(document.querySelector('label[for="settingsName"]'), t('dashboard.settingsPanel.displayName'));
    setText(settingsForm.querySelector('button[type="submit"]'), t('dashboard.settingsPanel.save'));
    setSelectOptionText(settingsChannelSelect, 'Email + SMS', currentTranslation().options.channels['Email + SMS']);
    setSelectOptionText(settingsChannelSelect, 'Email only', currentTranslation().options.channels['Email only']);
    setSelectOptionText(settingsChannelSelect, 'SMS only', currentTranslation().options.channels['SMS only']);
    setSelectOptionText(settingsLanguageSelect, 'English', currentTranslation().options.languages.English);
    setSelectOptionText(settingsLanguageSelect, 'Kinyarwanda', currentTranslation().options.languages.Kinyarwanda);
    setSelectOptionText(settingsLanguageSelect, 'French', currentTranslation().options.languages.French);
    settingsLanguageSelect.value = currentLanguage;
    setText(publicLanguageLabel, t('common.pageLanguage'));
    publicLanguageSelect?.setAttribute('aria-label', t('common.pageLanguage'));
    setSelectOptionText(publicLanguageSelect, 'English', currentTranslation().options.languages.English);
    setSelectOptionText(publicLanguageSelect, 'Kinyarwanda', currentTranslation().options.languages.Kinyarwanda);
    setSelectOptionText(publicLanguageSelect, 'French', currentTranslation().options.languages.French);
    publicLanguageSelect.value = currentLanguage;

    setText(contactIntro.querySelector('.eyebrow'), t('contact.eyebrow'));
    setText(contactIntro.querySelector('h2'), t('contact.title'));
    setText(contactIntro.querySelector('p:not(.eyebrow)'), t('contact.description'));
    setText(document.querySelector('#contact .contact-info h3'), t('contact.supportTitle'));
    setText(document.querySelector('#contact .contact-info > p'), t('contact.supportDescription'));
    setText(contactStrongLabels[0], `${t('common.email')}:`);
    setText(contactStrongLabels[1], `${t('common.phone')}:`);
    setText(contactStrongLabels[2], `${t('common.office')}:`);
    setText(document.querySelector('label[for="contactName"]'), t('contact.name'));
    setText(document.querySelector('label[for="contactEmail"]'), t('contact.email'));
    setText(document.querySelector('label[for="contactMessage"]'), t('contact.message'));
    setText(contactForm.querySelector('button[type="submit"]'), t('contact.send'));

    if (!settingsNameInput.value && !currentAccount) {
      settingsNameInput.value = t('common.communityMember');
    }

    renderDynamicData();
    renderAdminPanels();
    updateLeaderTaskAccessUI();
    updateQrAccessNote();
    updateNotificationMenu();
    updateAccountMenu();

    if (viewerPanel && !viewerPanel.classList.contains('hidden')) {
      renderLiveViewers();
    }

    if (selectedScanEventIndex !== null) {
      const eventItem = getVisibleEvents()[selectedScanEventIndex];
      if (eventItem) {
        qrScannerMessage.textContent = t('dashboard.eventsPanel.qrReady', { event: eventItem.name });
      }
    } else {
      qrScannerMessage.textContent = t('dashboard.eventsPanel.qrScannerDefault');
    }
  }

  async function openQrScanner(eventIndex) {
    if (currentRole !== 'User' || !currentAccount) {
      setResult(eventsResult, t('messages.onlyUsersCanScan'), '#ffd166');
      return;
    }

    const eventItem = getVisibleEvents()[eventIndex];
    if (!eventItem) return;
    const [translatedEventName] = await translateDynamicTexts([eventItem.name]);

    selectedScanEventIndex = eventIndex;
    qrScannerContainer?.classList.remove('hidden');
    qrScannerMessage.textContent = t('dashboard.eventsPanel.qrReady', { event: translatedEventName || eventItem.name });
    setResult(qrScanResult, '');
  }

  function loginAccount(account) {
    currentAccount = account;
    currentRole = account.role;
    isLoggedIn = true;
    settingsNameInput.value = account.name;
    updateHomeStatsOnNewLogin();
    renderWelcomeTitle();
    updateAccountMenu();
    applyRolePermissions();
    updateHeaderVisibility();
    showOnlySection('dashboard');
    document.body.style.overflowY = 'auto';
    dashboardSection.scrollIntoView({ behavior: 'smooth' });
  }

  function resetDashboardState() {
    renderWelcomeTitle();
    dashboardPanels.forEach((panel, index) => {
      panel.classList.toggle('hidden', index !== 0);
    });
    dashboardLinks.forEach((item, index) => {
      item.classList.remove('hidden');
      item.classList.toggle('active', index === 0);
    });
    closeAccountMenu();
    closeNotificationMenu();
    closeQrScanner(true);
    renderDynamicData();
    renderAdminPanels();
    updateLeaderTaskAccessUI();
    updateQrAccessNote();
    updateNotificationMenu();
  }

  function logoutCurrentSession() {
    isLoggedIn = false;
    currentRole = '';
    currentAccount = null;
    loginRole.value = '';
    registerRole.value = '';
    updateAccountMenu();
    updateHeaderVisibility();
    showOnlySection('login');
    resetDashboardState();
    document.querySelector('#login').scrollIntoView({ behavior: 'smooth' });
  }

  loginMethod.addEventListener('change', updateLoginMethod);
  loginMethodButtons.forEach((button) => {
    button.addEventListener('click', () => {
      loginMethod.value = button.dataset.method;
      loginMethodButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      updateLoginMethod();
    });
  });

  loadSettings();
  loadAccounts();
  loadLeaderData();
  loadHomeStats();
  loadAttendanceScans();
  loadAiTranslationCache();
  applyTranslations();
  updateHeaderVisibility();
  updateAccountMenu();
  homeStatsInterval = setInterval(updateHomeStatsPeriodically, 6000);

  forgotPasswordButton.addEventListener('click', () => {
    const accountTarget = loginInput.value.trim();
    if (!accountTarget) {
      setResult(forgotPasswordResult, t('messages.forgotNeedAccount'), '#ffd166');
      return;
    }
    setResult(forgotPasswordResult, t('messages.forgotSent', { target: accountTarget }));
  });

  showRegisterLink.addEventListener('click', (event) => {
    event.preventDefault();
    registerPanel.classList.remove('hidden');
    loginCard.classList.add('hidden');
    registerPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  hideRegisterLink.addEventListener('click', (event) => {
    event.preventDefault();
    registerPanel.classList.add('hidden');
    loginCard.classList.remove('hidden');
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedRole = loginRole.value;
    const enteredPassword = document.querySelector('#loginPassword').value.trim();
    const enteredTarget = loginInput.value.trim();

    if (!selectedRole) {
      setResult(loginRoleResult, t('messages.selectRoleLogin'), '#ffd166');
      return;
    }

    const account = getAccountByLogin(loginMethod.value, enteredTarget);

    if (selectedRole === 'Admin' && (!account || account.password !== enteredPassword || account.role !== 'Admin')) {
      setResult(loginRoleResult, t('messages.adminDenied'), '#ffd166');
      return;
    }

    if (!account || account.password !== enteredPassword) {
      setResult(loginRoleResult, t('messages.invalidLogin'), '#ffd166');
      return;
    }

    if (account.role !== selectedRole) {
      setResult(
        loginRoleResult,
        t('messages.wrongRole', {
          role: roleLabel(account.role),
          selectedRole: roleLabel(selectedRole)
        }),
        '#ffd166'
      );
      return;
    }

    if (account.status !== 'approved') {
      setResult(loginRoleResult, t('messages.pendingApproval'), '#ffd166');
      return;
    }

    setResult(loginRoleResult, '');
    loginAccount(account);
    loginForm.reset();
    loginMethod.value = 'email';
    loginMethodButtons.forEach((item) => item.classList.toggle('active', item.dataset.method === 'email'));
    updateLoginMethod();
  });

  dashboardLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.dataset.target;

      dashboardLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');

      dashboardPanels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.id !== targetId);
      });
    });
  });

  notificationToggle?.addEventListener('click', () => {
    const isOpen = !notificationDropdown.classList.contains('hidden');
    closeAccountMenu();
    if (isOpen) {
      closeNotificationMenu();
      return;
    }

    notificationDropdown.classList.remove('hidden');
    notificationToggle.setAttribute('aria-expanded', 'true');
  });

  accountToggle?.addEventListener('click', () => {
    const isOpen = !accountDropdown.classList.contains('hidden');
    closeNotificationMenu();
    if (isOpen) {
      closeAccountMenu();
      return;
    }

    accountDropdown.classList.remove('hidden');
    accountToggle.setAttribute('aria-expanded', 'true');
  });

  accountLogoutButton?.addEventListener('click', () => {
    closeAccountMenu();
    logoutCurrentSession();
  });

  eventsList?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !target.classList.contains('scan-qr-button')) return;
    openQrScanner(Number(target.dataset.eventIndex));
  });

  confirmQrScanButton?.addEventListener('click', async () => {
    if (currentRole !== 'User' || !currentAccount) {
      setResult(qrScanResult, t('messages.onlyUsersCanConfirmScan'), '#ffd166');
      return;
    }

    const eventItem = getVisibleEvents()[selectedScanEventIndex ?? -1];
    if (!eventItem) {
      setResult(qrScanResult, t('messages.chooseQrEvent'), '#ffd166');
      return;
    }

    const alreadyScanned = attendanceScans.some((scan) => scan.accountId === currentAccount.id && scan.eventId === eventItem.id);

    if (alreadyScanned) {
      setResult(qrScanResult, t('messages.alreadyScanned'), '#ffd166');
      return;
    }

    attendanceScans.push({
      id: `scan-${Date.now()}`,
      accountId: currentAccount.id,
      eventId: eventItem.id,
      name: currentAccount.name,
      email: currentAccount.email,
      eventName: eventItem.name,
      location: eventItem.location,
      date: eventItem.date,
      scannedAt: new Date().toISOString()
    });

    saveAttendanceScans();
    renderAttendanceOverview();
    updateNotificationMenu();
    const [translatedEventName] = await translateDynamicTexts([eventItem.name]);
    setResult(qrScanResult, t('messages.attendanceMarked', { event: translatedEventName || eventItem.name }));
    setResult(eventsResult, t('messages.attendanceAccepted'));
  });

  cancelQrScanButton?.addEventListener('click', () => {
    closeQrScanner(true);
  });

  markReadButton.addEventListener('click', () => {
    notificationsMarkedRead = true;
    renderNotificationPanelItems();
    setResult(notificationsResult, t('messages.notificationsRead'));
  });

  sendReminderButton.addEventListener('click', () => {
    setResult(eventsResult, t('messages.reminderSent', { time: formatTime(new Date()) }));
  });

  approvalRequestsList?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !target.classList.contains('account-action')) return;

    const accountId = target.dataset.accountId;
    const action = target.dataset.action;
    const account = accounts.find((item) => item.id === accountId);
    if (!account) return;

    if (action === 'approve') {
      account.status = 'approved';
      saveAccounts();
      renderAdminPanels();
      setResult(approvalRequestsResult, t('messages.accountApproved', { name: account.name, role: roleLabel(account.role) }));
      return;
    }

    if (action === 'reject') {
      accounts = accounts.filter((item) => item.id !== accountId);
      saveAccounts();
      renderAdminPanels();
      setResult(approvalRequestsResult, t('messages.accountRejected'));
    }
  });

  leaderPermissionsList?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !target.classList.contains('leader-permission-toggle')) return;

    const account = accounts.find((item) => item.id === target.dataset.accountId);
    if (!account) return;

    account.permissions.canAddTasks = !account.permissions.canAddTasks;
    saveAccounts();
    renderAdminPanels();
    setResult(
      leaderPermissionsResult,
      account.permissions.canAddTasks
        ? t('messages.leaderPermissionGranted', { name: account.name })
        : t('messages.leaderPermissionRemoved', { name: account.name })
    );

    if (currentAccount && currentAccount.id === account.id) {
      currentAccount = { ...account };
      updateLeaderTaskAccessUI();
    }
  });

  memberRoleList?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || !target.classList.contains('member-role-toggle')) return;

    const account = accounts.find((item) => item.id === target.dataset.accountId);
    if (!account) return;

    account.role = 'Leader';
    account.permissions.canAddTasks = false;
    saveAccounts();
    renderAdminPanels();
    setResult(memberRoleResult, t('messages.promotedToLeader', { name: account.name }));
  });

  if (leaderEventForm) {
    leaderEventForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (currentRole !== 'Leader') return;

      const name = document.querySelector('#leaderEventName').value.trim();
      const location = document.querySelector('#leaderEventLocation').value.trim();
      const date = document.querySelector('#leaderEventDate').value.trim();
      if (!name || !location || !date) return;

      ensureEditableEvents();
      leaderData.events.unshift({
        id: `event-${Date.now()}-${slugify(name)}`,
        name,
        location,
        date
      });
      saveLeaderData();
      renderEventsList();
      renderLeaderSelectors();
      setResult(leaderEventResult, t('messages.eventAdded'));
      leaderEventForm.reset();
    });
  }

  if (leaderEventUpdateForm) {
    leaderEventUpdateForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!canCurrentLeaderManageWork()) {
        setResult(leaderEventUpdateResult, t('messages.leaderEventUpdateDenied'), '#ffd166');
        return;
      }

      const selectedIndex = Number(leaderEventSelect.value);
      const newLocation = leaderUpdatedLocation.value.trim();
      const newDate = leaderUpdatedDate.value.trim();
      if (!Number.isInteger(selectedIndex) || !newLocation || !newDate) return;

      ensureEditableEvents();
      if (!leaderData.events[selectedIndex]) return;

      leaderData.events[selectedIndex] = {
        ...leaderData.events[selectedIndex],
        location: newLocation,
        date: newDate
      };

      saveLeaderData();
      renderEventsList();
      renderLeaderSelectors();
      setResult(leaderEventUpdateResult, t('messages.eventUpdated'));
      leaderEventUpdateForm.reset();
    });
  }

  if (leaderTaskForm) {
    leaderTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!canCurrentLeaderManageWork()) {
        setResult(leaderTaskResult, t('messages.leaderTaskAddDenied'), '#ffd166');
        return;
      }

      const taskName = document.querySelector('#leaderTaskName').value.trim();
      if (!taskName) return;

      ensureEditableTasks();
      leaderData.tasks.unshift(taskName);
      saveLeaderData();
      renderTasksList();
      renderLeaderSelectors();
      setResult(leaderTaskResult, t('messages.taskAdded'));
      leaderTaskForm.reset();
    });
  }

  if (leaderTaskUpdateForm) {
    leaderTaskUpdateForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!canCurrentLeaderManageWork()) {
        setResult(leaderTaskUpdateResult, t('messages.leaderTaskUpdateDenied'), '#ffd166');
        return;
      }

      const selectedIndex = Number(leaderTaskSelect.value);
      const updatedTask = leaderUpdatedTaskName.value.trim();
      if (!Number.isInteger(selectedIndex) || !updatedTask) return;

      ensureEditableTasks();
      if (!leaderData.tasks[selectedIndex]) return;

      leaderData.tasks[selectedIndex] = updatedTask;
      saveLeaderData();
      renderTasksList();
      renderLeaderSelectors();
      setResult(leaderTaskUpdateResult, t('messages.taskUpdated'));
      leaderTaskUpdateForm.reset();
    });
  }

  if (leaderCollectionForm) {
    leaderCollectionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (currentRole !== 'Leader') return;

      const goal = Number(document.querySelector('#leaderCollectionGoal').value);
      if (!goal) return;
      leaderData.collectionGoal = goal;
      saveLeaderData();
      setResult(leaderCollectionResult, t('messages.collectionGoalSet', { goal: formatNumber(goal) }));
    });
  }

  if (depositForm) {
    depositForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const amount = Number(document.querySelector('#depositAmount').value);
      if (!amount || amount < 100) return;
      leaderData.collectedAmount += amount;
      saveLeaderData();
      const remaining = Math.max(leaderData.collectionGoal - leaderData.collectedAmount, 0);
      setResult(
        depositResult,
        t('messages.depositReceived', {
          amount: formatNumber(amount),
          remaining: formatNumber(remaining)
        })
      );
      depositForm.reset();
    });
  }

  syncTasksButton.addEventListener('click', () => {
    tasksList.querySelectorAll('.task-status-tag').forEach((tag, index) => {
      tag.textContent = index === 0 ? t('dashboard.tasksPanel.statusInProgress') : t('dashboard.tasksPanel.statusSynced');
      tag.classList.add('is-synced');
    });
    setResult(tasksResult, t('messages.tasksSynced'));
  });

  exportFeedbackButton.addEventListener('click', () => {
    const items = Array.from(feedbackStatusList.querySelectorAll('li')).map((item) => `- ${item.textContent.trim()}`);
    const content = [
      t('dashboard.feedbackPanel.title'),
      `${t('common.generated')}: ${formatDateTime(new Date())}`,
      '',
      ...items
    ].join('\n');

    downloadTextFile('umuganda-feedback-report.txt', content, feedbackDownloadLink);
  });

  downloadAttendanceButton.addEventListener('click', () => {
    const items = Array.from(attendanceList.querySelectorAll('li')).map((item) => `- ${item.textContent.trim()}`);
    const content = [
      t('dashboard.attendancePanel.title'),
      `${t('common.generated')}: ${formatDateTime(new Date())}`,
      '',
      ...items
    ].join('\n');

    downloadTextFile('umuganda-attendance-report.txt', content, attendanceDownloadLink);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (
      dashboardAccount &&
      !dashboardAccount.contains(target) &&
      accountDropdown &&
      !accountDropdown.classList.contains('hidden')
    ) {
      closeAccountMenu();
    }

    if (
      dashboardNotifications &&
      !dashboardNotifications.contains(target) &&
      notificationDropdown &&
      !notificationDropdown.classList.contains('hidden')
    ) {
      closeNotificationMenu();
    }
  });

  settingsLanguageSelect?.addEventListener('change', () => {
    currentLanguage = settingsLanguageSelect.value;
    if (publicLanguageSelect) {
      publicLanguageSelect.value = currentLanguage;
    }
    applyTranslations();
    saveSettingsState(false);
  });

  publicLanguageSelect?.addEventListener('change', () => {
    currentLanguage = publicLanguageSelect.value;
    if (settingsLanguageSelect) {
      settingsLanguageSelect.value = currentLanguage;
    }
    applyTranslations();
    saveSettingsState(false);
  });

  if (settingsForm) {
    settingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      currentLanguage = settingsLanguageSelect.value;
      if (publicLanguageSelect) {
        publicLanguageSelect.value = currentLanguage;
      }
      applyTranslations();
      saveSettingsState(true);
    });
  }

  viewOverviewButton.addEventListener('click', () => {
    viewerPanel.classList.toggle('hidden');
    if (!viewerPanel.classList.contains('hidden')) {
      startLiveOverview();
      viewerPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      stopLiveOverview();
    }
  });

  closeViewerPanel.addEventListener('click', () => {
    viewerPanel.classList.add('hidden');
    stopLiveOverview();
  });

  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setResult(feedbackResult, t('messages.feedbackSubmitted'));
    feedbackForm.reset();
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedRole = registerRole.value;
    const name = document.querySelector('#registerName').value.trim();
    const email = document.querySelector('#registerEmail').value.trim();
    const password = document.querySelector('#registerPassword').value.trim();

    if (!selectedRole) {
      setResult(registerRoleResult, t('messages.selectRoleRegister'), '#ffd166');
      return;
    }

    if (selectedRole === 'Admin') {
      setResult(registerRoleResult, t('messages.adminRegisterBlocked'), '#ffd166');
      return;
    }

    const emailExists = accounts.some((account) => normalizeAccountTarget(account.email) === normalizeAccountTarget(email));
    if (emailExists) {
      setResult(registerRoleResult, t('messages.emailExists'), '#ffd166');
      return;
    }

    accounts.push({
      id: `acct-${Date.now()}`,
      name,
      email,
      phone: '',
      password,
      role: selectedRole,
      status: 'pending',
      permissions: {
        canAddTasks: false
      }
    });

    saveAccounts();
    renderAdminPanels();
    setResult(registerRoleResult, t('messages.registrationSubmitted', { role: roleLabel(selectedRole) }));

    registerForm.reset();
    registerPanel.classList.add('hidden');
    loginCard.classList.remove('hidden');
    document.querySelector('#login').scrollIntoView({ behavior: 'smooth' });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setResult(contactResult, t('messages.contactSent'));
    contactForm.reset();
  });

  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showOnlySection(targetId);

      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
      }
    });
  });
});
const password = document.getElementById("loginPassword");
const toggle = document.getElementById("togglePassword");

if (password && toggle) {
  toggle.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      toggle.textContent = "🙈";
    } else {
      password.type = "password";
      toggle.textContent = "👁️";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  if (!themeToggle) {
    console.log("theme button not found");
    return;
  }

  // load saved mode
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "🌞";
  } else {
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "🌞";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
});