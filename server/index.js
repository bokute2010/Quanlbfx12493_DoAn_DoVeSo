const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const lotteryRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const cors = require('cors');
const { urlencoded } = require('express');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv').config();



const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectDB();

const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
})

//app.use(cors());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true,
    })
);

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'my section',
    resave: false,
    saveUninitialized: false,
    store: store
}))

//Routes
app.use(authRoute);
app.use(lotteryRoute);
app.use(userRoute);


// app.use((req, res, next) => {
//     //console.log(req.session);
//     next();
// })

app.get('/', (req, res) => {
    res.send('Success response!');
    console.log(req.session);
})



app.listen(5000, () => console.log('This app is listening on port 5000.'));