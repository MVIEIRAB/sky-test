class sessionController {
    async session(req, res) {
        res.send({ ok: 'conteúdo liberado', user: req.userId })
    }
}

module.exports = new sessionController