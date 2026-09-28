const mongoose = require("mongoose");

function ConnecttoDB() {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch(err => {
            console.log("MongoDB connection failed:", err);
        });
}

module.exports = ConnecttoDB;