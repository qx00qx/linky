import React from 'react';
import styles from './BurgerMenuIcon.module.scss'
import clsx from 'clsx';

const BurgerMenuIcon: React.FC<{isOpen: boolean}> = ({isOpen}) => {
    return (
        <div className={clsx(styles.menu, {
            [styles.menu_active]: isOpen
        })}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default BurgerMenuIcon;
