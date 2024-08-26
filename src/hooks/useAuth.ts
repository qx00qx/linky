import { useAppSelector } from './redux-hooks/useAppDispatch';

const useAuth = () => {
    const { email } = useAppSelector((state) => state.user)

    return {
        isAuth: email
    }

}

export default useAuth;
