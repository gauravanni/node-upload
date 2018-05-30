const express = require('express');
const formidable = require('formidable');
const xlsxj = require("xlsx-to-json");
const app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
        
    });

    form.on('file', function (name, file){

        console.log('Uploaded ' + file.name);
        xlsxj({
            input: `./uploads/${file.name}`, 
            output: "output.json"
          }, function(err, result) {
            if(err) {
              console.error(err);
            }else {
              console.log(result);
            }
          });

    });

    form.on('progress',(bytesReceived, bytesExpected)=>{
        console.log(`bytesReceived ${bytesReceived}`);
        console.log(`bytesExpected ${bytesExpected}`);
    })

    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);