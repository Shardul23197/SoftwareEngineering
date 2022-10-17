const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require('passport');
const connectDB = require("../DB/connectDB");

dotenv.config({ path: "./config/.env" }); // Load config
require('./config/passport')(passport); // Passport config

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;



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
        app.use('/', require('../Routes/index'));
        app.use('/auth', require('../Routes/auth'));
        app.use('/api/users', require('../Routes/routes'))
        app.use('/api/users/profile', require('../Routes/profile'))
        app.use('/api/trainer', require('../Routes/trainer'))

        app.listen(PORT, () => {
            console.log(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: ` + 
                        `listening at http://localhost:${PORT}`);
        });
}