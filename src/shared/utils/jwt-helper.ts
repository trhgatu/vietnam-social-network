import { refreshToken, setAuthToken } from "../services/auth-services";

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  username: string;
  role: string;
}

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    setAuthToken(token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    setAuthToken(null);
  }
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if token is expired (with 60 seconds buffer)
  return decoded.exp < currentTime + 60;
};

export const getTokenData = (): DecodedToken | null => {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token);
};

export const validateAndRefreshToken = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    // Try to refresh the token
    const refreshResult = await refreshToken();
    return !!refreshResult?.token;
  }

  return true;
};