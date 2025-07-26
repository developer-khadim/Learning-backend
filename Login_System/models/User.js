const mangoos = require('mangoose');
const { Schema } = require('mongoose');
const schema= mangoos.schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email:String,
    passowrd: String,
    verified: Boolean
});


const User = mangoos.modle('User' , UserSchema)

module.exports = User;