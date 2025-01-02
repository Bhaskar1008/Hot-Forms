const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const User = require('./models/User');

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (user) {
        res.json({ success: true, role: user.role });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });

    app.post('/api/register', async (req, res) => {
      const { email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
      const user = new User({ email, password, role });
      await user.save();
      res.json({ success: true });
    });

    app.get('/api/users', async (req, res) => {
      const users = await User.find();
      res.json(users);
    });

    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
