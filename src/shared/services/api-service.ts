import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await apiClient.post('/auth/refresh');
        if (data.token) {
          localStorage.setItem('token', data.token);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export class ApiService<T> {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAll(params?: Record<string, unknown>): Promise<T[]> {
    try {
      const response: AxiosResponse<T[]> = await apiClient.get(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${this.baseUrl}:`, error);
      throw error;
    }
  }


  async getById(id: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with id ${id} from ${this.baseUrl}:`, error);
      throw error;
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.post(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating new item at ${this.baseUrl}:`, error);
      throw error;
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating item with id ${id} at ${this.baseUrl}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting item with id ${id} at ${this.baseUrl}:`, error);
      throw error;
    }
  }

  async customRequest<R>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<R> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: `${this.baseUrl}${url}`,
        params
      };

      if (data) {
        config.data = data;
      }

      const response: AxiosResponse<R> = await apiClient.request(config);
      return response.data;
    } catch (error) {
      console.error(`Error in custom request to ${this.baseUrl}${url}:`, error);
      throw error;
    }
  }
}

export default apiClient;