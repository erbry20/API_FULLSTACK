"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumar = sumar;
var express_1 = __importDefault(require("express"));
var Server = (0, express_1.default)();
Server.get('/', function (req, res) {
    var data = [
        { id: 1, name: 'John Doe', apellido: 'Doe', edad: 30 },
        { id: 2, name: 'Jane Smith', apellido: 'Smith', edad: 25 },
        { id: 3, name: 'Alice Johnson', apellido: 'Johnson', edad: 28 },
        { id: 4, name: 'Bob Brown', apellido: 'Brown', edad: 35 }
    ];
    res.json(data);
});
Server.get("/", function (req, res) {
    res.send("Hello World desde get");
});
Server.post("/", function (req, res) {
    res.send("Hello World desde post");
});
Server.put("/", function (req, res) {
    res.send("Hello World desde put");
});
Server.patch("/", function (req, res) {
    res.send("Hello World desde pacht");
});
function sumar(a, b) {
    return a + b;
}
exports.default = Server;
