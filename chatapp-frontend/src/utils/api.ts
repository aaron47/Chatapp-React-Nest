import { AuthInput } from './types/AuthInput';
import axios, { AxiosRequestConfig } from 'axios';
import { User } from './types/User';
import { Message } from './types/Message';
import { CreateMessageDto } from './types/CreateMessageDto';

const API_URL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
});

const config: AxiosRequestConfig = {
  withCredentials: true,
};

export const getAuthUser = () => axiosClient.get<User>('/auth/status', config);

export const postSignUpUser = (data: AuthInput) =>
  axiosClient.post('/auth/signup', data, config);

export const postLoginUser = (data: AuthInput) =>
  axiosClient.post('/auth/login', data, config);

export const postLogoutUser = () => axiosClient.post('/auth/logout', config);

export const getAllUsers = () => axiosClient.get<User[]>('/user/all', config);

export const getUserById = (id: string) =>
  axiosClient.get<User>(`/user/${id}`, config);

export const getAllMessages = (recipientId: string) =>
  axiosClient.get<Message[]>(`/message/${recipientId}/all`, config);

export const postCreateMessage = (
  recipientId: string,
  data: CreateMessageDto
) => axiosClient.post(`/message/${recipientId}/create`, data, config);

export const patchSetAvatar = (id: string, avatarUrl: string) =>
  axiosClient.patch(`/user/${id}/setavatar`, { avatarUrl }, config);
