export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
export interface FormInputContent {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}
