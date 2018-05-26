import socketCode from "enums/event-code";
export class SocketManager {
  private clients = {};

  public getClient(id: number) {
    return this.clients[id];
  }

  public registerClient(id: number, socket) {
    this.clients[id] = socket;
  }

  public removeClient(id) {
    delete this.clients[id];
  }

  public sendTo(id: number, event: socketCode, data) {
    let client = this.clients[id];
    if (!client || client.disconnected) {
      console.warn("SocketManager::sendTo", id, "is disconnected or not found");
    } else {
      console.log("SocketManager::sendTo", id, event, data);
      client.emit(event, data);
    }
  }

  public sendToMany(ids: [number], event: socketCode, data) {
    for (let id of ids) {
      let client = this.clients[id];
      if (!client || client.disconnected) {
        console.warn("SocketManager::sendTo", id, "is disconnected or not found");
      } else {
        console.log("SocketManager::sendToMany", id, event, data);
        client.emit(event, data);
      }
    }
  }

  public sendToAll(event: socketCode, data) {
    for (let id of Object.keys(this.clients)) {
      let client = this.clients[id];
      if (!client || client.disconnected) {
        console.warn("SocketManager::sendTo", id, "is disconnected or not found");
      } else {
        console.log("SocketManager::sendToAll", id, event, data);
        client.emit(event, data);
      }
    }
  }
}

const socketManager = new SocketManager();
export default socketManager;
