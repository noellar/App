//express http service
const express = require('express');
const server = express();
const port = 8000;
//post userdata in json format
const bodyParser = require('body-parser');
server.use(bodyParser.json());
//encode data
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, () => console.log('Listening' + port))

//connect to mongodb;
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/local_library';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
        console.log("connected"); 
	db.createCollection("users");
});

//users schema template & sign
const user = mongoose.Schema;
const peopleSchema =  new user ({
	firstName: String,
	lastName: String,
	age: Number,
	address: String
});

//model for the schema
const details = mongoose.model('details', peopleSchema );


//protection of endpoints
const jwt = require('jsonwebtoken');
const token = jwt.sign({details}, 'Math\.PI');

//add people
server.post('/', async(request, response) => {
      try{
        userlist = details.save({firstname: "Noellar", lastName:"Kappa", age:"25", address:"Budapest"});
	response.send(userlist);
	} catch(error){
		response.status(500).send(error);
		}
}); 

//test display data
server.get('/', async(request, response) => {
	try{
	result = details.find({firstname});
	response.send(result);
	}catch(error){
		response.status(500).send(error);
		}
}); 

//delete people
server.delete('/', async(request, response) => {
      try{
        response.send(details.findByIdAndRemove({firstname: "Noellar"}));
	} catch(error){
		response.status(500).send(error);
		}
}); 

//query by name
server.get('/', async(request, response) => {
      try{
        response.send(details.find({firstname}));
	} catch(error){
		response.status(500).send(error);
		}
}); 

//query by age
server.get('/', async(request, response) => {
      try{
        response.send(details.find({age}));
	} catch(error){
		response.status(500).send(error);
		}
}); 

//tests using mocha
const mocha = require('mocha');




