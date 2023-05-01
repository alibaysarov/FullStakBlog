import jwt  from 'jsonwebtoken';

export const authMiddleWare=(req,res,next)=>{
    if(req.method=="OPTIONS"){
        return
    }
    try {
        const token=req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(404).json({
                err:"Вы не авторизованы!"
            })
        }
        const decodedToken=jwt.verify(token,'secret123');
        if (decodedToken){
            req.user=decodedToken;
            next();
            
        } else {
            return res.status(403).json({
                err:"Вы не авторизованы!"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err:"Проблема с получением данных от пользователя"
        })
    }
}
