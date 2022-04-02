const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {


    const access_token = req.header('access_token')
    const refresh_token = req.header('refresh_token')
    if (!access_token&&!refresh_token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        //por revisar! ya que a medida que navegamos el token a comprobar debe ir cambiando por el anterior
        const a_token = req.header.access_token.split('.')[1];
        const r_token = req.header.refresh_token.split('.')[1];
       
        const decoded1 = jwt.verify(a_token, process.env.ACCESS_TOKEN)
        const decoded2 = jwt.verify(r_token, process.env.REFRESH_TOKEN)
        req.userData = decoded1;
        req.userData = decoded2;
        
        jwt.verify(access_token, process.env.ACCESS_TOKEN)
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN)

        //repone el toke y refresh token
        // const reset_access_token = access_token
        // res.header({
        //     'access_token': reset_access_token,'refresh_token': refresh_token
        //    })
        //   .json({
        //     error: null,
        //     message: 'Admin logueado',
        //     //access_token
        //    })
        

        next() // sale y continuamos
    } catch (error) {
        res.status(400).json({error: 'acceso restringido'})
    }
}

module.exports = verifyToken;