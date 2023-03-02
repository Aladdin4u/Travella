const jwt = require("jsonwebtoken");
const createError = require("../utilis/error")

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token,process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    })
}

export const verifyUser = () => {
    verifyToken(req,res,next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if(err) return next(createError(403, "You are not authorized!"));
        }
    })
}

export const verifyAdmin = () => {
    verifyToken(req,res,next, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            if(err) return next(createError(403, "You are not authorized!"));
        }
    })
}