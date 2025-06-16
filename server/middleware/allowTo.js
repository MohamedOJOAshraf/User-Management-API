const allowTo = (...role) => {
return (req,res,next) => {
    if(!role.includes(req.currentUser.role)){
        return res.status(403).json("Not Authorized")
    }
    next()
}
}

module.exports = allowTo