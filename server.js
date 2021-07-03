const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'build'), { maxAge: 31536000 }));

const server = app.listen(PORT, () => {
  console.log('App running on port ', server.address().port);
});
