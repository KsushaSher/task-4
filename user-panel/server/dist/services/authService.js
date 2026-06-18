"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.verifyEmail = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/userRepository");
const emailService_1 = require("./emailService");
const getUniqIdValue_1 = require("../utils/getUniqIdValue");
const userRepository_2 = require("../repositories/userRepository");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const registerUser = async ({ name, email, password, }) => {
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const userId = (0, getUniqIdValue_1.getUniqIdValue)();
    const verificationToken = (0, getUniqIdValue_1.getUniqIdValue)();
    await (0, userRepository_1.createUser)({
        id: userId,
        name,
        email,
        passwordHash,
        verificationToken,
        status: 'unverified',
        isBlocked: false,
        createdAt: new Date(),
    });
    (0, emailService_1.sendVerificationEmail)(email, verificationToken).catch(console.error);
    return {
        message: 'Registration successful. Verification email sent.',
    };
};
exports.registerUser = registerUser;
const verifyEmail = async (token) => {
    const user = await (0, userRepository_2.findByVerificationToken)(token);
    if (!user) {
        return {
            message: 'Token already used or invalid',
        };
    }
    if (user.status === 'unverified') {
        await (0, userRepository_2.verifyUserEmail)(user.id);
    }
    return {
        message: 'Email verified successfully',
    };
};
exports.verifyEmail = verifyEmail;
const loginService = async ({ email, password }) => {
    const user = await (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isValid = await (0, password_1.comparePassword)(password, user.password_hash);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }
    if (user.is_blocked) {
        throw new Error('User is blocked');
    }
    await (0, userRepository_1.updateLastLogin)(user.id);
    const token = (0, jwt_1.generateToken)({
        id: user.id,
        email: user.email,
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
        },
    };
};
exports.loginService = loginService;
