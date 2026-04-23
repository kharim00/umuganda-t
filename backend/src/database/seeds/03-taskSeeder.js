import Task from '../models/taskModel.js';

const tasks = [
  { event_id: 'event1-uuid-placeholder', assigned_to: 'user1-uuid-placeholder', description: 'Clean sector roads', zone: 'Zone A' },
  { event_id: 'event1-uuid-placeholder', assigned_to: 'user2-uuid-placeholder', description: 'Plant trees', zone: 'Zone B' },
  { event_id: 'event2-uuid-placeholder', assigned_to: 'user3-uuid-placeholder', description: 'Maintain drainage', zone: 'Zone C' }
];

const seedTasks = async () => {
  await Task.bulkCreate(tasks);
  console.log('✅ Tasks seeded');
};

export default seedTasks;
