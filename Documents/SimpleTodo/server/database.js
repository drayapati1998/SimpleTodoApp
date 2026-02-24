//To import sqlite we use this
const sqlite3=require("sqlite3").verbose();
//To open and create database.sqlite file connection
const db=new sqlite3.Database('./database.sqlite',(err)=>{
    if(err){
        console.error("Error connecting to database",err.message);
    }else{
        console.log("connected to sqlite database.");
    }
    
});
module.exports=db;//export the database