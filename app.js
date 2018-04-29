const express = require('express');

const app = express();

const port = env.process.port || 3000;

app.listen(port,()=>{
    console.log('Server started on port: ' + port)
});