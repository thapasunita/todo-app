const express = require('express');
const db = require('./config/mongoose');

const server = express();
const port = 8000;

server.use(express.static('assets'));
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", "./views");


server.get('/', (request, response) => {
   db.Todo.find({}, (err, datas) => {
      if (err) {
         console.log(`Error fetching data from db: ${err}`);
         return;
      }
      return response.render("index", { todos: datas });
   });
});


server.post('/save-todo', (request, response) => {

   console.log(`Recieved payload: ${request.body}`);

   db.Todo.create(request.body, (err, obj) => {
      if (err) {
         console.log(`Error: ${err}`);
         return;
      }
      console.log(`Data saved: ${obj}`);
      return response.redirect('/');
   });

});

server.post('/delete-todo', (request, response) => {

   console.log(`Recieved payload: ${request.body}`);

   db.Todo.deleteOne(request.body, (err) => {
      if (err) {
         console.log(`Error: ${err}`);
         return;
      }
      return response.redirect('/');
   });

});

server.listen(port, (err) => {
   if (err) {
      console.log(`Error occured: ${err}`);
      return;
   }
   console.log(`Application started at port: ${port}`);
   console.log(`http://localhost:${port}`);
});