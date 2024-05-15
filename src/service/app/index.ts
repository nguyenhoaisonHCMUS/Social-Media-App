import { loginSuccess, logout } from '@/redux/AuthSlice';
import { store } from '@/redux/store';
import axios, { AxiosInstance } from 'axios';
import { refreshToken } from '../auth';
import { ErrorResponse } from '..';

export const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use(
    function (config) {
        const accessToken = store.getState().auth.currentUser?.accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);
// Tạo một biến flag để xác định việc refresh token đang được thực hiện
let isRefreshing = false;

// Mảng lưu trữ các request pending trong quá trình refresh token
let pendingRequests: (() => void)[] = [];

// Tạo một interceptor để xử lý việc refresh token khi accessToken hết hạn
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const response = error.response;

        if (error.response.status === 403 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang trong quá trình refresh token, đợi cho đến khi token mới được nhận và thử lại yêu cầu ban đầu
                return new Promise(function (resolve) {
                    pendingRequests.push(function () {
                        resolve(instance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await refreshToken();
                isRefreshing = false;
                // Lưu trữ accessToken mới
                const user = store.getState().auth.currentUser.user;
                store.dispatch(
                    loginSuccess({
                        user,
                        accessToken: res.data?.accessToken,
                    }),
                );

                // Thực hiện lại các request đang chờ
                pendingRequests.forEach((callback) => callback());
                pendingRequests = [];
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        const error_response: ErrorResponse = {
            status: response.status,
            error: response.data.error,
            message: response.data.message,
        };

        return Promise.reject(error_response);
    },
);
