import React from 'react';
import styles from './LinkBlock.module.scss';
import { Text } from '@chakra-ui/react'

const LinkBlock: React.FC = () => {
    return (
        <div className={styles.block}>
            <Text fontSize='md'>buy me a coffee!</Text>
        </div>
    );
}

export default LinkBlock;
