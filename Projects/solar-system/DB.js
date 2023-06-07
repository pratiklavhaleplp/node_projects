const mongoose = require('mongoose');

const uri = "'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0'";

mongoose.connect('mongodb://localhost/ourdata');
mongoose.Promise = global.Promise;

