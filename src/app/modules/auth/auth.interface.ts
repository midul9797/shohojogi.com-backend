export type IUserCreate = {
  first_name: string;
  last_name: string;
  role: string;

  email: string;
};
export type ILoginUser = {
  email: string;
  password: string;
};
