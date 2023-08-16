const  mongoose=require('mongoose');

const MessageSchema= new mongoose.Schema(
    {
       conversationId: {
           type: mongoose.Schema.Types.ObjectId,
       },
       senderId: {
          type: mongoose.Schema.Types.ObjectId,
       },
       text: {
          type: String,
       },
  },
    { timestamps: true, versionKey:false}
);

const MessageModel=mongoose.model('messages',MessageSchema);
module.exports=MessageModel

