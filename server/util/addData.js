const data = [{
    province: 'Hà Nội',
    lottery: [],
    region: 'north'
},
{
    province: 'Quảng Ninh',
    lottery: [],
    region: 'north'
},
{
    province: 'Bắc Ninh',
    lottery: [],
    region: 'north'
},
{
    province: 'Hải Phòng',
    lottery: [],
    region: 'north'
},
{
    province: 'Nam Định',
    lottery: [],
    region: 'north'
},
{
    province: 'Thái Bình',
    lottery: [],
    region: 'north'
},

// Central
{
    province: 'Khánh Hòa',
    lottery: [],
    region: 'central'
},
{
    province: 'Phú Yên',
    lottery: [],
    region: 'central'
},
{
    province: 'Thừa Thiên Huế',
    lottery: [],
    region: 'central'
},
{
    province: 'Đắk Lắk',
    lottery: [],
    region: 'central'
},
{
    province: 'Đắk Nông',
    lottery: [],
    region: 'central'
},
{
    province: 'Kon Tum',
    lottery: [],
    region: 'central'
},
{
    province: 'Bình Định',
    lottery: [],
    region: 'central'
},
{
    province: 'Quảng Nam',
    lottery: [],
    region: 'central'
},
{
    province: 'Quảng Bình',
    lottery: [],
    region: 'central'
},
{
    province: 'Ninh Thuận',
    lottery: [],
    region: 'central'
},
{
    province: 'Quảng Ngãi',
    lottery: [],
    region: 'central'
},
{
    province: 'Quảng Trị',
    lottery: [],
    region: 'central'
},
{
    province: 'Gia Lai',
    lottery: [],
    region: 'central'
},
{
    province: 'Đà Nẵng',
    lottery: [],
    region: 'central'
},

//South
{
    province: 'Kiên Giang',
    lottery: [],
    region: 'south'
},
{
    province: 'Tiền Giang',
    lottery: [],
    region: 'south'
},
{
    province: 'Đà Lạt',
    lottery: [],
    region: 'south'
},
{
    province: 'Hồ Chí Minh',
    lottery: [],
    region: 'south'
},
{
    province: 'Đồng Tháp',
    lottery: [],
    region: 'south'
},
{
    province: 'Cà Mau',
    lottery: [],
    region: 'south'
},
{
    province: 'Vũng Tàu',
    lottery: [],
    region: 'south'
},
{
    province: 'Bến Tre',
    lottery: [],
    region: 'south'
},
{
    province: 'Bạc Liêu',
    lottery: [],
    region: 'south'
},
{
    province: 'Sóc Trăng',
    lottery: [],
    region: 'south'
},
{
    province: 'Cần Thơ',
    lottery: [],
    region: 'south'
},
{
    province: 'An Giang',
    lottery: [],
    region: 'south'
},
{
    province: 'Bình Thuận',
    lottery: [],
    region: 'south'
},
{
    province: 'Đồng Nai',
    lottery: [],
    region: 'south'
},
{
    province: 'Bình Dương',
    lottery: [],
    region: 'south'
},
{
    province: 'Tây Ninh',
    lottery: [],
    region: 'south'
},
{
    province: 'Vĩnh Long',
    lottery: [],
    region: 'south'
},
{
    province: 'Long An',
    lottery: [],
    region: 'south'
},
{
    province: 'Trà Vinh',
    lottery: [],
    region: 'south'
},
{
    province: 'Bình Phước',
    lottery: [],
    region: 'south'
},
{
    province: 'Hậu Giang',
    lottery: [],
    region: 'south'
}];

for (let province of data) {
    const newProvince = new Province(province)

    await newProvince.save()

    //console.log(province);
}