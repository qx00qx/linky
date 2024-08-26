import React from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import FormRegister from '@components/ui/form/form-register/FormRegister';
import { setUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { db } from '@firebase-app';
import { doc, setDoc } from 'firebase/firestore';

const Signup: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const auth = getAuth()

    const handleRegister = (email: string, password: string, username: string) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            if (user) {
                updateProfile(user, {displayName: username})
                dispatch(setUser({
                  email: user.email,
                  id: user.uid,
                  username,
                  picture: ''
                }))

                /* Добавление в базу данных */

                const docRef = doc(db, 'users', user.uid)
                const payload = { 
                  email: user.email,
                  username
                }
                setDoc(docRef, payload)

                navigate('/')
                }
          })
          .catch(() => alert('Invalid user!'))
      }
    
    return (
        <FormRegister
          title="Register"
          handleClick={handleRegister}
        />
    );
}

export default Signup;