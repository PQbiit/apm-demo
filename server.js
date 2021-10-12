const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accesstoken: 'bc1922e0127d4050bbf0f0027cc3762f',
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();
const port = process.env.PORT || 4400;

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
    rollbar.info('HTML file served successfully');
});

app.listen(port,()=> console.log(`server running on port ${port}!`))
