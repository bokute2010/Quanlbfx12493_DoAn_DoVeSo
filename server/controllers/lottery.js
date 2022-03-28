const Region = require('../models/regions');
const NorthLottery = require('../models/lottery/northLottery');
const CentralLottery = require('../models/lottery/centralLottery');
const SouthLottery = require('../models/lottery/southLottery');

exports.createLottery = async (req, res) => {
    try {
        //Check nếu là vé số miền Bắc.
        if (req.body.region === 'north') {
            const provinceId = req.body.province;
            const date = new Date(req.body.date);
            const special_prize = parseInt(req.body.special_prize);
            const g1 = parseInt(req.body.g1);
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
            const province = await NorthLottery.findOne({ provinceId });
            //Nếu chưa tồn tại
            if (!province) {
                const newNorthLottery = new NorthLottery({
                    provinceId: provinceId,
                    lottery: [
                        {
                            date: date,
                            special_prize: special_prize,
                            g1: g1,
                            g2: [g2_1, g2_2],
                            g3: [g3_1, g3_2, g3_3, g3_4, g3_5, g3_6],
                            g4: [g4_1, g4_2, g4_3, g4_4],
                            g5: [g5_1, g5_2, g5_3, g5_4, g5_5, g5_6],
                            g6: [g6_1, g6_2, g6_3],
                            g7: [g7_1, g7_2, g7_3, g7_4]
                        }
                    ]
                })
                return await newNorthLottery.save();
            } else {
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
            }


        }

        //Check nếu là vé số miền Trung. 
        else if (req.body.region === 'central') {
            const provinceId = req.body.province;
            const date = new Date(req.body.date);
            const special_prize = parseInt(req.body.special_prize);
            const g1 = parseInt(req.body.g1);
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
            const province = await CentralLottery.findOne({ provinceId });

            //Nếu chưa tồn tại
            if (!province) {
                const newCentralLottery = new CentralLottery({
                    provinceId: provinceId,
                    lottery: [
                        {
                            date: date,
                            special_prize: special_prize,
                            g1: g1,
                            g2: g2,
                            g3: [g3_1, g3_2],
                            g4: [g4_1, g4_2, g4_3, g4_4, g4_5, g4_6, g4_7],
                            g5: g5,
                            g6: [g6_1, g6_2, g6_3],
                            g7: g7,
                            g8: g8
                        }
                    ]
                })
                return await newCentralLottery.save();
            } else {
                return province.addLottery({
                    date: date,
                    special_prize: special_prize,
                    g1: g1,
                    g2: g2,
                    g3: [g3_1, g3_2],
                    g4: [g4_1, g4_2, g4_3, g4_4, g4_5, g4_6, g4_7],
                    g5: g5,
                    g6: [g6_1, g6_2, g6_3],
                    g7: g7,
                    g8: g8
                })
            }
        }

        //Check nếu là vé số miền Nam. 
        else if (req.body.region === 'south') {
            const provinceId = req.body.province;
            const date = new Date(req.body.date);
            const special_prize = parseInt(req.body.special_prize);
            const g1 = parseInt(req.body.g1);
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
            const province = await SouthLottery.findOne({ provinceId });

            //Nếu chưa tồn tại
            if (!province) {
                const newSouthLottery = new SouthLottery({
                    provinceId: provinceId,
                    lottery: [
                        {
                            date: date,
                            special_prize: special_prize,
                            g1: g1,
                            g2: g2,
                            g3: [g3_1, g3_2],
                            g4: [g4_1, g4_2, g4_3, g4_4, g4_5, g4_6, g4_7],
                            g5: g5,
                            g6: [g6_1, g6_2, g6_3],
                            g7: g7,
                            g8: g8
                        }
                    ]
                })
                return await newSouthLottery.save();
            } else {
                return province.addLottery({
                    date: date,
                    special_prize: special_prize,
                    g1: g1,
                    g2: g2,
                    g3: [g3_1, g3_2],
                    g4: [g4_1, g4_2, g4_3, g4_4, g4_5, g4_6, g4_7],
                    g5: g5,
                    g6: [g6_1, g6_2, g6_3],
                    g7: g7,
                    g8: g8
                })
            }
        }



        //Check nếu là vé số miền Bắc.


    } catch (error) {
        console.log(error);
    }
}

exports.getProvinces = async (req, res) => {
    try {
        const provinces = await Region.findOne();
        return res.status(200).json(provinces);
    } catch (error) {
        console.log(error);
    }
}

exports.createProvinces = async (req, res) => {
    try {
        const newProvince = new Region({
            north: [
                {
                    code: 24,
                    province: 'Hà Nội'
                },
                {
                    code: 203,
                    province: 'Quảng Ninh'
                },
                {
                    code: 222,
                    province: 'Bắc Ninh'
                },
                {
                    code: 225,
                    province: 'Hải Phòng'
                },
                {
                    code: 228,
                    province: 'Nam Định'
                },
                {
                    code: 227,
                    province: 'Thái Bình'
                }
            ],
            central: [
                {
                    code: 258,
                    province: 'Khánh Hòa'
                },
                {
                    code: 257,
                    province: 'Phú Yên'
                },
                {
                    code: 234,
                    province: 'Thừa Thiên Huế'
                },
                {
                    code: 262,
                    province: 'Đắk Lắk'
                },
                {
                    code: 261,
                    province: 'Đắk Nông'
                },
                {
                    code: 260,
                    province: 'Kon Tum'
                },
                {
                    code: 256,
                    province: 'Bình Định'
                },
                {
                    code: 235,
                    province: 'Quảng Nam'
                },
                {
                    code: 232,
                    province: 'Quảng Bình'
                },
                {
                    code: 259,
                    province: 'Ninh Thuận'
                },
                {
                    code: 255,
                    province: 'Quảng Ngãi'
                },
                {
                    code: 233,
                    province: 'Quảng Trị'
                },
                {
                    code: 269,
                    province: 'Gia Lai'
                },
                {
                    code: 236,
                    province: 'Đà Nẵng'
                }
            ],
            south: [
                {
                    code: 297,
                    province: 'Kiên Giang'
                },
                {
                    code: 273,
                    province: 'Tiền Giang'
                },
                {
                    code: 263,
                    province: 'Đà Lạt'
                },
                {
                    code: 28,
                    province: 'Hồ Chí Minh'
                },
                {
                    code: 277,
                    province: 'Đồng Tháp'
                },
                {
                    code: 290,
                    province: 'Cà Mau'
                },
                {
                    code: 254,
                    province: 'Vũng Tàu'
                },
                {
                    code: 275,
                    province: 'Bến Tre'
                },
                {
                    code: 291,
                    province: 'Bạc Liêu'
                },
                {
                    code: 299,
                    province: 'Sóc Trăng'
                },
                {
                    code: 292,
                    province: 'Cần Thơ'
                },
                {
                    code: 296,
                    province: 'An Giang'
                },
                {
                    code: 252,
                    province: 'Bình Thuận'
                },
                {
                    code: 251,
                    province: 'Đồng Nai'
                },
                {
                    code: 274,
                    province: 'Bình Dương'
                },
                {
                    code: 276,
                    province: 'Tây Ninh'
                },
                {
                    code: 270,
                    province: 'Vĩnh Long'
                },
                {
                    code: 272,
                    province: 'Long An'
                },
                {
                    code: 294,
                    province: 'Trà Vinh'
                },
                {
                    code: 271,
                    province: 'Bình Phước'
                },
                {
                    code: 293,
                    province: 'Hậu Giang'
                }
            ]
        })

        return await newProvince.save();
    } catch (error) {
        console.log(error);
    }
}