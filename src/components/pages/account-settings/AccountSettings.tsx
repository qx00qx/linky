import React, { useEffect, useState } from 'react';
import styles from './AccountSettings.module.scss'
import { Avatar, Box, Button, SkeletonCircle, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { getAuth } from 'firebase/auth';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { deleteProfilePicture, removeUserBio, setProfilePicture, setUserBio } from '@redux/slices/userSlice/userSlice';
import { deleteFile, upload } from '@utils/firebaseFunction';
import { useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import { removePicturefromLS } from '@utils/LSFunction';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserSocialLinks from '@components/ui/users-social-links/userSocialLinks';
import LinkCreator from '@components/ui/link-creator/LinkCreator';
import CustomLinks from '@components/ui/custom-links/CustomLinks';
import UsernameEditor from '@components/ui/username-editor/UsernameEditor';
import { db } from '@firebase-app';
import { doc, updateDoc } from 'firebase/firestore';
import clsx from 'clsx';
import useScreenSizes from '@hooks/useScreenSizes';

const ChooseLinksModal = React.lazy(() => import('@components/modals/chooseLinksModal/chooseLinksModal'))

const AccountSettings: React.FC = () => {
    const auth = getAuth()
    const { isTablet, isMobile } = useScreenSizes();

    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.user)

    let [symbolCount, setSymbolCount] = useState(0);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [bio, setBio] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data).bio : ''
    })
    const [user, loading, error] = useAuthState(auth)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const userBio = {
            bio,
          };
          localStorage.setItem('userData', JSON.stringify(userBio));
      }, [bio]);
    const onInputTextArea = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const text = (event.target as HTMLTextAreaElement).value
        setSymbolCount(text.length)
        setBio(text)
    }
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const file = (event.target as HTMLInputElement).files?.[0];

        if (user && file) {
            const userRef = doc(db, 'users', user?.uid);

            const data = await upload(file, user)
            await updateDoc(userRef, { profilePhoto: data})
            dispatch(setProfilePicture(data))
        }
        setIsLoading(false);
    }
    const onClickSave = () => {
        if (user) {
            const userRef = doc(db, 'users', user?.uid);
            updateDoc(userRef, { bio })
            dispatch(setUserBio(bio))
        }
        
    }
    const onClickRemovePicture = () => {
      if (userData.picture && user) {
        deleteFile(userData.picture)

        dispatch(deleteProfilePicture())
        removePicturefromLS()
      }
    }
    const handleRemoveBio = () => {
        dispatch(removeUserBio())
        setBio('')
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className={styles.settings}>
            <h2>Account Settings</h2>
           <div className={clsx({
            [styles.settings_container]: true,
            [styles.settings_container_tablet]: isTablet,
            [styles.settings_container_mobile]: isMobile
           })}>
           <div className={styles.settings_left}>
           <section className={clsx({
            [styles.card]: true,
            [styles.card_mobile]: isMobile,
            [styles.card_tablet]: isTablet
           })}>
                <div className={styles.card_header}>
                    <div className={styles.card_header_container}>
                        {isLoading ? <SkeletonCircle width={'6rem'} height={'6rem'}/> : <Avatar size="xl" src={userData.picture} />}
                            <Stack className={styles.card_header_buttons} spacing={2} direction='column'>
                                <Button 
                                        bg={'white'}
                                        px={'26px'}
                                        py={'16px'}
                                        variant="outline"
                                        disabled={loading}
                                        >
                                            <input type="file" 
                                                   onChange={(event) => handleImageUpload(event)}
                                                   style={{
                                                    opacity: 0,
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    cursor: 'pointer',
                                                  }}
                                            />
                                            <p>Pick an image</p>
                                </Button>
                                <Button bg={'white'}
                                        px={'26px'}
                                        py={'16px'}
                                        variant="outline"
                                        isDisabled={loading || !userData.picture}
                                        onClick={onClickRemovePicture}
                                        >Remove</Button>
                            </Stack>
                    </div>
                    <UsernameEditor/>
                </div>
                <div className={styles.card_body}>
                    <Textarea className={styles.bio_field} value={bio} maxLength={120} bg={'white'} placeholder='Bio' resize={'none'} onInput={(event) => onInputTextArea(event)} />
                   {bio &&  <button className={styles.btn_remove_bio} onClick={() => handleRemoveBio()}>
                                  <RiCloseFill size={'22px'}/>
                              </button>} 
                    <Box display={'flex'} justifyContent={'space-between'} marginTop={'10px'} marginBottom={'10px'} alignItems={'center'}>
                        <Button onClick={() => onClickSave()}>Save Bio</Button>
                            <div className={styles.counter} >
                                <p>{symbolCount}/120</p>
                        </div>
                    </Box>
                    <div className={styles.card_body_bottom}>
                        <Button bg={'white'} onClick={onOpen}>
                            <RiAddFill/>
                            <p style={{marginLeft: '5px'}}>Add social icons</p>
                        </Button>
                        <ChooseLinksModal  isOpen={isOpen} onClose={onClose} />
                        <UserSocialLinks/>
                    </div>
                </div>
            </section>
            <section className={styles.link_creator}>
                <Text fontWeight={'600'} fontSize={'xl'}>Custom Links</Text>
                <LinkCreator/>
            </section>
           </div>
           <div className={styles.settings_right}>
              <CustomLinks/>
           </div>
           </div>
        </div>
    );
}

export default AccountSettings;
