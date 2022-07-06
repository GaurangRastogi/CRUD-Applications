//this will control our crud operation

var Userdb=require('../model/model');

/** 
*@Important
* May be save, findByIdandupdate() methods use async await in their function and return a promise
* Hence no need to write async await over there
*/

//Create and Save New User
exports.create=(req,res)=>{
    //Validate the Request
    if(!req.body){
        res.status(400).send({message:"Content can't be empty"});
        return;
    }   

    //new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    });

    //Save User in the database
    user            //user is the object created above
        .save(user)
        .then(data=>{
            //res.send(data);
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Some error occured while creating a create operation"
            });
        });
}

//Retrieve and Return all User or a single user(read)
exports.find=(req,res)=>{
    if(req.query.id){
        //if req.query.id!=null means find that id only 
        //Here we are not using url params, we are using query-parameters
        /**
         * @Important 
         * route look like
         * when query parameter passed
         * @url-> http://localhost:3000/api/users?id=62c4073c9e4c18ec25e3821d
         */
        const id=req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if(!data)
                    res.status(404).send({message:`Not found user with id: ${id}`});
                else
                    res.send(data);
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id: "+ id});
            })
    }
    else{
        //Get all data from dB and return 
        Userdb.find()           //Return all the records of a database
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||'Error occured while retrieving information'});
        });
    }


 
};


//Update a new Identified User By User_id
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data can't be empty"});
    }

    const id=req.params.id;     //URL parameter since we send url through put request
                                //we must have also send id, and now we're getting that id 
    Userdb.findByIdAndUpdate(id,req.body,{useFindaAndModify:false})
    .then(data=>{
        if(!data){
            res.status(400).send({message:`Cannot Update User with ${id}. Maybe user not found`});
        }
        else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error updata user information"});
    })
}

//Delete a user with specified user id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)        //since findByIdAndDelete will return promise thus we use .then()
    .then(data=>{
        if(!data){
            res.status(404).message({message:`Cannot delete with id ${id}, may be id is wrong`});
        }
        else{
            res.send({
                message:"User Deleted Successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete User with id= " +id 
        });
    });
}