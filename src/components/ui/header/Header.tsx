import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import Logo from '../logo/Logo';
import ThemeSwitcher from '../../theme-mode-switcher/ThemeSwitcher';
import clsx from 'clsx';
import useAuth from '@hooks/useAuth';
import { logoutUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks/useAppDispatch';

const Header: React.FC = () => {
    const { username } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const { isAuth } = useAuth()

    const handleLogout = () => {
        dispatch(logoutUser())
        localStorage.removeItem('user')
    }

    return (
        <div className={clsx({
            [styles.header]: true,
        })}>
            <Link to={'/'}>
               <Logo/>
            </Link>
            <div className={styles.left_side}>
                { isAuth ? (<div>
                    <Button bg={'white'} px={'26px'} py={'16px'} variant={'outline'} onClick={() => handleLogout()}> 
                        Logout from <b style={{ marginLeft: '5px'}}>{username}</b>
                    </Button>
                </div>) : (
                <div className={styles.auth}>
                    <Button as={Link} to="/login" bg={'white'} px={'26px'} py={'16px'} variant={'outline'}>Login</Button>
                    <Button as={Link} to="/signup" bg={'white'} px={'26px'} py={'16px'} variant={'outline'}>Sign Up</Button>
                </div>)}
                <ThemeSwitcher/>
            </div>
        </div>
    );
}

export default Header;
