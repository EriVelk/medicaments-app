const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) =>{
            if(err){
                res.status(403).json("El token no es valido.")
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("No estas autenticado!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isadmin){
            next();
        }else{
            res.status(403).json("No tienes permisos tan altos.");
        }
    });
};

const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.isadmin){
            next();
        }else{
            res.status(403).json({message:"No eres Admin."});
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};