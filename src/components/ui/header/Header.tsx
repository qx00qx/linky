import React from 'react';
import styles from './Header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { RiAccountCircleFill } from "react-icons/ri";
import Logo from '../logo/Logo';
import ThemeSwitcher from '../../theme-mode-switcher/ThemeSwitcher';
import clsx from 'clsx';
import useAuth from '@hooks/useAuth';
import { logoutUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';

const Header: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { isAuth } = useAuth()

    const handleLogout = () => {
        if (location.pathname === '/profile') {
            navigate('/')
        }
        dispatch(logoutUser())
        localStorage.removeItem('user')
    }

    return (
        <header className={clsx({
            [styles.header]: true,
        })}>
            <Link to={'/'}>
               <Logo/>
            </Link>
            <div className={styles.left_side}>
                { isAuth ? (<div>
                    <ButtonGroup>
                        <Button bg={'white'}
                                px={'26px'}
                                py={'16px'}
                                variant={'outline'} 
                                onClick={() => handleLogout()}> 
                            Logout
                        </Button>
                        <Button as={Link} to='/profile' bg={'white'}>
                            <RiAccountCircleFill size={30} />
                        </Button>
                    </ButtonGroup>
                </div>) : (
                <div className={styles.auth}>
                    <Button as={Link} to="/login" bg={'white'} px={'26px'} py={'16px'} variant={'outline'}>Login</Button>
                    <Button as={Link} to="/signup" bg={'white'} px={'26px'} py={'16px'} variant={'outline'}>Sign Up</Button>
                </div>)}
                <ThemeSwitcher/>
            </div>
        </header>
    );
}

export default Header;
