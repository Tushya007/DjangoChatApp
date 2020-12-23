import { object } from 'prop-types';

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    constructor() {
        this.socketRef = null;
    }

    connect() {
        const path = 'ws://localhost:8000/ws/chat/test/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log('Websocket open');
        };
        this.socketRef.onmessage = (e) => {
            console.log('This is sending a message');
        };
        this.socketRef.onerror = (e) => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log('Websocket closed');
            this.connect();
        };
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === 'message') {
            this.callbacks[command](parsedData.messages);
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message);
        }
    }

    newChatMessage(message) {
        this.sendMessages({ command: 'fetch_messages', username: username });
    }
    newChatMessage(message) {
        this.sendMessages({
            command: 'new_messages',
            username: username,
            from: message.from,
            message: message.content,
        });
    }
    state() {
        return this.socketRef.readyState;
    }
    addCallbacks(messagesCallback, newMessageCallback) {
        this.callback['messages'] = messagesCallback;
        this.callback['new_message'] = newMessageCallback;
    }
    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        } catch (err) {
            console.log(err.message);
        }
    }
    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(function () {
            if (socket.readyState === 1) {
                console.log('Connection is secure');
                if (callback != null) {
                    callback();
                }
                return;
            } else {
                console.log('Waiting for connection');
                recursion(callback);
            }
        }, 1);
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
