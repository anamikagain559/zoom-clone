const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'));
}

// Initialize file if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

const jsonDb = {
  getUsers: () => {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  saveUser: async (user) => {
    const users = jsonDb.getUsers();
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    const newUser = {
      _id: Date.now().toString(),
      name: user.name,
      email: user.email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    return newUser;
  },

  findUserByEmail: (email) => {
    const users = jsonDb.getUsers();
    return users.find(u => u.email === email.toLowerCase());
  },

  comparePassword: async (candidatePassword, hashedPassword) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
};

module.exports = jsonDb;
