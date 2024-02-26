export interface RegisterAccount {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ResendEmailConfirmation {
  email: string;
}

export interface LoginToAccount {
  email: string;
  password: string;
}

export interface ForgetPassword {
  email: string;
}

export interface ResetPassword {
  password: string;
  passwordConfirm: string;
}

export interface MemberAccount {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  email: string;
  isActive: boolean;
}
