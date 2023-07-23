const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String, // This should be a hashed password
}));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.send('Login successful!');
    // Here, you might start a session, set cookies, or redirect the user
  } else {
    res.send('Invalid username or password.');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
