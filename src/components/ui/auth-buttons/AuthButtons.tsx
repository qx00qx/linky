import React from 'react';
import styles from './AuthButtons.module.scss'
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AuthButtons: React.FC = () => {
    return (
        <div className={styles.auth}>
              <Button color={"gray.800"} as={Link} to="/login" bg={"white"} px={"26px"} py={"16px"} variant={"outline"}>
                Login
              </Button>
              <Button color={"gray.800"} as={Link} to="/signup" bg={"white"} px={"26px"} py={"16px"} variant={"outline"}>
                Sign Up
              </Button>
        </div>
    );
}

export default AuthButtons;
