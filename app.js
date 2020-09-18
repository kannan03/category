
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var app = express();
const axios = require('axios');
var port = 5555;

// database connection 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "blaze.ws",
    database: "kannan"
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());



// login page
app.get('/', function(req,res){
  res.sendFile(__dirname + '/category.html');
});

app.post('/category', function(request, response) {
	var C_name = request.body.CategoryName;
	if ( C_name) {
		con.query('SELECT category_name FROM category WHERE category_name = ? ', [C_name], function(error, results, fields) {
            
            if (results.length > 0) {
                console.log('already exist');
                response.send({message : "already exist"});

            } 
            else {
                con.query('INSERT INTO category (category_name) VALUES (?) ', [C_name], function(err, result) {
                    if (err) throw err;
                    console.log(' added success');
                    response.send({message : "Added Success"});
                });
			}			
        
        });
  } 
});



// url 404 page 
app.get('*', function(req, res) {
  res.status(404).send('page Not found');
});


app.listen(port, ()=> {
console.log('server running port :' + port);
});
  
