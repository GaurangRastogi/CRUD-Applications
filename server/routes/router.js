const express=require('express');
//Since don't want to create new app, we dont use const app=express()

//We'll use Router() function
const route=express.Router()
//It won't create a new app, it use the same app 


const services=require('../services/render.js');
const controller=require('../controller/controller');


//This is the root route 
route.get('/',services.homeRoutes);
/** 
* @description Root Route  
* @method Get /
*/


//This is the new user route
route.get('/add-user',services.addUser);
/** 
* @description add users 
* @method Get /add-user
*/



//Route for update user
route.get('/update-user',services.updateUser);
/** 
* @description update user 
* @method Get /update-user
*/


/** 
* @API
*/
//API - crud

//1-> create request
route.post('/api/users',controller.create);

//2-> Read request
route.get('/api/users',controller.find); 
// http://localhost:3000/api/users?id=62c4073c9e4c18ec25e3821d -> value after ? is query parameters


//3-> Update request
route.put('/api/users/:id',controller.update);      // /:id don't need to be unique

//4-> Delete request
route.delete('/api/users/:id',controller.delete);

module.exports=route;