import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import FormLogin from '@components/ui/form/form-login/FormLogin';
import { setUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const auth = getAuth()
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    id: user.uid,
                    email: user.email,
                    username: user.displayName,
                    picture: user.photoURL as string
                };
                dispatch(setUser(userData));
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate(`/account/${user.uid}`);
            }
        });
        return () => unsubscribe();
    }, [auth, dispatch, navigate]);
    
    const handleLogin = (email: string, password: string) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                const userData = {
                    id: user?.uid,
                    email: user?.email,
                    username: user?.displayName,
                    picture: user?.photoURL as string
                };
                dispatch(setUser(userData))
                localStorage.setItem('userData', JSON.stringify(userData))
                navigate(`/account/${user.uid}`)
            }
            )
            .catch(() => alert('Invalid user!'))
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
