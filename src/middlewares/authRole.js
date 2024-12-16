const roleCheck = (roles) => (req, res, next) => {
    const userRole = req.user.role; // Extracted from JWT token
    if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};
