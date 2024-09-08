import React from 'react';
import styles from './LinkBlock.module.scss';
import { Button, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';
import { RiCloseFill } from "react-icons/ri";
import { customLink } from '../../../types/customLink';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import { removeCustomLink } from '@redux/slices/userSlice/userSlice';
import { removeFieldFromDB } from '@utils/firebaseFunction';
import clsx from 'clsx';
import useScreenSizes from '@hooks/useScreenSizes';


const LinkBlock: React.FC<customLink> = ({title, url}) => {
    const location = useLocation();
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.user)
    const isSettingsPage = location.pathname === '/account/settings';

    const { isTablet } = useScreenSizes();
    
    const handleRemove = () => {
        dispatch(removeCustomLink(title))
        removeFieldFromDB('customLinks', id)
    }

    return (
        <div className={clsx({
            [styles.element]: true,
            [styles.element_tablet]: isTablet
        })}>
            { isSettingsPage && <Button onClick={handleRemove}>
                                  <RiCloseFill />
                              </Button> }
            <Link to={url} className={styles.block}>
                <Text fontSize='md'>{title}</Text>
            </Link>
        </div>
    );
}

export default LinkBlock;
