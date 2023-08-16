const mongoose = require("mongoose");
const AddMessageService = async (req, res, MessageModel, ConversationModel) => {

    // Create Transaction Session
    const session = await mongoose.startSession();


    try{
        // Begin Transaction
        await session.startTransaction();

        const conversationId = req.body['conversationId'];
        const text = req.body['text'];
        const ObjectId = mongoose.Types.ObjectId;
        let messageBody = req.body;

        //First-Database-Process//create-data
        const message = await MessageModel.create([messageBody], {session});

        //Second-Database-Process//update-data
        const updateConversation = await ConversationModel.updateOne(
            {_id: new ObjectId(conversationId)},
            {text:text},
            {session}
        )

        // Transaction Success
        await session.commitTransaction();
        await session.endSession();
        res.status(200).json({status:"success", data:message});

    }catch(error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        res.status(500).json({status:"fail", data:error.toString()});
    }
}

module.exports = AddMessageService;