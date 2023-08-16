const mongoose = require("mongoose");
const CreateConversationWithMessageService = async (req, res, ConversationModel, MessageModel) => {

    try{
        const firstId = req.body['firstId'];
        const secondId = req.body['secondId'];
        const text = req.body['text'];
        const ObjectId = mongoose.Types.ObjectId;
        const conversationBody = {
            members: [firstId, secondId],
            text: text
        };

        const conversationCount = await ConversationModel.aggregate([
                {$match: {members: { $all: [new ObjectId(firstId), new ObjectId(secondId)] }}}
            ]);


        if(conversationCount.length === 0){
            const conversation = await ConversationModel.create(conversationBody);
            const messageBody = {
                conversationId: conversation?._id,
                senderId: firstId,
                text: text
            }

            const message = await MessageModel.create(messageBody);
            res.status(200).json({status:"success", data:message});

        }else{
            let conversationId = conversationCount[0]._id;
            const updateConversation = await ConversationModel.updateOne(
                {_id: new ObjectId(conversationId)},
                {text:text}
            )
            const newMessageBody = {
                conversationId: conversationId,
                senderId: firstId,
                text: text
            }
            const newMessage = await MessageModel.create(newMessageBody);
            res.status(200).json({status:"success", result:newMessage, data:"already conversation created"});
        }
    }
    catch(error) {
        res.status(500).json({status:"fail", data:error.toString()});
    }
}


module.exports= CreateConversationWithMessageService;