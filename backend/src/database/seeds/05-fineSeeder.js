import Fine from '../models/fineModel.js';

const fines = [
  { user_id: 'user2-uuid', event_id: 'event1-uuid', amount: 5000, reason: 'Absent without excuse', status: 'unpaid' },
  { user_id: 'user4-uuid', event_id: 'event2-uuid', amount: 3000, reason: 'Late arrival', status: 'paid' }
];

const seedFines = async () => {
  await Fine.bulkCreate(fines);
  console.log('✅ Fines seeded');
};

export default seedFines;
