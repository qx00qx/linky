import React, { useState } from 'react';
import styles from './Header.module.scss';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import clsx from 'clsx';
import useAuth from '@hooks/useAuth';
import { logoutUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import useScreenSizes from '@hooks/useScreenSizes';
import BurgerMenuIcon from '../burger-menu-icon/BurgerMenuIcon';
import AuthButtons from '../auth-buttons/AuthButtons';
import Navigation from '../navigation/Navigation';

const Header: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const auth = getAuth()
    const { isAuth } = useAuth()

    const { isMobile} = useScreenSizes();
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        if (location.pathname === '/account') {
            navigate('/')
        }
        dispatch(logoutUser())
        localStorage.removeItem('userData')
        signOut(auth)
    }

    return (
        <header className={clsx({
            [styles.header]: true,
        })}>
            <Link style={{zIndex: 12}} to={'/'}>
               <Logo/>
            </Link>
            <div className={styles.left_side}>
                { isAuth ? <Navigation setIsOpen={setIsOpen} isOpen={isOpen} handleLogout={handleLogout}/> : <AuthButtons/>}
                {isAuth && isMobile &&
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <BurgerMenuIcon isOpen={isOpen}/>
                    </button>}
            </div>
        </header>
    );
}

export default Header;
