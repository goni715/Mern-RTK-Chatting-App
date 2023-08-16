const CreateService= async (req,res,DataModel) => {
    try{

        let PostBody = req.body;
        let data = await DataModel.create(PostBody)
        res.status(200).json({status: "success", data: data});
    }
    catch (error) {
        res.status(500).json({status: "fail", data: error.toString()});
    }
}
module.exports=CreateService