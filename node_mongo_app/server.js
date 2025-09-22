const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/Users');



const app = express();
const PORT = 5000;


app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/PracticeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Connection Error:", err));


app.get("/", (req, res) => {
    res.send("Hello from Node.js + MongoDB!");
});


// --- Fetch all users ---
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});