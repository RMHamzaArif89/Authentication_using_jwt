const jwt = require('jsonwebtoken');
const userSchema=require('../model/user')
const verifyToken = async(req, res, next) =>{

try {
    const token = req.cookies.jwt;
if (!token) return res.send('invalid token');
// const verified = jwt.verify(token, );
 const verify = jwt.verify(token, 'jwt-secret-key');
//  req.userId = verify.userId;
if(!verify){
    res.send('not verify')
}
 next();
 } catch(error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;