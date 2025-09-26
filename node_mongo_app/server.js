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



// DELETE user by _id
app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted", deletedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// UPDATE user by _id
app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,       // fields to update
            { new: true }   // return updated document instead of old
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated", updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});






// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});