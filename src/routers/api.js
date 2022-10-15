'use strict';

const express = require('express');
const router = express.Router();

const dataModules = require('../models/index');
const bearer = require('../middleware/bearer');

// models
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName] ) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


// Before/:model >>>>> /api:model
router.get('/:model',bearer, handleGetAll); 
router.get('/:model/:id',bearer,  handleGetOne); 
 router.post('/:model',bearer,  handleCreate); 
router.put('/:model/:id', bearer, handleUpdate);
router.delete('/:model/:id',bearer,  handleDelete);

 // Get All Records
async function handleGetAll(req, res) {
  if( req.model !== dataModules.favList){
    let allRecords = await req.model.findAll();
    res.status(200).json(allRecords);
  }else {
    let tokenId = req.user.id
    let allRecords = await req.model.findAll({where:{addToFiv:true,userID:tokenId}});
    res.status(200).json(allRecords);
  }
};

 // Get one Records
async function handleGetOne(req, res) {
  const id = req.params.id ;
 let readOne = await req.model.findOne({where:{id:id}});
 res.status(200).json(readOne);

}

 // Create records
async function handleCreate(req, res) {
  const obj = req.body;
  const tokenId = req.user.id;
  if(tokenId === parseInt(req.body.userID) ){
    if(!(req.model === dataModules.favList)){
      let newRecord = await req.model.create(obj);
      res.status(201).json(newRecord);
    }else {
      let newRecord = await req.model.findOne({where:{userID:tokenId,itemID:obj.itemID}});
      if(!newRecord){
        let newRecord = await req.model.create(obj);
        res.status(201).json(newRecord);
      }else{
        res.status(404).send('Already added ot favorite list');
      }
    }
  }else {
    res.status(404).send("you are not allowed to post here");
  }


}




// Update records
async function handleUpdate(req, res) {
  const tokenId = req.user.id;
  const newUpdate= req.body
  let ID = req.params.id;
    const found = await  req.model.findOne({where:{id:ID}}) 
 console.log(tokenId ,found.userID )
    if (( tokenId === parseInt(found.userID )&&parseInt(found.userID )=== parseInt(newUpdate.userID ) ) ) {
       let updates = await found.update(newUpdate)
       res.status(201).json(updates)
    }else{
       res.status(404).send("You don't have access to update item")
    }

}


// Delete records
async function handleDelete(req, res) {

  const tokenId = req.user.id;
  const ID = req.params.id

try{
  const foundUser = await req.model.findOne({where:{id:ID}})

  if ((tokenId === foundUser.userID) )  {

    const deletes = await foundUser.destroy(foundUser.id)
    res.status(204).send('Deleted successfully')
  }else{
    res.status(404).send("You don't have access to delete item")
  }


  
}catch(err){
  res.status(404).send(err)
}
}




module.exports = router;