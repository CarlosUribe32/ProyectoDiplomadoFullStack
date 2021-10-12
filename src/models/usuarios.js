
const mongoose=require("mongoose")
const Schema=mongoose.Schema

const SchemaUsuarios=new Schema({
    user:{type: String,required : true },
    password:{type: String,required : true }
})

module.exports=mongoose.model("Usuario",SchemaUsuarios)