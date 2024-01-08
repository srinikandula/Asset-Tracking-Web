import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    constructor(private socket: Socket) {
    }

    emitSocket(setName: any, data: any): void {
        this.socket.emit(setName, data);
    }

    onSocket(setName: any, data: any): void {
        return this.socket.on(setName, data);
    }
}
