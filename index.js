const express = require('express');
const pool = require("./config");
const app = express();

app.get(`/`, async (req, res) => {
    const data = await pool.query('select * from users')
    res.json(data?.rows)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
