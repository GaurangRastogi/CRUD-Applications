const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const path=require('path');
//morgan is use to console log the request that is made
const bodyparser=require('body-parser');

const connectDB=require('./server/database/connection');
const { connection } = require('mongoose');

const app=express();

dotenv.config({path:'config.env'});
const PORT=process.env.PORT||8080;
//If dotenv has some port start at that port otherwise default 8080 

//log request
app.use(morgan('tiny'));


//MongoDb Connection
connectDB();

//pass request to body parser help to get body in  requests by clients
app.use(bodyparser.urlencoded({extended:true}));

//set view engine 'ejs'
app.set("view engine","ejs");
//if we're keeping ejs templates inside views folder
//then we don't need to specify path since 'views' is default path
//Say the folder name is 'templates' then write=>
//app.set("views",path.resolve(__dirname,"templates"));


//load assets using middleware method -> 'use'
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));


//Load Routers -> a middleware
app.use('/',require('./server/routes/router'));


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});