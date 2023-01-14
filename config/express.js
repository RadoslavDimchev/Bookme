const express = require('express');
const hbs = require('express-handlebars').create({ extname: '.hbs' });
const cookieParser = require('cookie-parser');
const defaultTitle = require('../middlewares/defaultTitle');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');
const trimBody = require('../middlewares/trimBody');


const JWT_SECRET = 'vbcmhgfmfoidfhbpsdlbasnfd43092378dsjkgf';

module.exports = (app) => {
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('static'));
  app.use(cookieParser());
  app.use(auth(JWT_SECRET));
  app.use(userNav());
  app.use(trimBody('password'));

  app.use(defaultTitle('Bookme Accommodation'));
};