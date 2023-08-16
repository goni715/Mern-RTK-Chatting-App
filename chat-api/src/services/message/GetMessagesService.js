const mongoose = require("mongoose");

const GetMessagesService = async (req, res, MessageModel) => {
   try{
       const conversationID = req.params.conversationId;
       const ObjectId = mongoose.Types.ObjectId;

       const messages = await MessageModel.aggregate([
                           {$match:{conversationId: new ObjectId(conversationID)}}
                      ]);

       res.status(200).json({status:"success", data:messages});
   }
   catch(error){
       res.status(500).json({status:"fail", data:error.toString()});
   }
}

module.exports = GetMessagesService