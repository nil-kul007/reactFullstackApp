const mongoose = require('mongoose');
const { Schema } = mongoose;  //Similiar const { Schema } = mongoose.Schema;

const  userSchema = new Schema ({
    googleID: String,
    displayName: String,
    name: Object,
    emails: String,
});

mongoose.model('users', userSchema);

