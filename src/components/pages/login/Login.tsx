import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormLogin from '@components/ui/form/form-login/FormLogin';
import { setUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { db } from '@firebase-app';
import { doc, getDoc } from 'firebase/firestore';

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const auth = getAuth()
    
    const handleLogin = (email: string, password: string) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {
                const userId = user.uid

                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);

                console.log("User data from Firestore:", userDoc.data());
                
                if (userDoc.exists()) {
                    const userData = {
                        id: userId,
                        email: user?.email,
                        username: userDoc.data().username, 
                        bio: userDoc.data().bio,
                        profilePhoto: userDoc.data().profilePhoto || '',
                        socialsLinks: userDoc.data().socialsLinks || [],
                        customLinks: userDoc.data().customLinks || []
                    };
                    console.log("Prepared userData:", userData);
                    console.log(userDoc.data().profilePhoto)
                    dispatch(setUser(userData))

                    localStorage.setItem('userData', JSON.stringify(userData))
                    navigate(`/account/${user.uid}`)
                }
            }
            )
            .catch((error) => alert('Invalid user!' + error))
            .finally(() => setIsLoading(false))
    }

    if (isLoading) {
        return <Spinner
                        margin={'3.12rem auto 0'}
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='gray.800'
                        size='xl'
                    />
    }
    
    return (
        <FormLogin
          title="Login"
          handleClick={handleLogin}
        />
    );
}

export default Login;
