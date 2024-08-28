export interface IRegisterForm {
  username?: string;
  loginPassword?: string;
  email?: string;
  fullName?: string;
  birthday?: string;
  role?: string;
  authorities?: string[];
  image?: Uint8Array;
}
