const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.port || 8000;
const app = express();

// need these middlewares for POST and PUT requests as they SEND data which is enclosed in the body (req.body)
app.use(express.json()); // recognize incoming request as json object
app.use(express.urlencoded({ extended: false })); // parses the incoming request with urlencoded payloads and is based upon the body-parser

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
