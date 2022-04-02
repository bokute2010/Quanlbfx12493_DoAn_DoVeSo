const mongoose = require('mongoose');

const Province = require('../models/provinces');

exports.deleteMultiLottery = async (req, res) => {
    try {
        const data = req.body;

        // Lọc ra các tỉnh
        let provinceIds = []

        for (let item of data) {
            provinceIds.push(item.provinceId)
        }

        const uniqueProvinceIds = [...new Set(provinceIds)];

        const newData = [];
        //Tạo ra object chứa dữ liệu theo format mong muốn
        for (let item of uniqueProvinceIds) {
            newData.push({ provinceId: item, lottery: [] });
        }

        for (let item of newData) {
            for (let lottery of data) {
                if (lottery.provinceId === item.provinceId) {
                    item.lottery.push(lottery.lotteryId)
                }
            }
        }

        // ------------------------
        for (let item of newData) {
            await Province.findById(item.provinceId)
                .then(province => {
                    return province.deleteMultiLottery(item.lottery);
                })
        }


        await Province.find()
            .then(provinces => {
                res.status(200).json(provinces);
            });

    } catch (error) {
        console.log(error);
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.updateLottery = async (req, res) => {
    try {
        const updatedLottery = req.body;

        updatedLottery._id = mongoose.Types.ObjectId(req.body._id);

        await Province.findById(req.query.provinceId)
            .then(province => {
                return province.updateLottery(updatedLottery)
            })
            .then(() => {
                Province.find()
                    .then(provinces => {
                        return res.status(200).json(provinces);
                    });
            })
    } catch (error) {
        console.log(error)
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.deleteLottery = async (req, res) => {
    try {
        //console.log(req.query)
        const provinceId = await req.query.provinceId;
        const lotteryId = req.query.lotteryId;

        await Province.findById(provinceId)
            .then((province) => {
                return province.deleteLottery(lotteryId)
            })
            .then(() => {
                Province.find()
                    .then(provinces => {
                        return res.status(200).json(provinces);
                    });
            })

    } catch (error) {
        console.log(error);
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.createLottery = async (req, res) => {
    try {
        const provinceId = req.body.province;
        const date = new Date(req.body.date);
        const special_prize = parseInt(req.body.special_prize);
        const g1 = parseInt(req.body.g1);
        //Check nếu là vé số miền Bắc.
        if (req.body.region === 'north') {
            const g2_1 = parseInt(req.body.g2_1);
            const g2_2 = parseInt(req.body.g2_2);
            const g3_1 = parseInt(req.body.g3_1);
            const g3_2 = parseInt(req.body.g3_2);
            const g3_3 = parseInt(req.body.g3_3);
            const g3_4 = parseInt(req.body.g3_4);
            const g3_5 = parseInt(req.body.g3_5);
            const g3_6 = parseInt(req.body.g3_6);
            const g4_1 = parseInt(req.body.g4_1);
            const g4_2 = parseInt(req.body.g4_2);
            const g4_3 = parseInt(req.body.g4_3);
            const g4_4 = parseInt(req.body.g4_4);
            const g5_1 = parseInt(req.body.g5_1);
            const g5_2 = parseInt(req.body.g5_2);
            const g5_3 = parseInt(req.body.g5_3);
            const g5_4 = parseInt(req.body.g5_4);
            const g5_5 = parseInt(req.body.g5_5);
            const g5_6 = parseInt(req.body.g5_6);
            const g6_1 = parseInt(req.body.g6_1);
            const g6_2 = parseInt(req.body.g6_2);
            const g6_3 = parseInt(req.body.g6_3);
            const g7_1 = parseInt(req.body.g7_1);
            const g7_2 = parseInt(req.body.g7_2);
            const g7_3 = parseInt(req.body.g7_3);
            const g7_4 = parseInt(req.body.g7_4);

            //Tìm xem đã tồn tại record province chưa.

            await Province.findById(provinceId)
                .then((province) => {
                    if (province) {
                        return province.addLottery({
                            date: date,
                            special_prize: special_prize,
                            g1: g1,
                            g2: [g2_1, g2_2],
                            g3: [g3_1, g3_2, g3_3, g3_4, g3_5, g3_6],
                            g4: [g4_1, g4_2, g4_3, g4_4],
                            g5: [g5_1, g5_2, g5_3, g5_4, g5_5, g5_6],
                            g6: [g6_1, g6_2, g6_3],
                            g7: [g7_1, g7_2, g7_3, g7_4]
                        })

                    } else {
                        throw error;
                    }
                })
                .then(() => {
                    return Province.find()
                        .then(provinces => {
                            res.status(200).json(provinces)
                        });
                })

            //res.status(200).json(provinces)
        }
        //Check nếu là vé số miền Trung hoặc Nam.
        else {
            const g2 = parseInt(req.body.g2);

            const g3_1 = parseInt(req.body.g3_1);
            const g3_2 = parseInt(req.body.g3_2);

            const g4_1 = parseInt(req.body.g4_1);
            const g4_2 = parseInt(req.body.g4_2);
            const g4_3 = parseInt(req.body.g4_3);
            const g4_4 = parseInt(req.body.g4_4);
            const g4_5 = parseInt(req.body.g4_5);
            const g4_6 = parseInt(req.body.g4_6);
            const g4_7 = parseInt(req.body.g4_7);

            const g5 = parseInt(req.body.g5);

            const g6_1 = parseInt(req.body.g6_1);
            const g6_2 = parseInt(req.body.g6_2);
            const g6_3 = parseInt(req.body.g6_3);

            const g7 = parseInt(req.body.g7);
            const g8 = parseInt(req.body.g8);
            //Tìm xem đã tồn tại record province chưa.
            await Province.findById(provinceId)
                .then(province => {
                    province.addLottery({
                        date: date,
                        special_prize: special_prize,
                        g1: g1,
                        g2: [g2],
                        g3: [g3_1, g3_2],
                        g4: [g4_1, g4_2, g4_3, g4_4, g4_5, g4_6, g4_7],
                        g5: [g5],
                        g6: [g6_1, g6_2, g6_3],
                        g7: [g7],
                        g8: [g8]
                    })
                    const provinces = Province.find();
                    return res.status(200).json(provinces);
                })
        }
    } catch (error) {
        console.log(error);
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.getProvinces = async (req, res) => {
    try {
        await Province.find()
            .then(provinces => {
                return res.status(200).json(provinces);
            });

    } catch (error) {
        console.log(error);
    }
}

exports.addHardData = async (req, res) => {
    try {
        //Random date
        // function randomDate(start, end) {
        //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        // }
        // let randomDate = randomDate(new Date("12-2-2020"), new Date())
        // //Random special_prize to g3
        // let randomSpecialPrize_G3 = Math.floor(Math.random() * 90000) + 10000;


        // //Random g4_g5
        // let randomG4_G5 = Math.floor(Math.random() * 9000) + 1000;
        // //let randomG2_1 = Math.floor(Math.random() * 10000)

        // //Random g6
        // let randomG6 = Math.floor(Math.random() * 900) + 100;
        // //let randomG6 = Math.floor(Math.random() * 1000)

        // //Random g7
        // let randomG7 = Math.floor(Math.random() * 90) + 10;

        // for (let i = 0; i < 100; i++) {
        //     //Random special_prize to g3
        //     let randomSpecialPrize_G3 = Math.floor(Math.random() * 90000) + 10000;


        //     //Random g4_g5
        //     let randomG4_G5 = Math.floor(Math.random() * 9000) + 1000;
        //     //let randomG2_1 = Math.floor(Math.random() * 10000)

        //     //Random g6
        //     let randomG6 = Math.floor(Math.random() * 900) + 100;
        //     //let randomG6 = Math.floor(Math.random() * 1000)

        //     //Random g7
        //     let randomG7 = Math.floor(Math.random() * 90) + 10;
        //     console.log(randomSpecialPrize_G3, randomG4_G5, randomG6, randomG7)
        // }

        await Province.find()
            .then(provinces => {
                for (let province of provinces) {
                    if (province.region === 'north') {
                        for (let i = 0; i < 100; i++) {
                            //Random date
                            function randomDate(start, end) {
                                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                            }
                            //randomDate(new Date("12-2-2020"), new Date())

                            //Random special_prize 
                            let randomSpecialPrize_G3 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g1
                            let randomG1 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g2
                            let randomG2_1 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG2_2 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g3
                            let randomG3_1 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG3_2 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG3_3 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG3_4 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG3_5 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG3_6 = Math.floor(Math.random() * 90000) + 10000;


                            //Random g4
                            let randomG4_1 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG4_2 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG4_3 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG4_4 = Math.floor(Math.random() * 9000) + 1000;

                            //Random g5
                            let randomG5_1 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG5_2 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG5_3 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG5_4 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG5_5 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG5_6 = Math.floor(Math.random() * 9000) + 1000;

                            //Random g6
                            let randomG6_1 = Math.floor(Math.random() * 900) + 100;
                            let randomG6_2 = Math.floor(Math.random() * 900) + 100;
                            let randomG6_3 = Math.floor(Math.random() * 900) + 100;


                            //Random g7
                            let randomG7_1 = Math.floor(Math.random() * 90) + 10;
                            let randomG7_2 = Math.floor(Math.random() * 90) + 10;
                            let randomG7_3 = Math.floor(Math.random() * 90) + 10;
                            let randomG7_4 = Math.floor(Math.random() * 90) + 10;

                            province.addLottery({
                                date: randomDate(new Date("12-2-2020"), new Date()),
                                special_prize: randomSpecialPrize_G3,
                                g1: randomG1,
                                g2: [randomG2_1, randomG2_2],
                                g3: [randomG3_1, randomG3_2, randomG3_3, randomG3_4, randomG3_5, randomG3_6],
                                g4: [randomG4_1, randomG4_2, randomG4_3, randomG4_4],
                                g5: [randomG5_1, randomG5_2, randomG5_3, randomG5_4, randomG5_5, randomG5_6],
                                g6: [randomG6_1, randomG6_2, randomG6_3],
                                g7: [randomG7_1, randomG7_2, randomG7_3, randomG7_4]
                            })
                        }
                    }
                }
            });

    } catch (error) {
        console.log(error)
    }
}

