import { useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import React from 'react';
import styles from './CustomLinks.module.scss'
import LinkBlock from '../link-block/LinkBlock';

const CustomLinks: React.FC = () => {
    const user = useAppSelector(state => state.user)
    
    return (
        <ul className={styles.list}>
            {user.customLinks?.map((link) => <li key={link.title}>
                <LinkBlock title={link.title} url={link.url}/>
            </li>)}
        </ul>
    );
}

export default CustomLinks;
