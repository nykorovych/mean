const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "Pepeg_berry_secure");
        next();
    } catch (error) {
       return res.send(401).json({ message: "auth failed!" });
    }
    
};