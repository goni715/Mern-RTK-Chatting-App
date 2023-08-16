const MessageModel = require("../models/MessageModel");
const ConversationModel = require("../models/CoversationModel");
const AddMessageService = require("../services/message/AddMessageService");
const GetMessagesService = require("../services/message/GetMessagesService");




//AddNewMessage
exports.AddNewMessage = async (req, res)=> {
    await AddMessageService(req,res,MessageModel, ConversationModel)
}



//GetMessage
exports.GetMessages = async (req, res)=> {
    await GetMessagesService(req,res,MessageModel)
}


