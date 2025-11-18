import jwt from 'jsonwebtoken'

import config from '../../config.js'
import User from '../model/userModel.js'




export  function setToken(user){
    try {
        
        let token=jwt.sign({
            _id:user._id,
            email:user.email,
            isVerified:user.isVerified
            
        },config.jwtSecret)
        return token
    } catch (error) {
        console.log("Token Set Error ",error)
    }
}

export  async function  getToken(token){
    if(!token)return null
    try {
        const decoded=jwt.decode(token,config.jwtSecret)

        const user =await User.findById(decoded._id)
        return user.id

    } catch (error) {
         console.log("Token Get Error ",error)
    }
}