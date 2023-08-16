const hashedPassword = require("../../utility/hashedPassword");
const UserCreateService= async (req,res,DataModel) => {
    try{
        let PostBody=req.body;
        let user = await DataModel.aggregate([{$match:{email: req.body['email']}}]);
        if(user.length === 0){
            PostBody.password = await hashedPassword(PostBody.password);//hashedPassword
            let data = await DataModel.create(PostBody)
            res.status(200).json({status: "success", data:data});
        }else{
            res.status(409).json({status: "fail", data:"Email Already Exist"});
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", data:error.toString()});
    }
}
module.exports=UserCreateService