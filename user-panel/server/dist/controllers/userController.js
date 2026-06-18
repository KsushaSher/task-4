"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnverifiedUsers = exports.deleteUsers = exports.unblockUsers = exports.blockUsers = exports.getUsers = void 0;
const userService_1 = require("../services/userService");
const getUsers = async (req, res, next) => {
    try {
        const users = await (0, userService_1.getUsersService)();
        res.json({
            success: true,
            users,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const blockUsers = async (req, res, next) => {
    try {
        const { ids } = req.body;
        await (0, userService_1.blockUsersService)(ids);
        res.json({
            success: true,
            message: 'Users blocked',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.blockUsers = blockUsers;
const unblockUsers = async (req, res, next) => {
    try {
        const { ids } = req.body;
        await (0, userService_1.unblockUsersService)(ids);
        res.json({
            success: true,
            message: 'Users unblocked',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.unblockUsers = unblockUsers;
const deleteUsers = async (req, res, next) => {
    try {
        const { ids } = req.body;
        await (0, userService_1.deleteUsersService)(ids);
        res.json({
            success: true,
            message: 'Users deleted',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUsers = deleteUsers;
const deleteUnverifiedUsers = async (req, res, next) => {
    try {
        await (0, userService_1.deleteUnverifiedUsersService)();
        res.json({
            success: true,
            message: 'Unverified users deleted',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUnverifiedUsers = deleteUnverifiedUsers;
