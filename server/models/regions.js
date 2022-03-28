const mongoose = require('mongoose');

const RegionSchema = new mongoose.Schema({
    north: [
        {
            code: {
                type: Number,
                required: true
            },
            province: {
                type: String,
                required: true
            }
        }
    ],
    central: [
        {
            code: {
                type: Number,
                required: true
            },
            province: {
                type: String,
                required: true
            }
        }
    ],
    south: [
        {
            code: {
                type: Number,
                required: true
            },
            province: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Region', RegionSchema);