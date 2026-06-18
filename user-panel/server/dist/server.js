"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = 8888;
db_1.pool
    .query('SELECT NOW()')
    .then((result) => {
    console.log('Database connected');
    console.log(result.rows);
})
    .catch((error) => {
    console.error('Database error:', error);
});
app_1.default.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
