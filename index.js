const express = require('express');
const server = express();

server.use(express.static('assets'));
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", "./views");

const data = [];

server.get('/', function (request, response) {
   return response.render("index", { todos: data });
});


server.post('/save-todo', function (request, response) {

   data.push(request.body);
   return response.redirect('/');

});

server.post('/delete-todo', function (request, response) {
   let deleteIndex;
   for (let i = 0; i < data.length; i++) {
      if (data[i].description == request.body.description) {
         deleteIndex = i;
         break;
      }

   }
   data.splice(deleteIndex, 1);
   return response.redirect('/');
});







server.listen(8000);