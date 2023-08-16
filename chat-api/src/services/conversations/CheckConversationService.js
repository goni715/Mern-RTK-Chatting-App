const mongoose = require("mongoose");

const CheckConversationService = async (req, res, ConversationModel) => {

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


      if(conversationCount.length > 0){
         res.status(409).json({status:"fail", data:"You have already conversation"});
      }else{
         res.status(200).json({status:"success", data:"You have no conversation"});
      }
   }
   catch(error) {
      res.status(500).json({status:"fail", data:error.toString()});
   }
}


module.exports = CheckConversationService;