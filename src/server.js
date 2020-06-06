const express = require('express');
const nunjucks = require('nunjucks');
const db = require ("./database/db");

const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});


server.get('/', (request, response) => {
  return response.render('index.html');
});

server.get('/create-point', (request, response) => {
  return response.render('create-point.html');
});

server.post('/save-point', (request, response) => {
  const { image, name, address, address2, state, city, items } = request.body;

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    image,
    name,
    address,
    address2,
    state,
    city,
    items,
  ];

  console.log(values);

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return response.send('Erro no cadastro');
    }

    console.log("Cadastrado com sucesso");
    console.log(this);

    return response.render('create-point.html', { saved: true });
  };

  db.run(query, values, afterInsertData);
});

server.get('/search', (request, response) => {
  const city = request.query.search;

  if (!city) {
    return response.render('search-results.html', { numberOfPlaces: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${city}%'`, 
    function (err, rows) {
      if (err) {
        return console.log(err);
      }

      const numberOfPlaces = rows.length;

      return response.render('search-results.html', { places: rows, numberOfPlaces });
    }
  );

});

server.listen(3000);