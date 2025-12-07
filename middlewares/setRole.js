const setRole = (role) => (req, res, next) => {
    req.role = role;
    next();
};

module.exports = setRole;