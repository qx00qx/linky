import React from 'react';
import styles from './Profile.module.scss';
import { Avatar, Spinner } from '@chakra-ui/react';
import LinkBlock from '../../link-block/LinkBlock';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
// import { useSelector } from 'react-redux';
// import { RootState } from '@redux/store';

const UserProfile: React.FC = () => {

    const auth = getAuth()

    const [user, loading, error] = useAuthState(auth)
    

    if (loading) {
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
        return <div>Error:{String(error)}</div>
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
