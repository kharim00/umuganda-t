const bcrypt = require('bcrypt');
const sequelize = require('./src/config/DB.js').sequelize;
const User = require('./src/database/models/userModel.js');

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin if not exists
    const [admin, created] = await User.findOrCreate({
      where: { phone: '0780000000' },
      defaults: {
        name: 'System Admin',
        phone: '0780000000',
        password: hashedPassword,
        role: 'admin'
      }
    });

    if (created) {
      console.log('✅ Admin created: phone=0780000000, password=admin123');
    } else {
      console.log('ℹ️ Admin already exists');
      // Update password just in case
      admin.password = hashedPassword;
      await admin.save();
      console.log('✅ Admin password updated');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seedAdmin();
