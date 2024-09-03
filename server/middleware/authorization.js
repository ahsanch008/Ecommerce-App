const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        console.log("No token found");
        return res.redirect("/users/login");
    }
    try {
        const decodedToken = jwt.verify(token, "your_jwt_secret_key");
        req.user = { 
            id: decodedToken.id, 
            name: decodedToken.name, 
            role: decodedToken.role 
        };
        if (!req.user || !req.user.role) {
            return res.status(401).json({ msg: "Unauthorized access / role not defined" });
        }
        
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

const authorization = (...roles) => {
    return (req, res, next) => {
        const  role  = req.user.role;
        if (!role || !roles.includes(role)) {
            return res.status(403).json({ msg: "Forbidden: You do not have the required permissions" });
        }
        next();
    };
};

module.exports = {
    authenticated,
    authorization
};
