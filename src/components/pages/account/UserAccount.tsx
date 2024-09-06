import React from 'react';
import styles from './UserAccount.module.scss';
import { Avatar } from '@chakra-ui/react';
import UserSocialLinks from '@components/ui/users-social-links/userSocialLinks';
import { useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import CustomLinks from '@components/ui/custom-links/CustomLinks';

const UserAccount: React.FC = () => {

    const user = useAppSelector(state => state.user)

    return (
        <div className={styles.profile}>
          <Avatar size="xl" src={user.picture || undefined} />
          <div className={styles.info}>
              <h2>{user.username}</h2>
              <p>{user.bio}</p>
          </div>
          <UserSocialLinks/>
          <CustomLinks/>
        </div>
    );
}

export default UserAccount;
