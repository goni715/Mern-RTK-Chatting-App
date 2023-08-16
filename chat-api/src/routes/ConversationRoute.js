const express =require('express');
const ConversationController = require("../controllers/ConversationController");
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware')


const router = express.Router();






router.post('/create-conversation',ConversationController.CreateConversation);
//Check conversation between two
router.post('/check-conversation',ConversationController.CheckConversation);
router.post('/create-conversation-with-message',ConversationController.CreateConversationWithMessage);
//getAllSender&Receiver//getChats//
router.get('/get-conversations/:id', AuthVerifyMiddleware, ConversationController.GetConversations);





module.exports=router;

