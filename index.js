const express = require('express');
const server = express();
const db = require('./config/mongoose');

server.use(express.static('assets'));
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", "./views");



server.get('/', function (request, response) {

   db.Todo.find({},function(err, datas){
      if(err){
         console.log(`Error: ${err}`);
         return;
      }
      return response.render("index", { todos: datas });
   })


  


});


server.post('/save-todo', function (request, response) {
   console.log(request.body);

   db.Todo.create(request.body, function (err, obj) {
      if (err) {
         console.log(`Error: ${err}`);
         return;
      }
      console.log(`Data saved: ${obj}`);
      return response.redirect('/');
   });


});

server.post('/delete-todo', function (request, response) {
  
   console.log(request.body);
  db.Todo.deleteOne(request.body, function(err){
     if(err){
        console.log(`Error: ${err}`);
        return;
     }
     return response.redirect('/');
  } );
   
});







server.listen(8000);