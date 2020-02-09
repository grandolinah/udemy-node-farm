// core modules
const fs = require('fs');
const http = require('http');
const url = require('url');

// third party modules
const slugify = require('slugify');

// local modules
const replaceTemplate = require('./modules/replaceTemplate');

/////////////////////////
// SERVER

// config
const port = 8000;

// data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));

console.log(slugs);

// templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

// server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%CARDS%}', cardHTML);

    res.end(output);

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api' || pathname === '/API') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('This page is not found on the server');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening for requests on localhost:${port}`);
});
