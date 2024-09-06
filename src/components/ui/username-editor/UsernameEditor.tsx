import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { RiEdit2Fill } from 'react-icons/ri';
import styles from './UsernameEditor.module.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import { setNewUsername } from '@redux/slices/userSlice/userSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@firebase-app';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const UsernameEditor: React.FC = () => {

    const userData = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState(userData.username as string)
    const [isEditing, setIsEditing] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null);

    const auth = getAuth()
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (isEditing && inputRef.current) {
          inputRef.current.focus();
        }
      }, [isEditing]);
    

    const onChangeUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value
        const docRef = doc(db, 'users', userData.id)

        setUsername(newUsername);
        dispatch(setNewUsername(newUsername))

        if (user) {
            await updateProfile(user, { displayName: newUsername})
        }
        await updateDoc(docRef, { username: newUsername })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsEditing(false)
        }
    }

    return (
        <div className={styles.username_editor}>
                        <span>@</span>
                        <Input
                               ref={inputRef}
                               variant='unstyled'
                               onChange={onChangeUsername}
                               value={`${username}`}
                               onKeyDown={(e) => handleKeyDown(e)}
                               autoFocus={isEditing}
                               />
                        <button className={styles.button_edit}
                                onClick={() => setIsEditing(true)}
                                >
                            <RiEdit2Fill size={16} className={styles.edit} />
                        </button>
        </div>
    );
}

export default UsernameEditor;
