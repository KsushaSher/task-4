"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnverifiedUsersService = exports.deleteUsersService = exports.unblockUsersService = exports.blockUsersService = exports.getUsersService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const userRepository = __importStar(require("../repositories/userRepository"));
const getUsersService = async () => {
    const users = await (0, userRepository_1.getAllUsers)();
    return users;
};
exports.getUsersService = getUsersService;
const blockUsersService = async (ids) => {
    await userRepository.blockUsers(ids);
};
exports.blockUsersService = blockUsersService;
const unblockUsersService = async (ids) => {
    await userRepository.unblockUsers(ids);
};
exports.unblockUsersService = unblockUsersService;
const deleteUsersService = async (ids) => {
    await userRepository.deleteUsers(ids);
};
exports.deleteUsersService = deleteUsersService;
const deleteUnverifiedUsersService = async () => {
    await userRepository.deleteUnverifiedUsers();
};
exports.deleteUnverifiedUsersService = deleteUnverifiedUsersService;
