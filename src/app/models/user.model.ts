export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'parent' | 'child';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
