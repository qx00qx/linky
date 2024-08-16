import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormLogin from '@components/ui/form/form-login/FormLogin';
import { setUser } from '@redux/slices/userSlice/userSlice';
import { useAppDispatch } from '@hooks/redux-hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                const userData = {
                    id: user.uid,
                    email: user.email,
                    username: user.displayName,
                };
                dispatch(setUser(userData))
                localStorage.setItem('user', JSON.stringify(userData))
                navigate('/profile')
            }
            )
            .catch(() => alert('Invalid user!'))
    }
    
    return (
        <FormLogin
          title="Login"
          handleClick={handleLogin}
        />
    );
}

export default Login;
