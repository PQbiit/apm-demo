const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'bc1922e0127d4050bbf0f0027cc3762f',
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();
//app.use(express.json());
const port = process.env.PORT || 4400;
const students = [];

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
    rollbar.info('HTML file served successfully');
});

app.post('/api/student',(req,res)=>{
    let {name} = req.body;
    name = name.trim();
    students.push(name);
    rollbar.log('student added successfully',{author:'DJ', type: 'manual entry'});
    res.status(200).send(students);
});

app.use(rollbar.errorHandler());

app.listen(port,()=> console.log(`server running on port ${port}!`))
