import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';
import useUserData from '../../hooks/useUserData';

const AdminRoutes = ({children}) => {
    const {user: authUser, loading} = useAuth()
    const [user] = useUserData(authUser?.phoneNumber)
    const location = useLocation()
// console.log(user)
    if (loading || !user.role) {
        return <Loader/>
    }

if (authUser && user.role === "admin") {
    return children
}

    return <Navigate to='/login' state={{from: location}}/>
};

export default AdminRoutes;