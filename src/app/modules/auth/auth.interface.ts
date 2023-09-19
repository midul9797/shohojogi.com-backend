export type IUserCreate = {
  name: string;
  role: string;
  contactNo: string;
  email: string;
  address: string | null;
  profileImg: string;
};
export type ILoginUser = {
  email: string;
  password: string;
};
