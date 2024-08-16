import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useAuth = () => {
    const { email } = useSelector((state: RootState) => state.user)

    return {
        isAuth: email
    }

}

export default useAuth;
