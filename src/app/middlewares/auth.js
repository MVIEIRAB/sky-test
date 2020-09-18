const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        res.status(401).send({ error: 'Token não informado' })

    const parts = authHeader.split(' ')

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Erro no Token' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) throw res.status(401).send({ error: 'token invalido' })
        
        req.userId = decoded.id
        return next()
    })
}