import axios from 'axios';
import { ApiResponse } from '..';

const instance = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true,
});

export const loginApi = async (email: string, password: string) => {
    try {
        const response = await instance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        return { message: 'failed' };
    }
};

export const registerApi = async (name: string, username: string, email: string, password: string) => {
    try {
        const response = await instance.post('/register', { name, username, email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        return { message: 'failed: ' + error };
    }
};

type RefreshTokenType = {
    accessToken: string;
    data: string;
};

export const refreshToken = async () => {
    try {
        const response: ApiResponse<RefreshTokenType> = await instance.post('/refreshtoken');
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to refresh token');
    }
};

// export const checkTokenExpiration = () => {
//     const accessToken = store.getState().auth.currentUser.accessToken;
//     if (!accessToken) {
//         // Chưa có accessToken, cần đăng nhập lại
//         return false;
//     }

//     try {
//         const decodedToken: JwtPayload = jwtDecode(accessToken);
//         // console.log('decodeToken: ', decodedToken);
//         const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (đã chuyển sang giây)

//         if (decodedToken) {
//             return false;
//         }
//         if (decodedToken.exp < currentTime) {
//             // AccessToken đã hết hạn
//             return true;
//         } else {
//             // AccessToken vẫn còn hiệu lực
//             return false;
//         }
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         logout();
//         return false;
//     }
// };
