const ConversationModel = require("../models/CoversationModel");
const MessageModel = require("../models/MessageModel");

const GetConversationsService = require("../services/conversations/GetConversationsService");
const CreateConversationService = require("../services/conversations/CreateConversationService");
const CreateConversationWithMessageService = require("../services/conversations/CreateConversationWithMessageService");
const CheckConversationService = require("../services/conversations/CheckConversationService");


//new conversation/CreateConversation/Create Chat//InsertSenderID ReceiverId
exports.CreateConversation=async (req, res) => {
    await CreateConversationService(req,res,ConversationModel, MessageModel)
}

//Check Conversation Between two
exports.CheckConversation=async (req, res) => {
    await CheckConversationService(req,res,ConversationModel);
}

exports.CreateConversationWithMessage=async (req, res) => {
    await CreateConversationWithMessageService(req,res,ConversationModel, MessageModel);
}


//getConversationList/GetChatList//একজন person এর সকল ChatList
exports.GetConversations=async (req, res) => {
    await GetConversationsService(req,res,ConversationModel)
}



