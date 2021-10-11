
const mongoose=require("mongoose")
const Schema=mongoose.Schema

const SchemaTareas=new Schema({
    Titulo:{type: String,required : true },
    descripcion:String,
    user:{type: String,required : true },
    estado:{type:Boolean,default:false}
})

module.exports=mongoose.model("Tarea",SchemaTareas)