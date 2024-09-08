import { Box, Button, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './BioField.module.scss'
import { RiCloseFill } from 'react-icons/ri';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { removeUserBio, setUserBio } from '@redux/slices/userSlice/userSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@firebase-app';

const BioField: React.FC = () => {
    
    const auth = getAuth()
    
    const dispatch = useAppDispatch()
    const [bio, setBio] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data).bio : ''
    })
    let [symbolCount, setSymbolCount] = useState(0);
    const [user] = useAuthState(auth)

    useEffect(() => {
        const userBio = {
            bio,
          };
          localStorage.setItem('userData', JSON.stringify(userBio));
      }, [bio]);

    const onClickSave = () => {
        if (user) {
            const userRef = doc(db, 'users', user?.uid);
            updateDoc(userRef, { bio })
            dispatch(setUserBio(bio))
        }
        
    }
    const onInputTextArea = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const text = (event.target as HTMLTextAreaElement).value
        setSymbolCount(text.length)
        setBio(text)
    }
    const handleRemoveBio = () => {
        dispatch(removeUserBio())
        setBio('')
    }
    return (
        <>
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
        </>
    );
}

export default BioField;
