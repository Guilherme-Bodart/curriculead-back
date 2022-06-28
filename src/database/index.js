const mongoose = require('mongoose');

const uri_test = "mongodb+srv://outrigger:Dwu5cRsfqmF60oup@cluster0.rda29.gcp.mongodb.net/testCurriculum?retryWrites=true&w=majority";
const uri_production = "mongodb+srv://outrigger:Dwu5cRsfqmF60oup@cluster0.rda29.gcp.mongodb.net/productionCurriculum?retryWrites=true&w=majority";

mongoose.connect(uri_test, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
module.exports = mongoose;