export interface IUser {
  username: string;
  id: string;
  role: "user" | "admin" | "superadmin";
  created_at?: Date;
  phone: string;
  email: string;
}
