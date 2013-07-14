var url = require('url');
var qs = require('querystring');
var storage = {};
var obj={}

defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS, DELETE, PUT",
  "access-control-allow-headers": "content-type, accept, origin, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var findLastTime = function(qd) {
  if(!qd.time) {
    return undefined;
  } else {
    return new Date(JSON.parse(qd.time));
  }
};


exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var messages=[]
  var path = url.parse(request.url).pathname.split("/");
  var room = path[path.length-1] || path[path.length-2];

  if(path[1]!=='classes') {
    response.writeHead(404);
    response.end('');
  } else {
    switch(request.method){
      case 'GET':
 
      request.db.query("Select * from chat", function(err, rows, fields) {
      if (err) throw err;
        console.log('rows length',rows.length)
        for(var i=0;i<rows.length;i++){
          obj={};
          obj['username']=rows[i].user;
          obj['text']=rows[i].message;
          messages.push(obj);
        }
    
        response.writeHead(200, defaultCorsHeaders);
        response.end(JSON.stringify(messages));
      });
        break;
      case 'POST':
        var body = '';
        console.log('posting')

        request.on('data', function (chunk) {
          body += chunk;
          if (body.length > 1e6) {
            request.connection.destroy();
          }
        });

        request.on('end', function () {
            console.log(JSON.stringify(body));
            console.log(body);
            console.log(typeof(body));
            body = JSON.parse(body);


            body['createdAt'] = new Date();


            var sql = "INSERT INTO chat (user,message) VALUES ('"+body.username+"','"+body.text+"')";
            console.log('sqling',sql)
            request.db.query(sql);
            // if(storage.hasOwnProperty(room)) {
            //   storage[room].push(body);
            // } else {
            //   storage[room] = [];
            //   storage[room].push(body);
            // }



        });
          console.log(body)
        response.writeHead(201, defaultCorsHeaders);
        response.end('');
        break;
      case 'OPTIONS':
        console.log('handling options request with 200')
        response.writeHead(200, defaultCorsHeaders);
        response.end('');
        break;
      default:
        response.writeHead(406, defaultCorsHeaders);
        response.end('Invalid request.');
        break;
    }
  }
};


