const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NorthLotterySchema = new Schema({
    provinceId: {
        type: mongoose.Schema.Types.ObjectId,
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
})

NorthLotterySchema.methods.addLottery = function (lottery) {

    //Lưu các giá trị đã có sẵn trong array lottery.
    const oldProvinceLottery = [...this.lottery];

    oldProvinceLottery.push(lottery);
    const updatedProvinceLottery = [...oldProvinceLottery];
    this.lottery = updatedProvinceLottery;
    return this.save();

}

module.exports = mongoose.model('NorthLottery', NorthLotterySchema);