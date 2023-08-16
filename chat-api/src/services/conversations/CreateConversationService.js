const mongoose = require("mongoose");

const CreateConversationService = async (req, res, ConversationModel, MessageModel) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try {
        // Begin Transaction
        await session.startTransaction();

        const firstId = req.body['firstId'];
        const secondId = req.body['secondId'];
        const text = req.body['text'];
        const ObjectId = mongoose.Types.ObjectId;
        const conversationBody = {
            members: [firstId, secondId],
            text: text
        };


        //First-Database-Process//get-data
        const conversationCount = await ConversationModel.aggregate([
            {$match: {members: {$all: [new ObjectId(firstId), new ObjectId(secondId)]}}}
        ], {session});


        if (conversationCount.length === 0) {
            //Second-Database-Process//create-data
            const conversation = await ConversationModel.create([conversationBody], {session});

            const messageBody = {
                conversationId: conversation[0]?._id,
                senderId: firstId,
                text: text
            }

            //Third-Database-Process//create-data
            const message = await MessageModel.create([messageBody], {session});

            //Fourth-Database-Process//get-data
            const newConversation = await ConversationModel.aggregate([
                {$match: {_id: new ObjectId(conversation[0]?._id)}},
                {$lookup: {from: "users", localField:"members", foreignField: "_id", as: "Members" }}
            ], {session});

            res.status(200).json({status: "success", data:newConversation[0]});
        }
        else {
            res.status(409).json({status: "fail", data: "already conversation created"});
       }

        // Transaction Success
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        res.status(500).json({status: "fail", data: error.toString()});
    }

}

module.exports = CreateConversationService;