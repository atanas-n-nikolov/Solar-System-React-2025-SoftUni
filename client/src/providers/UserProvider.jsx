import { UserContext } from "../contexts/UserContext";
import useLocalStorageState from "../hooks/useLocalStorageState";


export default function UserProvider({
    children,
}) {
    const [authData, setAuthData] = useLocalStorageState('auth', {});
    
    const userLoginHandler = (resultData) => {
        const { password, ...userData} = resultData;
        setAuthData(userData);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}
