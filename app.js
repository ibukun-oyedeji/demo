// app.js
const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

app.get('/', (req, res) => {
  redisClient.set('key', 'Hello World');
  redisClient.get('key', (err, value) => {
    if (err) {
      res.status(500).send('Error connecting to Redis');
    } else {
      res.send(`Message from Redis: ${value}`);
    }
  });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
