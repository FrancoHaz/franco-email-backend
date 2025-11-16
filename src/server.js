const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('./config/env');

const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

// CORS para permitir llamadas desde tu frontend
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true
  })
);

app.use(express.json());

// Sesiones para guardar tokens de Google
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false // pon true si usas HTTPS con proxy bien configurado
    }
  })
);

// Rutas
app.use('/auth', authRoutes);
app.use('/api/emails', emailRoutes);

app.get('/', (req, res) => {
  res.send('Franco Email Backend OK');
});

app.listen(config.port, () => {
  console.log(`Servidor escuchando en puerto ${config.port}`);
});
