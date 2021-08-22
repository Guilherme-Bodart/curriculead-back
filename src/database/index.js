  
const mongoose = require('mongoose');

const uri_teste = "mongodb+srv://outrigger:curriculead@cluster0.xb4uz.mongodb.net/teste?retryWrites=true&w=majority";
const uri_producao = "mongodb+srv://outrigger:curriculead@cluster0.xb4uz.mongodb.net/producao?retryWrites=true&w=majority";

mongoose.connect(uri_teste, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;