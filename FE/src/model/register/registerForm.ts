export interface IRegisterForm {
  username?: string;
  email?: string;
  loginPassword?: string;
  fullName?: string;
  birthday?: string;
  role?: string;
  authorities?: string[];
  image?: Uint8Array;
}
