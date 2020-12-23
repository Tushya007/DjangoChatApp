import React from 'react';
import Sidepannel from './Sidepannel/Sidepannel';
import WebSocketInstance from '../websocket';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = [];
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallBacks(this.setMessage.bind(this), this.addMessage.bind(this));
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(function () {
            if (WebSocketInstance.state === 1) {
                console.log('Connection is secure');
                if (callback != null) {
                    callback();
                }
                return;
            } else {
                console.log('Waiting for connection');
                component.waitForSocketConnection(callback);
            }
        }, 100);
    }

    render() {
        return (
            <div id='frame'>
                <Sidepannel />
                <div className='content'>
                    <div className='contact-profile'>
                        <img src='http://emilcarlsson.se/assets/harveyspecter.png' alt='' />
                        <p>Username</p>
                        <div className='social-media'>
                            <i className='fa fa-facebook' aria-hidden='true'></i>
                            <i className='fa fa-twitter' aria-hidden='true'></i>
                            <i className='fa fa-instagram' aria-hidden='true'></i>
                        </div>
                    </div>
                    <div className='messages'>
                        <ul id='chat-log'>
                            {/* {% comment %} <li className="sent">
                        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                        <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                    </li>
                    <li className="replies">
                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                        <p>When you're backed against the wall, break the god damn thing down.</p>
                    </li> {% endcomment %} */}
                        </ul>
                    </div>
                    <div className='message-input'>
                        <div className='wrap'>
                            <input
                                id='chat-message-input'
                                type='text'
                                placeholder='Write your message...'
                            />
                            <i className='fa fa-paperclip attachment' aria-hidden='true'></i>
                            <button id='chat-message-submit' className='submit'>
                                <i className='fa fa-paper-plane' aria-hidden='true'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
