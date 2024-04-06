
export interface UserRegister {
  _id:      string;
  email:    string;
  name:     string;
  password: string;
  isActive: boolean;
  roles:    string[];
}
