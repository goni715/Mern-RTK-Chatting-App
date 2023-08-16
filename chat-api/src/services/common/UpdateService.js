const mongoose = require("mongoose");
const UpdateService= async (req, res,DataModel) => {

    try{
        let ID = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(ID)};
        let PostBody=req.body;

        let Update = await DataModel.updateOne(UpdateQueryObject,PostBody);
        res.status(200).json({status: "success", data: Update});

    }
    catch (error) {
        res.status(500).json({status: "fail", data: error.toString()});
    }
}
module.exports=UpdateService

