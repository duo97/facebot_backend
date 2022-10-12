const express=require("express");
const app=express();
const { isPromise } = require("util/types");
const fs = require('fs');
const { ServerResponse } = require("http");
var arr = []; // store multiple data form different IPs
const Ip_number = 0;


// Read and parse local josn file every time a new IP clicked in
function readLocalFile(filePath,cb){
    fs.readFile(filePath,'utf-8',(err,fileData)=>{
        if(err){
            return cb && cb(err);
        }
        try{
            const object = JSON.parse(fileData);
            return cb && cb(null,object);
        }catch(err){
            return cb && cb(err);
        }
    });
}


//———————————————————————————————————————————————————————————
app.use(express.json());
// sent data to front
app.get("./01.json",(req,res)=>{
    readLocalFile('./01.json',(err,data)=>{
        if(err) {
         res.status(404).send('Not found');
        } else {
          res.contentType(req.params.file);
          res.send(data);
        }   
        res.end();
      }); 
    res.status(200).json({
        message:"get message",
    });
});

//Write newdata to json file
app.post('./01.json',(req,res)=>{
    readLocalFile('./01.json',(err,data)=>{
        if(err){
            console.log(err);
        } else if (!arr.includes('req')){
            Ip_number += 1;
            req.counter = Ip_number;
            arr.push(req);
            arr.toString();
            fs.writeFile('./01.json',JSON.stringify(arr,null,2),err => {
                if(err){
                    console.log(err);
                }else{
                    console.log('File successfully written!');
                }
            });
        } else {
            for(var key in arr.data){
                if(req.name === arr.data[key].name) {
                    req.counter = arr.data[key].counter +=1;
                    arr.data[key]=req;
                }
              }
            arr.toString();
            fs.writeFile('./01.json',JSON.stringify(arr,null,2),err => {
                if(err){
                    console.log(err);
                }else{
                    console.log('File successfully written!');
                }
            });
        }
    });
    console.log(req.body);
    res.status(200).json({
        message:"post message",
    });
});

var port = process.env.PORT || 4000;
app.listen(port,()=>console.log("server listening on port" + port));