const  mongoose=require('mongoose');

const TodoSchema= new mongoose.Schema(
    {
       name:{
           type: String
       }
    },
    { timestamps: true, versionKey:false}
);

const TodoModel=mongoose.model('todo',TodoSchema);
module.exports=TodoModel

