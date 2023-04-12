"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
class SocketManager {
    constructor() { }
    static getInstance() {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }
    setIo(io) {
        this.io = io;
    }
}
exports.SocketManager = SocketManager;
//# sourceMappingURL=socket.js.map