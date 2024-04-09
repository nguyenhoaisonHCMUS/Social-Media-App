import { createContext, useContext, useState } from 'react';
import { User } from '@/types'; // Kiểu dữ liệu của User

export const INIT_USER: User = {
    name: '',
    username: '',
    email: '',
    imgUrl: '',
};

const INITIAL_STATE = {
    isLoggedIn: false,
    //setIsLoggedIn: () => {},
    userData: INIT_USER,
    //setUserData: () => {},
    login: () => {},
    logout: () => {},
};
// Tạo một Context mới
type AuthContextType = {
    isLoggedIn: boolean;
    //setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userData: User;
    // setUserData: React.Dispatch<React.SetStateAction<User>>;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

// Tạo một custom hook để sử dụng Context
export function useAuth() {
    return useContext(AuthContext);
}

// Provider component để cung cấp trạng thái đăng nhập và dữ liệu người dùng
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<User>(INIT_USER);
    // Hàm để đăng nhập người dùng
    function login(user: User) {
        setIsLoggedIn(true);
        setUserData(user);
    }

    // Hàm để đăng xuất người dùng
    function logout() {
        setIsLoggedIn(false);
        setUserData(INIT_USER);
    }

    // Giá trị của Context Provider
    const contextValues: AuthContextType = {
        isLoggedIn,
        userData,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
}
