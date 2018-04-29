const express = require('express');
const path = require('path');

const exphbs  = require('express-handlebars');
const hbs = exphbs.create({ /* config */ });

const app = express();
const port = process.env.port || 3000;

const routes = require('./routes/routes');

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/',routes);

app.listen(port,()=>{
    console.log('Server started on port: ' + port)
});