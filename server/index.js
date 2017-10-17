const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 1337;
const app = express();
module.exports = app;

app.use(express.static(path.join(__dirname, '..', 'public')))
  .use(express.static(path.join(__dirname, '..', 'node_modules/bootstrap/dist')))
  .use('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public/index.html')))
  .use((err, req, res, next) =>
    res.status(err.status || 500).send(err.message || 'Internal server error.'));

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
