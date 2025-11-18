import { getToken } from "../service/auth.js";

import blacklist from "../controllers/util.js";


async function requiredAuth(req,res,next){

    const authHeader = req.headers.authorization;

    if (!authHeader ) {
        return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const token = authHeader;

    if (blacklist.has(token)) {
        return res.status(401).json({ message: "Token has been blacklisted. Please log in again." });
    }

    const user = await getToken(token);
     


    if (!user) {
        return res.status(403).json({ message: "Invalid token! Please log in again." });
    }
    req.user=user;

    next()
};

export default requiredAuth