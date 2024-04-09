///how to fix????

import { refreshToken } from '@/service/RefreshToken';
import axios from 'axios';
// import { AxiosRequestConfig } from 'axios';
import jwtdecode from 'jwt-decode';
import { INIT_CURRENT_USER, loginSuccess } from '@/redux/AuthSlice';
import { UseDispatch } from 'react-redux';

const axiosJWT = axios.create();

export const jwtAxios = (userData: typeof INIT_CURRENT_USER, dispatch: UseDispatch) => {
    axiosJWT.interceptors.request.use(
        async (config) => {
            try {
                const date = new Date();
                const decodedToken = jwtdecode(userData.accessToken); // Adjust the type according to your decoded token structure
                if (decodedToken.exp < date.getTime() / 1000) {
                    const data = await refreshToken();
                    console.log('data jwt:', data);
                    const newToken = { user: userData, accessToken: data.accessToken };
                    dispatch(loginSuccess(newToken));
                    config.headers['Authorization'] = 'Bearer ' + data.accessToken;
                }

                return config;
            } catch (error) {
                // Handle error appropriately
                console.error('Error:', error);
                return Promise.reject(error);
            }
        },
        (err) => {
            return Promise.reject(err);
        },
    );
};
