const express=require("express");//importing express to create server connection
const cors=require("cors");//importing cors for different port numbers to use and frontend to connect
const app=express();
const port=5000;
app.use(cors({
    'origin':'*',
    methods:["Get","post","put","delete"]
}));//using cors
app.use(express.json());//allow to use json format
const db=require('./database');//importing SQlite database
//creating todos table if not exists 
db.run(`create table if not exists todos(
    id integer primary key AUTOINCREMENT, 
    title Text NOT NULL,
    completed integer Default 0,
    createdAt Text)`,(err)=>{
        if(err){
            console.error("Error creating table:",err.message);
        }else{
            console.log("Todos table ready.");
        }
    });
  //Get all the todos   
 app.get("/api/todos",(req,res)=>{
    db.all("select * from todos",[],(err,rows)=>{//select all rows from todo
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.json(rows);

    });
 }); 
 //Post method to add the todo
 app.post("/api/todos", (req, res) => {
  const title = req.body.title;
 if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
 const createdAt = new Date().toISOString();
 db.run(
    "INSERT INTO todos (title,completed,createdAt)VALUES(?, 0, ?)",//inserting values into todos
    [title, createdAt],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  res.json({
        id: this.lastID,
        title: title,
        completed: 0,
        createdAt: createdAt
      });
    }
  );
}); 
//put to update the todo with id
app.put("/api/todos/:id",(req,res)=>{
    const id=req.params.id;
    const completed=req.body.completed;
    db.run(
        "update todos SET completed=? where id=?",[completed,id],
        function (err){
            if(err) return res.status(500).json({error:err.message});
            res.json({message:"updated",updateid:id});
        }
    );
})
//Delete to delete the todo with id
app.delete("/api/todos/:id",(req,res)=>{
    const id=req.params.id;
    db.run("DELETE FROM todos WHERE id=?",[id],function(err){//delete from database
        if(err)
            return res.status(500).json({error:err.message});
        res.json({message:"Deleted ",deletedid:id});
    });
});
//tested the route
app.get("/",(req,res)=>{
    res.send("server is working");
});
//starting the server using port number
app.listen(5001,()=>{
    console.log("server is running on port 5001");
});
