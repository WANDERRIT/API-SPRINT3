import jwt from "jsonwebtoken";

export default function verifyToken(res,req, next){
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403)
        .json({error: "Um token é necessário para autenticação"})
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.employee = decoded;
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: "Token inválido" });
    }
return next();
}