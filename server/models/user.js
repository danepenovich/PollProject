let mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Name cannot be blank."]
        }
    }, {timestamps:true})

    mongoose.model("User", UserSchema);