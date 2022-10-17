const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, './config/.env') }); // Load env variables;
const morgan = require("morgan");
const connectDB = require("./DB/connectDB");
const passport = require('passport');
require('./config/passport')(passport); // Passport config
console.log(__dirname);


const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) 
        cluster.fork();
  
    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
  
  } else {
        const app = express();

        // If the app is in development use Morgan to log requests to the app
        if (process.env.NODE_ENV === 'development')
            app.use(morgan('dev'));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({
            origin: [ 'http://localhost:3000', 'http://10.20.218.232:3000' ],
            credentials: true
        }));

        connectDB.createMongooseConnection(); // Connect mongoose to the DB

        app.use(passport.initialize()); // Passport middleware

        // Routes
        app.use('/', require(path.resolve(__dirname, './Routes/index')));
        app.use('/auth', require(path.resolve(__dirname, './Routes/auth')));
        app.use('/api/users', require(path.resolve(__dirname, './Routes/routes')));
        app.use('/api/users/profile', require(path.resolve(__dirname, './Routes/profile')));
        app.use('/api/trainer', require(path.resolve(__dirname, './Routes/trainer')));

        app.listen(PORT, () => {
            console.log(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: ` + 
                        `listening at http://localhost:${PORT}`);
        });
}