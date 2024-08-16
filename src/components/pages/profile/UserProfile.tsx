import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { Avatar, Spinner } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LinkBlock from '../../link-block/LinkBlock';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';

const UserProfile: React.FC = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const auth = getAuth();
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoading(false);
        } else {
          setError('User not found');
          setIsLoading(false);
        }
    });

    if (isLoading) {
        return <div className={styles.profile}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='gray.800'
                        size='xl'
                    />
                </div>
    }

    if (error) {
        return <div>Error:{error}</div>
    }

    return (
        <div className={styles.profile}>
          <Avatar size="xl" src={user?.photoURL ?? ''} />
          <div className={styles.info}>
              <h2>{user?.displayName}</h2>
          </div>
          <LinkBlock/>
        </div>
    );
}

export default UserProfile;
