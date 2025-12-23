const adminAuth = (req,res,next)=>{
    console.log('AdminAuth is done!')

    const token = "swa"
    const AdminAuthorized = token === "swa";

    if(!AdminAuthorized){
        res.status(401).send("Unauthorized Admin Access Denied")
    }
    else{
        next();
    }
}

const userAuth =(req,res,next)=>{
    console.log('UserAuth is done!')

    const token = "user"
    const UserAuthorized = token === "use"

    if(!UserAuthorized){
        res.status(401).send("Unauthorized User Access Denied")
    }
    else{
        next();
    }
}

module.exports = {adminAuth, userAuth}