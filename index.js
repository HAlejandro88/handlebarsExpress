const express = require('express');
const path = require('path');
const logger =  require('./middleware/logger');
const membersRoute = require('./routes/api/members');
const exphbs = require('express-handlebars');
const members = require('./Members');
const app =  express();



// Init Middleware
// app.use(logger)

// Handlebars Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home page route
app.get('/', (req,res) => {
    res.render('index', {title: 'Members APP', members});
})


app.use('/api/members',membersRoute );

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running in this port ${PORT}`));