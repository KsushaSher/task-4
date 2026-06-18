"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = {
            id: decoded.userId,
            email: decoded.email,
        };
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};
exports.authMiddleware = authMiddleware;
