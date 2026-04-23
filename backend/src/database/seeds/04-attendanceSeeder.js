import Attendance from '../models/attendanceModel.js';

const attendances = [
  { user_id: 'user1-uuid', event_id: 'event1-uuid', status: 'present' },
  { user_id: 'user2-uuid', event_id: 'event1-uuid', status: 'absent' },
  { user_id: 'user3-uuid', event_id: 'event2-uuid', status: 'present' }
  // More combinations
];

const seedAttendance = async () => {
  await Attendance.bulkCreate(attendances);
  console.log('✅ Attendance seeded');
};

export default seedAttendance;
