var mysql = require('mysql');
var http = require("http");
var myStuff = require("./request-handler");

var port = 8082;
var ip = "127.0.0.1";

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var Sequelize = require("sequelize");
var sequelize = new Sequelize("relationalchat", "root", "plantlife");

var Users = sequelize.define('Users', {
  user_name: Sequelize.STRING
});

var Messages = sequelize.define('Messages',{
  messages: Sequelize.TEXT,
  chat_room: Sequelize.TEXT,
  created_by: Sequelize.INTEGER
});


Users.sync();
Messages.sync();
// var dbConnection = mysql.createConnection({
//   user: "root",
//   password: "plantlife",
//   database: "sequelizechat"
// });


// dbConnection.connect();

 // Now you can make queries to the Mysql database using the
 // * dbConnection.query() method.
 // * See https://github.com/felixge/node-mysql for more details about
 // * using this module.

var server = http.createServer(function(req, res){
  req.users = Users;
  req.messages= Messages;
  myStuff.handleRequest(req, res);
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);









/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

// dbConnection.end();
