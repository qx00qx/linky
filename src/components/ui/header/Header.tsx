import React from 'react';
import styles from './Header.module.scss';
import { getAuth, signOut } from 'firebase/auth';
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
    
    const auth = getAuth()
    const { isAuth } = useAuth()

    const handleLogout = () => {
        if (location.pathname === '/profile') {
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
            <Link to={'/'}>
               <Logo/>
            </Link>
            <div className={styles.left_side}>
                { isAuth ? (<div>
                    <ButtonGroup spacing={'5px'}>
                        <Button as={Link} to='/account' bg={'white'}>
                            <RiAccountCircleFill size={30} />
                        </Button>
                        <Button as={Link} 
                                to='/account/settings'
                                bg={'white'}
                                px={'26px'}
                                py={'16px'}
                                variant={'outline'}>
                            Settings
                        </Button>
                        <Button bg={'white'}
                                px={'26px'}
                                py={'16px'}
                                variant={'outline'} 
                                onClick={() => handleLogout()}> 
                                Logout
                        </Button>
                    </ButtonGroup>
                </div>) : (
                <div className={styles.auth}>
                    <Button color={'gray.800'} as={Link} to="/login" bg={'white'} px={'26px'} py={'16px'} variant={'outline'}>Login</Button>
                    <Button color={'gray.800'} as={Link} to="/signup" bg={'white'} px={'26px'} py={'16px'} variant={'outline'}>Sign Up</Button>
                </div>)}
                <ThemeSwitcher/>
            </div>
        </header>
    );
}

export default Header;
