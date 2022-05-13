// --- IMPORTS --- //
import { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useClickOutside from '../../hooks/useClickOutside';
import { logout, selectEmail, selectLoggedIn, selectUserId, selectUsername } from "../../features/slices/auth";

import './UserMenu.css';

// --- DECLARATIONS --- //
const UserMenu = () => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const username = useSelector(selectUsername);
    const loggedIn = useSelector(selectLoggedIn);
    const email = useSelector(selectEmail);
    const userIco = '';

    const popup = useRef();
    const [open, setOpen] = useState(false);


    const handeOnLogout = () => {
        dispatch(logout());
    };

    useClickOutside(popup, () => setOpen(false))

    return (
        <>
            {loggedIn && (
                <div className="user-menu">
                    <figure className="user-icon" onClick={() => setOpen(prev => !prev)} >
                        <FaUserCircle />
                        <div
                            className={`user-status-ind ${loggedIn ? 'green-bg' : ''}`} />
                    </figure>
                    {open && (
                        <div ref={popup} className="user-menu-dropdown">
                            <h2 className="username">{username}</h2>
                            <div className="user-menu-hd" >
                                {userIco && (
                                    <img ></img>
                                )}
                                {!userIco && (
                                    <FaUserCircle className="user-menu-ico" />
                                )}
                            </div>
                            <p className="email">{email}</p>
                            <menu className="user-menu-list">
                                <li><hr /></li>
                                <li>
                                    <Link to={`/profile/${userId}`} >Profile</Link>
                                </li>
                                <li>
                                    <Link to={`/profile/posts/${userId}`} >Posts</Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={handeOnLogout} reloadDocument={true}>
                                        Logout
                                    </Link>
                                </li>
                            </menu>
                        </div>
                    )}
                </div>
            )
            }
        </>
    )
}

export default UserMenu