const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LotterySchema = new Schema({
    north: [
        {
            provinceId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            lottery: [
                {
                    date: {
                        type: Date,
                        required: true,
                        default: new Date()
                    },
                    special_prize: {
                        type: Number,
                        required: true
                    },
                    g1: {
                        type: Number,
                        required: true
                    },
                    g2: [
                        Number
                    ],
                    g3: [
                        Number
                    ],
                    g4: [
                        Number
                    ],
                    g5: [
                        Number
                    ],
                    g6: [
                        Number
                    ],
                    g7: [
                        Number
                    ]
                }
            ]
        }
    ],

})

module.exports = mongoose.model('lotteries', LotterySchema);