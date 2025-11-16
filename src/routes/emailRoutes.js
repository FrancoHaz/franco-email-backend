const express = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const { listInboxMessages } = require('../services/gmailService');

const router = express.Router();

// GET /api/emails
router.get('/', ensureAuth, async (req, res) => {
  try {
    const tokens = req.session.tokens;
    const emails = await listInboxMessages(tokens, 15);
    res.json({ emails });
  } catch (err) {
    console.error('Error obteniendo correos:', err.message);
    res.status(500).json({ error: 'No se pudieron obtener los correos' });
  }
});

module.exports = router;
