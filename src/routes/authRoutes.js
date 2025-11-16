const express = require('express');
const { createOAuthClient } = require('../config/googleClient');
const config = require('../config/env');

const router = express.Router();

// GET /auth/google
router.get('/google', (req, res) => {
  const oauth2Client = createOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid'
    ]
  });

  res.redirect(url);
});

// GET /auth/google/callback
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Falta el código de Google');
  }

  try {
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    // Guardamos tokens en la sesión del usuario
    req.session.tokens = tokens;

    // Puedes redirigir a una URL del frontend
    const redirectUrl = `${config.frontendUrl}/auth-success`;
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error('Error en callback de Google:', err.message);
    return res.status(500).send('Error al autenticar con Google');
  }
});

module.exports = router;
