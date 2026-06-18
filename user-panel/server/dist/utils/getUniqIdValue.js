"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqIdValue = void 0;
const uuid_1 = require("uuid");
const getUniqIdValue = () => {
    return (0, uuid_1.v4)();
};
exports.getUniqIdValue = getUniqIdValue;
