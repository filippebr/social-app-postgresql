const express = require('express');
const routes = require('./routes');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(3333);