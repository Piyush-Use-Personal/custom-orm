const express = require('express');
const pool = require("./config");
const Project = require('./models/Project');
const User = require('./models/User')
const app = express();

app.get(`/`, async (req, res) => {
    await User.save({
      email: 'test@test.com',
      data: { someKey: 'someValue' }
    })

    const users = await User.get()

    res.json(users)
})
app.get(`/project`, async (req, res) => {
  await Project.save({
    user_id: 1,
    data: { someKey: 'someValue' }
  })

  const projects = await Project.get()

  res.json(projects)
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
