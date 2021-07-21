const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

require('./app/controllers/index')(app);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});