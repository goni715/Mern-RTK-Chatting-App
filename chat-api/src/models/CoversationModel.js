const  mongoose=require('mongoose');

const ConversationsSchema=mongoose.Schema(
    {
        members: [
           { type: mongoose.Schema.Types.ObjectId}
        ],
        text: {
            type: String,
        },

   },
    { timestamps: true, versionKey:false},
);

const ConversationModel=mongoose.model('conversations',ConversationsSchema);
module.exports=ConversationModel

