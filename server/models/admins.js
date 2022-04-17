const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    historyChecks: [
        {
            date: {
                type: Date,
                required: true
            },
            number: {
                type: Number,
                required: true
            },
            province: {
                type: String,
                ref: 'Province'
            },
            createAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Admin', AdminSchema);