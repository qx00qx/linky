import React from 'react';
import styles from './Home.module.scss';

import {motion} from 'framer-motion';
import useScreenSizes from '../../../hooks/useScreenSizes';
import clsx from 'clsx';

const Home: React.FC = () => {
    const { isTablet, isMobile } = useScreenSizes();

    const imgVariants = {
        'initial': { y: 0, x: 0 },
        'animate': {
            y: [0, -10, 0],
            x: [0, 10, 0],
            transition: {
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }
    }

    const img2Variants = {
        'initial': { y: 0, x: 0 },
        'animate': {
            y: [0, -20, 0],
            x: [0, -5, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }
    }
    
    return (
        <section className={styles.hero}>
            <h1 className={clsx({
                [styles.title]: true,
                [styles.title_mobile]: isMobile,
                [styles.title_tablet]: isTablet,
            })}>Welcome to Linky!</h1>
            <motion.img
                src='/decor/inflatable-vol2-11.png'
                className={clsx({
                    [styles.hero_img1]: true,
                    [styles.hero_img1_mobile]: isMobile,
                    [styles.hero_img1_tablet]: isTablet
                })}
                initial={'initial'}
                animate={'animate'}
                variants={imgVariants}
                />
            <motion.img src="/decor/star.png"
                className={clsx({
                    [styles.hero_img2]: true,
                    [styles.hero_img2_mobile]: isMobile,
                    [styles.hero_img2_tablet]: isTablet
                    })}
                initial={'initial'}
                animate={'animate'}
                variants={img2Variants}
            />
        </section>
    );
}

export default Home;
