const express = require('express');

const redis = require('redis');

const mysql = require('mysql2');

 

const app = express();

const redisClient = redis.createClient({ host: 'redis' });

const db = mysql.createConnection({

  host: 'mysql',

  user: 'root',

  password: 'password',

  database: 'exampledb'

});

 



app.get('/', async (req, res) => {

  db.query('SELECT NOW()', (err, results) => {

    if (err) {

      return res.status(500).send('Database query failed');

    }

    res.send(`Current time from MySQL: ${results[0]['NOW()']}`);

  });

});

 



app.get('/set-blog', (req, res) => {

  const blogData = 'blog datasi burada'; 

  redisClient.set('blog:id:1', blogData, err => {

    if (err) {

      console.error('Error setting data in Redis:', err);

      return res.status(500).send('Failed to set data in Redis');

    } else {

      console.log('Data set in Redis');

      res.send('Data set in Redis for blog id:1');

    }

  });

});

 

app.listen(3000, () => {

  console.log('Server is running on port 3000');

});