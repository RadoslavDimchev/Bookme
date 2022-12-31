const express = require('express');
const hbs = require('express-handlebars').create({ extname: '.hbs' });

const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const defaultController = require('./controllers/defaultController');
const defaultTitle = require('./middlewares/defaultTitle');

const app = express();
const port = 3000;

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(defaultTitle('Bookme Accommodation'));

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);

app.all('*', defaultController);


app.listen(port, () => console.log(`Server listening on port ${port}...`));