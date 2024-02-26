import { useCustomFetch } from "@/composables/useFetch";
import { useApi } from "@/composables/useApi";
import {
  type RegisterAccount,
  type ResendEmailConfirmation,
  type LoginToAccount,
  type ResetPassword,
  type ForgetPassword,
  type MemberAccount,
} from "@/types/account";
import type { AsyncData } from "#app";
import { FetchError } from "ofetch";

/* Get all accounts */
export const getAccounts = (options: {} = {}) => {
  return useCustomFetch<MemberAccount[]>("/users", options);
};

/* Get one account */
export const getAccount = (accountId: string, options: {} = {}) => {
  return useCustomFetch<MemberAccount>(`/users/${accountId}`, options);
};

/* Register an account */
export const register = async (payload: RegisterAccount): Promise<void> => {
  await useApi("/auth/register", { method: "POST", body: payload });
};

/* Login to account */
export const login = async (
  payload: LoginToAccount,
): Promise<MemberAccount> => {
  return await useApi("/auth/login", {
    method: "POST",
    body: payload,
  });
};

/* Refresh tokens */
export const refreshSession = async () => {
  return useCustomFetch<MemberAccount>(`/auth/refresh`, {
    method: "POST",
    server: false,
  });
};

/* Logout */
export const logout = async (): Promise<{ message: string }> => {
  return await useApi("/auth/logout", {
    method: "GET",
  });
};

/* Forget password - send email to get reset password link */
export const forgetPassword = async (
  payload: ForgetPassword,
): Promise<void> => {
  await useApi("/auth/remind-password", { method: "POST", body: payload });
};

/* Check reset password token correction */
export const checkRestPasswordToken = (token: string, options: {} = {}) => {
  return useCustomFetch(`/auth/reset-password/${token}`, options);
};

/* Reset password */
export const resetPassword = async (
  token: string,
  payload: ResetPassword,
): Promise<void> => {
  await useApi(`/auth/reset-password/${token}`, {
    method: "POST",
    body: payload,
  });
};

/* Confirm email */
export const checkEmailConfirmToken = (token: string, options: {} = {}) => {
  return useCustomFetch(`/auth/email-confirm/${token}`, options);
};

/* Refresh email confirmation */
export const refreshEmailConfirmation = async (
  payload: ResendEmailConfirmation,
): Promise<void> => {
  await useApi("/auth/resend-email-confirm", { method: "POST", body: payload });
};
