import { Button, ButtonGroup } from '@chakra-ui/react';
import { useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import useScreenSizes from '@hooks/useScreenSizes';
import clsx from 'clsx';
import styles from './Navigation.module.scss'
import React from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface NavigationProps { 
    setIsOpen: (isOpen: boolean) => void,
    isOpen: boolean
    handleLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({setIsOpen, isOpen, handleLogout}) => {
    const { id } = useAppSelector((state) => state.user);
    const { isMobile } = useScreenSizes();
  
    return (
      <nav
        className={clsx({
          [styles.navigation]: true,
          [styles.navigation_mobile]: isMobile,
          [styles.navigation_mobile_active]: isOpen,
           })}>
        <ButtonGroup className={styles.button_group} spacing={"5px"}>
          <Button as={Link} to={`/account/${id}`} bg={"white"} onClick={() => setIsOpen(!isOpen)}>
            {isMobile ? <span>Account</span> : <RiAccountCircleFill size={30} />}
          </Button>
          <Button as={Link} to="/account/settings" bg={"white"} px={"26px"} py={"16px"} onClick={() => setIsOpen(!isOpen)} variant={isMobile ? "" : "outline"}>
            Settings
          </Button>
          <Button bg={"white"} px={"26px"} py={"16px"} variant={isMobile ? "" : "outline"} onClick={() => handleLogout()}>
            Logout
          </Button>
        </ButtonGroup>
      </nav>
    );
  };

export default Navigation;
