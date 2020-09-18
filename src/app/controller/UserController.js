const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require(`jsonwebtoken`)

const authConfig = require('../../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

class UserController {
    async register(req, res) {
        const { email } = req.body
        try {
            if (await User.findOne({ email })) {
                return res.status(409).send({ error: 'E-mail já existente' })
            }

            const user = await User.create(req.body)

            user.senha = undefined

            return res.status(201).send({
                user,
                token: generateToken({ id: user.id })
            })
        } catch (error) {
            res.status(400).send({ error: 'Falha ao se Registrar' })
        }
    }

    async authenticate(req, res) {
        try {
            const { email, senha } = req.body

            const user = await User.findOne({ email }).select('+senha')

            if (!user) {
                return res.status(400).send({ error: 'Usuário e/ou senha inválidos' })
            }

            if (!await bcrypt.compare(senha, user.senha)) {
                return res.status(400).send({ error: 'Senha inválida' })
            }

            user.senha = undefined

            res.send({
                user,
                token: generateToken({ id: user.id }),
            })

        } catch (error) {
            res.status(400).send('Falha na operação')
        }
    }
}

module.exports = new UserController()