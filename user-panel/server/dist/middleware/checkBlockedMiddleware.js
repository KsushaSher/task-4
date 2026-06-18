"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlockedMiddleware = void 0;
const userRepository_1 = require("../repositories/userRepository");
const checkBlockedMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        const user = await (0, userRepository_1.findUserById)(req.user.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
        if (user.is_blocked) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        next();
    }
    catch {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
exports.checkBlockedMiddleware = checkBlockedMiddleware;
