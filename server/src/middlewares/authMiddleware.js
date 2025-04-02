import jwt from "../jwt.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];


    if (!token) {
        req.isAuthenticated = false;
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;
        res.locals.user = decodedToken;
        next();
    } catch (err) {
        req.isAuthenticated = false;
        next();
    }
};

export const isAuth = (req, res, next) => {

    if (!req.isAuthenticated) {
        return res.status(401).json({ message: 'Please login!' });
    }
    next();
};
