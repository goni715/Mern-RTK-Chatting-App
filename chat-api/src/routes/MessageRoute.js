const express =require('express');
const MessageController = require("../controllers/MessageController");


const router = express.Router();





router.post('/add-new-message',MessageController.AddNewMessage);
router.get('/get-messages/:conversationId',MessageController.GetMessages);






module.exports=router;

