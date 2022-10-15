"use strict";

// **service table to get and post and update and delete services**

const express = require("express");
const routerCart = express.Router();
const { cart } = require("../models/index");
const bearer = require("../middleware/bearer");


routerCart.get("/cart", bearer, handleGetAll);
routerCart.post("/cart", bearer, handleCreate);
routerCart.put("/cart/:id", bearer, handleUpdate);
routerCart.delete("/cart/:id", bearer, handleDelete);


 // Get All Records
 async function handleGetAll(req, res) {
    const tokenId = req.user.id;
      let allRecords = await cart.findAll({where:{addToCart:true,userID:tokenId}});
      res.status(200).json(allRecords);
  };
  
  
   // Create records
  async function handleCreate(req, res) {
    const obj = req.body;
    const tokenId = req.user.id;
    if(tokenId === parseInt(req.body.userID) ){
    
        let newRecord = await cart.findOne({where:{userID:tokenId,itemID:obj.itemID}});
        if(!newRecord){
          let newRecord = await cart.create(obj);
          const increaseCounter = await newRecord.increment("amount");
          res.status(201).json(newRecord);
        }else{
          const increaseCounter = await newRecord.increment("amount");
          res.status(200).send('increased');

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
      const found = await  cart.findOne({where:{id:ID}}) 
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
    const foundUser = await cart.findOne({where:{id:ID}})
  
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

module.exports = routerCart;