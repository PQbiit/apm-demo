const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'bc1922e0127d4050bbf0f0027cc3762f',
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();
app.use(express.json());
app.use('/style',express.static(path.join(__dirname,'/public/styles.css')));

const port = process.env.PORT || 4400;
const students = [];

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
    rollbar.info('HTML file served successfully');
});

app.get('/fake-function',(req,res) =>{
    try {
        //This does not exist!
        fakeFunction();
    } catch (err) {
        rollbar.critical('Call to a non existent function');
        res.status(400).send(err)
    }
});

app.post('/api/student',(req,res)=>{
    let {name} = req.body;
    name = name.trim();

    if(!isNaN(name)){
        //Recieved numbers
        rollbar.warning('Recieved numbers instead of string');
    }

    const index = students.findIndex(studentName=> studentName === name)
    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'LAAQ', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }
});

app.use(rollbar.errorHandler());

app.listen(port,()=> console.log(`server running on port ${port}!`))
