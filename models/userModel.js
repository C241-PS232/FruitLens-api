/**
 * User model using Mongoose.
 * This model sets up the schema and interaction with the 'users' collection in MongoDB.
 */

const mongoose = require('mongoose');

/**
 * User schema for the 'users' collection.
 * This schema defines the structure of the documents stored in the collection.
 */
const userSchema = new mongoose.Schema({
    /**
     * User's name.
     * Type: String
     * Required: Yes
     */
    name: {
        type: String,
        required: true
    },
    /**
     * User's email.
     * Type: String
     * Required: Yes
     * Unique: Yes
     */
    email: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * User's password.
     * Type: String
     * Required: Yes
     */
    password: {
        type: String,
        required: true
    }
});

/**
 * User model.
 * This model provides an interface to interact with the 'users' collection.
 */
module.exports = mongoose.model('User', userSchema);
