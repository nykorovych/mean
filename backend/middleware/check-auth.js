const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "Pepeg_berry_secure");
        req.usr = { email: decodedToken.email, userId: decodedToken.userId}
        next();
    } catch (error) {
       return res.send(401).json({ message: "auth failed!" });
    }
    
};