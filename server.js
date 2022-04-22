'use strict';

const Redis = require('ioredis');
const express = require('express');
const cors = require('cors');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
});

// App
const app = express();
app.use(cors());

app.get('/',  (req, res) => {
  res.send({"message": `I am the api running on port ${process.env.PORT}`});
});

app.get('/env', (req, res) => {
    console.log(process.env);
    res.send(process.env);
});
app.get('/redis/put/:key/:value', async (req, res) => {
  await redis.set(req.params.key, req.params.value);
  res.send({"message": `I wrote ${req.params.key}:${req.params.value} for you`});
});
app.get('/redis/get/:key', async (req, res) => {
  const value = await redis.get(req.params.key);
  res.send({"message": `I grabbed ${req.params.key}:${value} for you`});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
