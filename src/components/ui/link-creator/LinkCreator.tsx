import React, { useState } from 'react';
import styles from './LinkCreator.module.scss'
import { Button, FormControl } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import { addCustomLink } from '@redux/slices/userSlice/userSlice';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@firebase-app';

const LinkCreator: React.FC = () => {

    const user = useAppSelector((state) => state.user)

    const [formData, setFormData] = useState({
        title: '',
        url: '',
      });

    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleAddLink = async (title: string, url: string) => {
        try {
            if (user) {
                const docRef = doc(db, 'users', user.id)
                const docSnap = await getDoc(docRef);

                const existingCustomLinks = docSnap.data()?.customLinks || [];

                const payload = [...existingCustomLinks, {title, url}]

                if (!user.customLinks?.find((link) => link.title === title)) {
                    await updateDoc(docRef, {customLinks: payload})

                    dispatch(addCustomLink({title, url}))
                    setFormData({
                        title: '',
                        url: '',
                      });
            
                } else {
                    alert('You already have this link title');
                  }
            }
        } catch (error) {
            alert(error) 
        }
    }

    return (
        <FormControl className={styles.link_creator}>
            <input type="text" name='title' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)} placeholder='Title' value={formData.title}/>
            <input type="text" name='url' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)} placeholder='URL' value={formData.url}/>
            <Button onClick={() => {handleAddLink(formData.title, formData.url)}}> Add</Button>
        </FormControl>
    );
}

export default LinkCreator;