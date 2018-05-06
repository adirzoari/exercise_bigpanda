const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const helmet = require('helmet');
var cors=require('cors');



mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/exercise_bigPanda');


const app = express();



// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(helmet())
app.use(cors({origin:true,credentials: true}));


// Routes
const comments = require('./routes/comments');



app.use('/comments',comments);

// Catch 404 Errors and forward them to error handler
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404
    next(err)
});

// Error handler function
app.use((err,req,res,next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500;

    res.status(status).json({
        error:{
            message: error.message
        }
    })
    //Response to client

    //Respond to Terminal/console
    console.error(err)
})



// Start the server

const port = process.env.PORT || 3013;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)}
)
