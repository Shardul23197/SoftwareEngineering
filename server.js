const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const mainRoutes = require("./Routes/routes");
const connectDB = require("./DB/connectDB");

dotenv.config({ path: "config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(mainRoutes);

connectDB();

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