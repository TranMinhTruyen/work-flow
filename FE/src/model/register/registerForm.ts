export interface IRegisterForm {
  email?: string;
  username?: string;
  loginPassword?: string;
  fullName?: string;
  role?: string;
  authorities?: string[];
  image?: Uint8Array;
}
