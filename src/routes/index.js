
const{Router}=require("express")
const express= require("express")
const router=express.Router()
const Tarea=require("../models/tareas")
const Usuario = require("../models/usuarios")


router.get("/",async(req,res)=>{
    const tareas= await Tarea.find()
    const usuarios = await Usuario.find()

    //Obteniendo el admin
    let admin = JSON.stringify(usuarios[0])
    console.log(admin) 
    if(admin===undefined){
        const admin1 = new Usuario({user:'admin', password:'7034'})
        await admin1.save()
    }

    console.log(tareas)
    // res.render("index",{tareas})
    res.render("login")
})

router.post("/agregarUser", async(req, res)=>{
    const user = new Usuario(req.body)
    console.log(req.body)
    await user.save()
    res.redirect("/index")
})

router.get("/index", async(req, res)=>{
    const tareas= await Tarea.find()
    res.render("index",{tareas})
})

router.post("/agregarActividad", async(req,res)=>{
    const tarea = new Tarea(req.body)
    await tarea.save()
    console.log(req.body)
    res.redirect("/")
})

router.get("/cambiarEstado/:id",async(req,res)=>{
   const tareaBuscada= await Tarea.findById(req.params.id)
   tareaBuscada.estado=!tareaBuscada.estado
   await tareaBuscada.save()
   res.redirect("/")

})
router.get("/eliminar/:id",async(req,res)=>{
   const id =req.params.id
   await Tarea.remove({_id:id})
   res.redirect("/")

})

router.get("/editar/:id",async(req,res)=>{
    const {id}=req.params
    const tarea= await Tarea.findById(id)
    console.log(tarea.descripcion)
    res.render("edit",{tarea})

})

router.post("/editar/:id",async(req,res)=>{
    const {id}=req.params
    await Tarea.update({_id:id},req.body)
    res.redirect("/")

})

module.exports=router;
