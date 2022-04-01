const mongoose = require('mongoose');

const ProvinceSchema = new mongoose.Schema({
    province: {
        type: String,
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
            ],
            g8: [
                Number
            ]
        }
    ],
    region: {
        type: String,
        required: true
    }
})

ProvinceSchema.methods.updateLottery = async function (lottery) {

    //Lấy ra các lottery cũ
    const oldLotteries = [...this.lottery];

    //Tìm ra lottery index
    const index = oldLotteries.findIndex(index => index._id.toString() === lottery._id.toString());

    //Thay thế lottery cũ bằng dữ liệu mới update thông quan giá trị index
    oldLotteries[index] = lottery;

    const updatedLottery = [...oldLotteries];

    //Lưu lại vào database
    this.lottery = updatedLottery;
    await this.save();

}

ProvinceSchema.methods.deleteLottery = async function (lotteryId) {
    const oldLotteries = [...this.lottery];
    const updatedLottery = oldLotteries.filter(lottery => lottery._id.toString() !== lotteryId);

    //Check coi đã thực sự đã lọc đúng chưa
    if (updatedLottery.length === oldLotteries.length - 1) {
        this.lottery = updatedLottery;
        await this.save();
    } else {
        console.log("Không tìm thấy dữ liệu cần xóa")
    }

}

ProvinceSchema.methods.deleteMultiLottery = async function (data) {
    const oldLotteries = [...this.lottery];
    let updatedLottery = oldLotteries
    for (let lottery of data) {
        updatedLottery = updatedLottery.filter(item => item._id.toString() !== lottery.toString())
    }

    //Check coi đã thực sự đã lọc đúng chưa
    if (updatedLottery.length === oldLotteries.length - data.length) {

        this.lottery = updatedLottery;
        await this.save();
    }

}

ProvinceSchema.methods.addLottery = async function (lottery) {
    const oldlotteries = [...this.lottery];
    oldlotteries.push(lottery);
    this.lottery = oldlotteries;
    await this.save();
}


module.exports = mongoose.model('Province', ProvinceSchema)