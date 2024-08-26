import React from 'react';
import styles from './UserAccount.module.scss';
import { Avatar, Skeleton, SkeletonCircle} from '@chakra-ui/react';
import LinkBlock from '../../ui/link-block/LinkBlock';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import UserSocialLinks from '@components/ui/users-social-links/userSocialLinks';

const UserAccount: React.FC = () => {

    const auth = getAuth()

    const [user, loading, error] = useAuthState(auth)
    
    if (error) {
        return <div>Error:{String(error)}</div>
    }

    return (
        <div className={styles.profile}>
          {loading ? <SkeletonCircle width={'6rem'} height={'6rem'}/> : <Avatar size="xl" src={user?.photoURL || undefined} />}
          <div className={styles.info}>
              {loading ? <Skeleton mt={'0.5rem'} mb={'0.5rem'} width={'7rem'} height={'2rem'} /> : <h2>{user?.displayName}</h2> }
          </div>
          <UserSocialLinks/>
          <LinkBlock/>
        </div>
    );
}

export default UserAccount;
