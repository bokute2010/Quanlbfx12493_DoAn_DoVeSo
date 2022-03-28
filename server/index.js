const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const lotteryRoute = require('./routes/lottery');
const userRoute = require('./routes/user');
const cors = require('cors');
const { urlencoded } = require('express');

const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://funix:funix@cluster0.xox99.mongodb.net/DOVESO?retryWrites=true&w=majority');
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectDB();

const app = express();

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(authRoute);
app.use(lotteryRoute);
app.use(userRoute);

app.get('/', (req, res) => {
    res.send('Success response!');
})

app.listen(5000, () => console.log('This app is listening on port 5000.'));