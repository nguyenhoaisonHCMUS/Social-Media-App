export type SuccessResponse<T> = {
    status: number;
    data?: T;
};

export type ErrorResponse = {
    status: number;
    error: string;
    message: string;
};
export type ApiResponse<T> = SuccessResponse<T> & ErrorResponse;
