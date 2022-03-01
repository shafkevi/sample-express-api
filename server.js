'use strict';

const express = require('express');
const cors = require('cors');
// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send({"message": `I am the api running on port ${process.env.PORT}`});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
