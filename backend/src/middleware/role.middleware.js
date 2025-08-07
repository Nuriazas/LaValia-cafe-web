const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
  }
  next();
};

const isClient = (req, res, next) => {
  if (req.user?.role !== 'cliente') {
    return res.status(403).json({ message: 'Acceso denegado. Solo clientes.' });
  }
  next();
};

module.exports = { isAdmin, isClient };