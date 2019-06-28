let data = require('./data')
const db = require('diskdb')
const express = require('express');
const body_parser = require('body-parser')
const server = express();
const port = 4000;

db.connect('./data', ['movies'])

if (!db.movies.find().length) {
  const movie = {id: 'tt0110357', name: 'The Lion King', genre: 'animation'}
  db.movies.save(movie)
}

console.log(db.movies.find())

server.use(body_parser.json())

server.get('/json', (req, res) => {
  res.json({message: 'hello world'});
});

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const items = db.movies.find({id: itemId})

  if (items.length) {
    res.json(items);
  } else {
    res.json({ message: `item ${itemId} doesn't exist`})
  }
})

server.get('/info', (req, res) => {
  res.sendFile(__dirname + '/info.html')
})

server.post('/items', (req, res) => {
  const item = req.body;
  console.log('Adding new item:', item);

  db.movies.save(item)

  res.json(db.movies.find())
})

server.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = req.body;
  console.log('Editing item: ' + itemId, ' to be ', item);

  db.movies.update({ id: itemId }, item)

  res.json(db.movies.find());
})

server.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  console.log('Delete item ', itemId);

  db.movies.remove({ id: itemId })
  data = data.filter(item => item.id !== itemId)

  res.json(db.movies.find());
})

server.listen(port, () => {
  console.log(`server listening at ${port}`)
})