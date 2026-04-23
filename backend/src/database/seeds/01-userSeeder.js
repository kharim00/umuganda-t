import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const users = [
  { name: 'Admin Umuganda', phone: '0781234567', national_id: '100000001', role: 'admin', village: 'Kigali Central', password: 'admin123' },
  { name: 'Leader Nyabugogo', phone: '0781234568', national_id: '100000002', role: 'leader', village: 'Nyabugogo', password: 'leader123' },
  { name: 'Mukamana Marie', phone: '0789123456', national_id: '300000001', role: 'citizen', village: 'Kacyiru', password: 'pass123' },
  { name: 'Niyonzima Pierre', phone: '0789123457', national_id: '300000002', role: 'citizen', village: 'Kacyiru', password: 'pass123' },
  // Add more citizens...
  { name: 'Uwimana Jeanne', phone: '0789123458', national_id: '300000003', role: 'citizen', village: 'Remera', password: 'pass123' },
  { name: 'Habimana Jean', phone: '0789123459', national_id: '300000004', role: 'citizen', village: 'Remera', password: 'pass123' }
  // Realistic Rwandan names/phones/villages, truncated for brevity; expand to 20 in full
];

const seedUsers = async () => {
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    await User.create({ ...userData, password: hashedPassword });
  }
  console.log('✅ Users seeded');
};

export default seedUsers;
