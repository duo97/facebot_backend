const express=require("express");
const app=express();

app.use(express.json());


// Read and parse local josn file every time a new IP clicked in
function readLocalFile(req,res,next){
    express.readFile('./package.json','utf-8',(err,fileData)=>{
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
    next();
}

app.get("/",(req,res)=>{
    //change to post the json file we read from localfile
    res.status(200).json({
        message:"get message",
    });
});

//Write newdata to json file
const newData = {
    name: '', //take in the current IP
    counter:'' ,// incremented counter from this IP
    face_points:'' ,//arry of the collected points
};

app.save("/newface",(req,res)=>{
    readLocalFile(req,res,next);{
        if(err){
            console.log(err);
        }
        else {
            // modify newData here
            express.writeFile('./package,json',JSON.stringify(newData,null,2),err => {
                if(err){
                    console.log(err);
                }else{
                    console.log('File successfully written!');
                }
            });
        }
    };
    
    console.log(req.body);
    res.status(200).json({
        message:"post message",
    });
});

app.listen(4000,()=>console.log("server listening on port 4000"));
