
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
    console.log(user.user)

    const usuarios = await Usuario.find()
    let userFind=false;
    
    for(let u=0; u<usuarios.length; u++){
        // console.log(usuarios[u].user)
        if(usuarios[u].user===user.user && usuarios[u].password===user.password){
            userFind=true;
            break
        }
    }
    if(userFind===false)
        await user.save()
    res.redirect("/index")
})

router.get("/index", async(req, res)=>{
    const tareas= await Tarea.find()
    const usuarios = await Usuario.find()
    res.render("index",{tareas, usuarios})
})

router.post("/agregarActividad", async(req,res)=>{
    const tarea = new Tarea(req.body)
    await tarea.save()
    console.log(req.body)
    res.redirect("/index")
})

router.get("/cambiarEstado/:id",async(req,res)=>{
   const tareaBuscada= await Tarea.findById(req.params.id)
   tareaBuscada.estado=!tareaBuscada.estado
   await tareaBuscada.save()
   res.redirect("/index")

})
router.get("/eliminar/:id",async(req,res)=>{
   const id =req.params.id
   await Tarea.remove({_id:id})
   res.redirect("/index")

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
