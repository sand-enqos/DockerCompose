
const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
   host: 'redis-server',
   port: 6379
});

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'mysql-server',
  user: 'root',
  password: 'Ch0c0l@teM1lk!',
  database: 'flvservice'
});

var sqlStatus = "not connected";
connection.connect(function(err) {
    if (err) throw err
        console.log('You are now connected...');
        sqlStatus = "connected";   
});
  

var count = 0;
app.get('/', (req, res) => {
   client.set('visits', count++);
   client.get('visits', (err, val) => {
       res.send(`this is the count test ${val} -- ${sqlStatus}`);
   });
});

app.listen(3000, () =>{
    console.log('Listening ports');
});





