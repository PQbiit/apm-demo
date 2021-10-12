const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4400;

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.listen(port,()=> console.log(`server running on port ${port}!`))
