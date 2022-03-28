const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true
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
                required: true
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

UserSchema.methods.addHistory = function (userLottery) {
    const updatedHistory = [...this.historyChecks];

    updatedHistory.push(userLottery);

    this.historyChecks = updatedHistory;

    return this.save();
}

module.exports = mongoose.model('users', UserSchema);