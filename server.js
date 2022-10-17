const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require('passport');
const connectDB = require("./DB/connectDB");

// Load config
dotenv.config({ path: "./config/.env" });

// Passport config
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// If the app is in development use Morgan to log requests to the app
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [ 'http://localhost:3000', 'http://10.20.218.232:3000' ],
	credentials: true
}));

// Connect mongoos to the DB
connectDB.createMongooseConnection();

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/', require('./Routes/index'));
app.use('/auth', require('./Routes/auth'));
app.use('/api/users', require('./Routes/routes'))
app.use('/api/users/profile', require('./Routes/profile'))
app.use('/api/trainer', require('./Routes/trainer'))

app.listen(PORT, () => {
    console.log(`Your app is listening on http://localhost:${PORT}`);
});

// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
    app.use(express.static('frontend/build'))  // set static folder 
    //returning frontend for any route other than api 
    app.get('*',(req,res)=>{     
        res.sendFile (path.resolve(__dirname,'frontend','build',         
                      'index.html' ));    
    });
}