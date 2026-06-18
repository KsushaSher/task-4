"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.verifyEmailController = exports.register = void 0;
const authService_1 = require("../services/authService");
const pg_1 = require("pg");
const authService_2 = require("../services/authService");
const authService_3 = require("../services/authService");
const register = async (req, res) => {
    try {
        const result = await (0, authService_1.registerUser)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('REGISTER ERROR:', error);
        if (error instanceof pg_1.DatabaseError && error.code === '23505') {
            return res.status(409).json({
                message: 'Email already exists',
            });
        }
        return res.status(500).json({
            message: 'Server error',
        });
    }
};
exports.register = register;
const verifyEmailController = async (req, res, next) => {
    try {
        const token = String(req.params.token);
        const result = await (0, authService_2.verifyEmail)(token);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmailController = verifyEmailController;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authService_3.loginService)({ email, password });
        res.json({
            success: true,
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
