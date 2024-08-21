import React, { useState } from 'react';
import styles from './AccountSettings.module.scss'
import { Avatar, Button, SkeletonCircle, Stack, Textarea } from '@chakra-ui/react';
import { RiAddFill } from "react-icons/ri";
import { getAuth } from 'firebase/auth';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { deleteProfilePicture, setProfilePicture } from '@redux/slices/userSlice/userSlice';
import { deleteFile, upload } from '@utils/firebaseFunction';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { removePicturefromLS } from '@utils/LSFunction';
import { useAuthState } from 'react-firebase-hooks/auth';

const AccountSettings: React.FC = () => {
    const auth = getAuth()

    const dispatch = useAppDispatch()
    const { picture } = useSelector((state: RootState) => state.user)

    let [symbolCount, setSymbolCount] = useState(0);

    const [user, loading, error] = useAuthState(auth)

    const onInputTextArea = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const length = (event.target as HTMLTextAreaElement).value.length
        setSymbolCount(length)
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (user && file) {
          upload(file, user).finally(() => {
            dispatch(setProfilePicture(picture))
          })
        } else {
          console.log('No user or file selected')
        }
    }

    const onClickRemove = () => {
      if (picture) {
        deleteFile(picture, user)
        dispatch(deleteProfilePicture())
        removePicturefromLS()
      }
    }
    return (
        <div className={styles.settings}>
            <h2>Account Settings</h2>
            <div className={styles.card}>
                <div className={styles.card_header}>
                {loading ? <SkeletonCircle size='10'/> : <Avatar size="xl" src={user?.photoURL || undefined} />}
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
                                isDisabled={loading || !user?.photoURL}
                                onClick={() => onClickRemove()}
                                >Remove</Button>
                    </Stack>
                </div>
                <div className={styles.card_body}>
                    <Textarea maxLength={120} bg={'white'} placeholder='Bio' resize={'none'} onInput={(event) => onInputTextArea(event)} />
                    <div className={styles.counter} >
                        <p>{symbolCount}/120</p>
                    </div>
                    <div className={styles.card_body_bottom}>
                        <Button bg={'white'}>
                            <RiAddFill/>
                            <p style={{marginLeft: '5px'}}>Add social icons</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
