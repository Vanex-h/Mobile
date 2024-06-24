import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.5.223.169:3000/api'; // Use this for Android emulator
// const API_URL = 'http://localhost:3000/api'; // Use this for iOS simulator

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email: string, password: string) =>
  api.post('/users/login', { email, password });

export const signup = (username: string, email: string, password: string) =>
  api.post('/users/signup', { username, email, password });

export const createPost = (title: string, body: string) =>
  api.post('/posts', { title, body });

export const getPosts = () => api.get('/posts');

export const getPost = (id: string) => api.get(`/posts/${id}`);

export const deletePost = (id: string) => api.delete(`/posts/${id}`);

export default api;