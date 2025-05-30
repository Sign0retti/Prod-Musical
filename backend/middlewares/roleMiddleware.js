module.exports = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.tipo)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
};

module.exports = function role(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.tipo))
      return res.status(403).json({ error: 'Acesso negado' });
    next();
  };
};
