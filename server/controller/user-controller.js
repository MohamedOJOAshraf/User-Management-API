const userModel = require('../model/user-model');

const statusText = require('../utils/statusText')

const {validate_3} = require('../validation/user-validate')



const getUser = async (req,res) =>{
    try{
        const userId = req.params.id;

        const user = await userModel.findById(userId)

        if(!user)
            return res.status(404).json({msg:"This User Is Not Found",statusText:statusText.FALIED})

        return res.status(200).json({statusText:text.SUCCESS,data:user})
        
    }catch(err){
        return res.status(404).json({statusText:statusText.ERROR,err})
    }
}

const getAllUser = async (req,res) =>{
    try{
        const query = req.query;
        const limit = query.limit;
        const page = query.page;
        const skip = (page - 1) * limit

        const user = await userModel.find({},{__v:false,password:false}).limit(limit).skip(skip);

        return res.status(200).json({statusText:statusText.SUCCESS,data:user})

    }catch(err){
        return res.status(404).json({statusText:statusText.ERROR,err})
    }
}

const deleteUser = async (req,res) =>{
    try{
        const userId = req.params.id;

        const user = await userModel.findById(userId)

        if(!user) 
            return res.status(404).json({msg:'This User Is Not Found',statusText:statusText.FALIED})
        else
            await userModel.findByIdAndDelete(userId)

        return res.status(200).json({msg:'Deleted Successfuly',statusText:statusText.SUCCESS})
    }catch(err){
        return res.status(404).json({statusText:statusText.ERROR,err})
    }
}

const putUser = async (req,res) =>{
    try{
        // validation data before update
        await validate_3.validate(req.body)

        const userId = req.params.id;

        const user = await userModel.findById(userId);

        // check if user is not found
        if(!user)
            return res.status(404).json({msg:'This User Is Not Found',statusText:statusText.FALIED})

        await userModel.replaceOne(user,req.body)

        return res.status(200).json({statusText:statusText.SUCCESS,data:user})
    }catch(err){
        return res.status(404).json({statusText:statusText.ERROR,err})
    }
}

const patchUser = async (req,res) => {
        try{
        // validation data before update
        await validate_3.validate(req.body)

        const userId = req.params.id;

        const user = await userModel.findById(userId);

        // check if user is not found
        if(!user)
            return res.status(404).json({msg:'This User Is Not Found',statusText:statusText.FALIED})

        await userModel.findByIdAndUpdate(user,req.body)

        return res.status(200).json({statusText:statusText.SUCCESS,data:user})
    }catch(err){
        return res.status(404).json({statusText:statusText.ERROR,err})
    }

}

module.exports ={ 

    getUser,
    getAllUser,
    deleteUser,
    putUser,
    patchUser
}