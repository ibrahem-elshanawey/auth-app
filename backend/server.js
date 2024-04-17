const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for demonstration purposes
const users = [];

// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user object
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword
    };

    // Add user to users array
    users.push(newUser);

    res.status(201).json({ message: 'Registration successful', user: newUser });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
});
// Reset password endpoint
app.post('/reset-password', (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
  
    // Find user by ID (or username)
    const user = users.find(user => user.id === userId);
  
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Check if old password matches
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(401).json({ message: 'Invalid old password' });
    }
  
    // Hash new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
  
    // Update user's password with the new hashed password
    user.password = hashedNewPassword;
  
    res.status(200).json({ message: 'Password reset successful' });
  });
  

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
