export type AuthState = {
  isLoggedIn: boolean;
  user: UserResponse | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkLoginStatus: () => void;
};

export type TokenResponse = {
  type: string;
  token: string;
  refreshToken: string;
};

export type UserResponse = {
  _id: string;
  email: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type SignInResponse = {
  user: UserResponse;
  token: TokenResponse;
  access: {
    active: boolean;
    user_id: string;
    created_at: string;
    updated_at: string;
    _id: string;
  };
};
