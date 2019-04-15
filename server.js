const http = require('http');
const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const app = express();

// Creating a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abdullah',
    database: 'Student'
});

db.connect((err) => {
    if (err) throw err;
    console.log('connected to Database.');
});

db.query("SELECT * FROM demo", function (err, result, fields){
    if (err) throw err;
    console.log(result)
    });

    // Express route.
app.get('/', (req, resp) => {
    resp.send("hello express");
});

app.get('/db', (req, resp) => {

    db.query("SELECT * FROM students", function (err, result, fields){
        if (err) throw err;
        resp.end(JSON.stringify(result));
        // resp.end(JSON.stringify("\n"));
        resp.end();
        // db.end();
    });

    
});

const server = http.createServer((req, resp) => {
    
    if ( req.url === '/')
    {
        resp.write("hello HTTP");
        resp.end();
    }
    if ( req.url === '/database')
    {
        db.query("SELECT * FROM students", function (err, result, fields){
            if (err) throw err;
            console.log(result)
            resp.end(JSON.stringify(result));
            resp.end();
            // db.end();
        
        });
    }

    if ( req.url === '/html')
    {
        fs.readFile('index.html', function(err, data) {
            resp.writeHead(200, {'Content-Type': 'text/html'});
            resp.write(data);
            resp.end();
          });
    }      
  
});
server.listen(3777, () => console.log('listening on port 3777')); // HTTP
app.listen(3000, () => console.log("listening on port 3000")); // EXPRESS

