require("dotenv").config();
const express = require('express');
const port = 5000;
const connectDB = require('./config/db');
const app = express();


connectDB();


app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));


app.get('/', (req, res) => {
   res.send("Hello from Express server!");
})
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
})
