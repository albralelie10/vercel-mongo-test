import { Request, Response } from "express";
import {User,UserConfig,Post,Category} from "../models/model"


export const getAllUsers=async(req:Request,res:Response)=>{
  try{
    console.log("hello")
    const users=await User.find() 
    return res.json(users)
  }catch(err){  
    return res.status(500).json(err)
  }
}
export const addUser=async(req:Request,res:Response)=>{
    try{
    // 1. Define las configuraciones del usuario
    const userConfigData = {
        emailUpdates: true, // Ejemplo: Cambia aquí las configuraciones
        theme: "DARK", // Ejemplo: Cambia aquí las configuraciones
      };
  
      // 2. Crea una instancia de UserConfig utilizando las configuraciones
      const userConfig = await UserConfig.create(userConfigData);
  
      // 3. Crea una instancia de User y asigna la instancia de UserConfig
      const newUser = await User.create({
        nombre: "Ejemplo", // Ejemplo: Cambia aquí los datos del usuario
        email: "ejemplo@example.com", // Ejemplo: Cambia aquí los datos del usuario
        age: 25, // Ejemplo: Cambia aquí los datos del usuario
        password: "contrasena", // Ejemplo: Cambia aquí los datos del usuario
        role: "REGISTER_USER", // Ejemplo: Cambia aquí los datos del usuario
        user_configId: userConfig._id, // Asigna el ID de la instancia de UserConfig
      });
  
      // 4. Guarda el usuario y su configuración en la base de datos
      await newUser.save();
  
      // Devuelve una respuesta exitosa
      return res.status(201).json(newUser);

    }catch(err){
        return res.status(500).json(err)
    }
}
export const addPost = async (req: Request, res: Response) => {
  try {
    // 1. Obtén el ID del usuario de ejemplo o de cualquier otro usuario existente
    const userId = "64fec5b3e976dd86bcf99f35"; // Cambia aquí con el ID del usuario deseado
  
    // 2. Crea instancias de Category con los nombres de las categorías
    const category1 = await Category.create({ category_name: "Categoría 1" })
    const category2 = await Category.create({ category_name: "Categoría 2" })


    // 3. Crea una instancia de Post con los datos del nuevo post y el ID del usuario
    const newPost = await Post.create({
      title: "Nuevo Título", // Ejemplo: Cambia aquí los datos del post
      content: "Contenido del nuevo post", // Ejemplo: Cambia aquí los datos del post
      user_authorId: userId, // Asigna el ID del usuario como autor del post
      post_category: [category1._id, category2._id], // Agrega las categorías al post
    });
    
    // 4. Guarda las categorías y el nuevo post en la base de datos

    await Promise.all([category1.save(), category2.save()]);

    // Agrega el nuevo post al campo "post" del usuario

    const user=await User.findById(userId)
    if(user){
      user.post.push(newPost._id)
      await user.save();
    }

    // Devuelve una respuesta exitosa
    return res.status(201).json(newPost);
  } catch (err) {
    // Manejo de errores
    console.error(err);
    return res.status(500).json({ msg: "Server Error", err });
  }
};





