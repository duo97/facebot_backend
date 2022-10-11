const express=require("express");
const app=express();

app.use(express.json());


//fill in: read and parse local json file
function readLocalFile(req,res,next){
    console.log("reading from localfile");
    next();
}

app.get("/",(req,res)=>{
    //change to post the json file we read from localfile
    res.status(200).json({
        message:"get message",
    });
});

app.post("/newface",(req,res)=>{
    //cahnge to save the json we get from the request to json file
    console.log(req.body);
    res.status(200).json({
        message:"post message",
    });
});

app.listen(4000,()=>console.log("server running on port 4000"));