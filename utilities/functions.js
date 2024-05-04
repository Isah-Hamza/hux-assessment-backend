// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// async function hashPassword(plaintextPswd) {
//   const hash = await bcrypt.hash(plaintextPswd, 10);
//   return hash;
// }

// async function comparePassword(plaintextPswd, hash) {
//   const res = await bcrypt.compare(plaintextPswd, hash);
//   return res;
// }

function generateAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email
  };
  
  const secret = 'super-secret';
  const options = { expiresIn: '1d' };

  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
  const secret = 'super-secret';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

module.exports = {
  // hashPassword,
  // comparePassword,
  generateAccessToken,
  verifyAccessToken,
  authenticateToken,
};
