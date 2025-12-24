const adminAuth = (req,res,next)=>{
    console.log("Authoriztion Done")
    const token = "adm"
    const AuthorizedAdmin = token === "adm"

    if(!AuthorizedAdmin){
        res.send("unauthorized permission denied")
    }

    else{
        next()
    }
}

const userAuth = (req,res,next)=>{
    console.log("Authoriztion Done")
    const token = "us"
    const AuthorizedUser = token === "us"

    if(!AuthorizedUser){
        res.send("unauthorized permission denied")
    }

    else{
        next()
    }
}

module.exports = {adminAuth,userAuth}