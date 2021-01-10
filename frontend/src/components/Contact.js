import React from 'react'
import {NavLink} from 'react-router-dom'

const Contact = (props) => (
    <NavLink to={`${props.chatUrl}`} style={{color:'#fff'}}>
        <li className="contact active">
            <div className="wrap">
            <span className={`contact-status ${props.status}`}></span>
            <img src={props.picUrl} alt="" />
            <div className="meta">
                <p className="name">{props.name}</p>
                {/* <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and htmlForty six other things.</p> */}
            </div>
            </div>
        </li>
    </NavLink>
)

export default Contact
