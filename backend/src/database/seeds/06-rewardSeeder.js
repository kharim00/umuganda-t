import Reward from '../models/rewardModel.js';

const rewards = [
  { user_id: 'user1-uuid', points: 50, badge: 'Frequent Participant' },
  { user_id: 'user3-uuid', points: 30, badge: 'Good Citizen' }
];

const seedRewards = async () => {
  await Reward.bulkCreate(rewards);
  console.log('✅ Rewards seeded');
};

export default seedRewards;
