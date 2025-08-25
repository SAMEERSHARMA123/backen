const express = require('express');
const {connectDB} = require('./Db');

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://backen-1-56c5.onrender.com ');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require("../Routes/Route")(app);

const PORT =  5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
