require("dotenv").config();
const express = require('express');
const port = 5000;
const connectDB = require('./config/db');
const app = express();


connectDB();


app.use(express.json());

app.get('/', (req, res) => {
   res.send("Hello from Express server!");
})
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
})
