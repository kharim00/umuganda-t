import Event from '../models/eventModel.js';
import { DataTypes } from 'sequelize';

const events = [
  { title: 'Umuganda National Cleaning', date: new Date('2024-10-05'), location: 'Kigali City Stadium', created_by: 'admin-uuid-placeholder' }, // Will update after users
  { title: 'Tree Planting Drive', date: new Date('2024-11-02'), location: 'Agaseke Park', created_by: 'leader-uuid-placeholder' },
  { title: 'Road Maintenance', date: new Date('2024-12-07'), location: 'KN 1 Rd', created_by: 'admin-uuid-placeholder' }
];

const seedEvents = async () => {
  await Event.bulkCreate(events, { individualHooks: true });
  console.log('✅ Events seeded');
};

export default seedEvents;
