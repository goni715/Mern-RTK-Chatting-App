const express =require('express');
const UsersController = require("../controllers/UsersController");


const router = express.Router();


router.post('/registration',UsersController.Registration);
router.post('/login',UsersController.Login);


module.exports=router;

