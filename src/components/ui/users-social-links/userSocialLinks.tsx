import styles from './userSocialLinks.module.scss'
import React from 'react';
import { useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import { socialListIcons } from '@utils/socialListIcons';
import { Link } from 'react-router-dom';

const UserSocialLinks: React.FC = () => {

    const { socialsLinks } = useAppSelector((state) => state.user);

    return (
        <ul className={styles.list}>
           {socialsLinks?.map((link) => 
                <Link className={styles.social} key={link.url} to={link.url}>
                    <li>
                        {socialListIcons[link.name]?.icon}
                    </li>
                </Link>
            )}
        </ul>
    );
}

export default UserSocialLinks;
