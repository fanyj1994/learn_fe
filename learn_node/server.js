let data = require('./data')
const express = require('express');
const body_parser = require('body-parser')
const server = express();
const port = 4000;

server.use(body_parser.json())

server.get('/json', (req, res) => {
  res.json({message: 'hello world'});
});

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = data.find(_item => _item.id === itemId);

  if (item) {
    res.json(item);
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

  data.push(item)
  res.json(data)
})

server.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = req.body;
  console.log('Editing item: ' + itemId, ' to be ', item);

  const updatedListItems = [];

  data.forEach(oldItem => {
    if (oldItem.id === itemId) {
      updatedListItems.push(item);
    } else {
      updatedListItems.push(oldItem);
    }
  })

  data = updatedListItems;

  res.json(data);
})

server.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  console.log('Delete item ', itemId);
  data = data.filter(item => item.id !== itemId)

  res.json(data);
})

server.listen(port, () => {
  console.log(`server listening at ${port}`)
})