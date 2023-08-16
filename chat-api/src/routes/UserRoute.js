const express =require('express');
const UsersController = require("../controllers/UsersController");


const router = express.Router();



//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});


router.get("/get-all-users", UsersController.GetAllUser);







module.exports=router;

