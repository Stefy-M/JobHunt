const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const jobs = require('./routes/jobs');
const config = require('./config/database');

mongoose.connect(config.database)

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database '+ config.database);
})


const app = express();
const port = process.env.PORT || 8080
app.use(cors());

//Body parser
app.use(bodyParser.json());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)


//Routes
app.use('/users',users);
app.use('/jobs',jobs);

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, ()=>{
    console.log('Server started on port '+ port);
})


//Index Route
app.get('/', (req,res)=>{

    res.send("Hello");
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})