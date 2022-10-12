const express=require("express");
const app=express();

app.use(express.json());

const fs = require('fs')

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
//Write newdata to json file
const data = {
    name: '000',     //take in the current IP
    counter:1,       // incremented counter from this IP
    face_points:[0], //arry of the collected points
};

readLocalFile('./01.json',(err,data)=>{
    if(err){
        console.log(err);
    } else {
      data.counter += 1;
      fs.writeFile('./01.json',JSON.stringify(data,null,2),err => {
            if(err){
                console.log(err);
            }else{
                console.log('File successfully written!');
            }
        });
    }
});
//———————————————————————————————————————————————————————————
app.use(express.json());

app.get("./package.json",(req,res)=>{
    //change to post the json file we read from localfile
    res.status(200).json({
        message:"get message",
    });
});


app.post("/newface",(req,res)=>{

    
    console.log(req.body);
    res.status(200).json({
        message:"post message",
    });
});

app.listen(4000,()=>console.log("server listening on port 4000"));
