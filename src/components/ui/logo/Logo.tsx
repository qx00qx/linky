import { useColorModeValue } from '@chakra-ui/react';
import styles from './Logo.module.scss'
import { motion } from 'framer-motion';
import useScreenSizes from '../../../hooks/useScreenSizes'
import clsx from 'clsx';

const Logo = () => {
    const svgVariants = {
        'hover': {
            rotate: 360,
        }
    }

    const { isMobile } = useScreenSizes()

    const themeColor = useColorModeValue('#1A202C', 'white')

    return (
            <div className={styles.logo}>
                <div className={styles.asterisk}>
                    <motion.svg
                    whileHover={'hover'}
                    transition={{ duration: 2 }}
                    variants={svgVariants}
                    fill={themeColor}
                    width="45px" height="45px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="layer1">
                        <path stroke={themeColor} d="M 9 5 L 9 9.6328125 L 4.9863281 7.3164062 L 4.4863281 8.1835938 L 8.5 10.5 L 4.4863281 12.816406 L 4.9863281 13.683594 L 9 11.367188 L 9 16 L 10 16 L 10 11.367188 L 14.013672 13.683594 L 14.513672 12.816406 L 10.5 10.5 L 14.513672 8.1835938 L 14.013672 7.3164062 L 10 9.6328125 L 10 5 L 9 5 z "/>
                        </g>
                    </motion.svg>
                </div>
                <h3 className={clsx({
                    [styles.name]: true,
                    [styles.none]: isMobile
                })}>linky</h3>
            </div>
    );
}

export default Logo;
