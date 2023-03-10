let webData = require('../database/web_data')
let userData = require('../database/user_data')
let modules = require('../modules/modules')
let http = require('url');
let express = require('express');
let path = require('path');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let elasticlunr = require('elasticlunr');
let router = express.Router();


router.get('/', (req, res, next) => {
  try {
    res.render('index', { title: 'Index your pages in wood', description: 'Index your pages in wood', style: 'search', status: false })
  } catch (err) {
    // Error handling
    console.error(err)
  }
})

router.post('/index', (req, res, next) => {
  try {
    if (req.body.url) {
      let url = new URL(req.body.url);
      webData.addIndex(url).then((response) => {
        res.redirect('/index')
      }).catch((err) => {
        if (err.error == 'Url is not valid!.') {
          res.render('index', { title: 'Index your pages in wood', description: 'Index your pages in wood', style: 'search', status: true, err: "Sorry this page is not exist." })
        } else {
          res.render('index', { title: 'Index your pages in wood', description: 'Index your pages in wood', style: 'search', status: true, err: "Sorry this page is already indexed you cant index this page." })
        }
      })
    }
  } catch (err) {
    // Error handling
    console.error(err)
  }
})

router.get('/robots.txt', (req, res, next) => {
  try {
    res.sendFile(path.resolve(__dirname, 'seo', 'robots.txt'));
  } catch (err) {
    console.error(err)
  }
})


module.exports = router;
