const express=require("express")
const cors=require("cors")


const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"This is Home Page"})
})

app.listen(8080,()=>{
    console.log("server is running")
})