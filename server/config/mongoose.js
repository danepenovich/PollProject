var mongoose = require("mongoose"),
path = require("path"),
fs = require("fs"), //fs allows us to read and write files
mp = path.join(__dirname, "./../models");

mongoose.connect("mongodb://localhost/beltpractice");
mongoose.Promise = global.Promise;

fs.readdirSync(mp).forEach(function(file){
if(file.indexOf(".js") >=0){
    require(mp + "/" + file);
}
})