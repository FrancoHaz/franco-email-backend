function ensureAuth(req, res, next) {
  if (!req.session || !req.session.tokens) {
    return res.status(401).json({ error: 'No autenticado con Google' });
  }
  next();
}

module.exports = ensureAuth;
