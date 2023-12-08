import { socket } from './socket-api';

export class SocketService {
  static emit(event, obj) {
    return socket.emit(event, obj);
  }

  static on(event, callback) {
    return socket.on(event, callback);
  }

  static disconnect() {
    return socket.disconnect;
  }
}
