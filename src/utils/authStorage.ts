

import { AES, enc, mode, pad, SHA256 } from 'crypto-js';

export const saveUserToStorage = (user: any) => localStorage.setItem("user", JSON.stringify(user));
export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};
export const removeUserFromStorage = () => localStorage.removeItem("user");

export const isTokenExpired = (exp: number): boolean => {
    return Date.now() >= exp * 1000;
};
export const decryptUserRole = (role: string) => {
    
    const key = enc.Hex.parse(SHA256(import.meta.env.VITE_ENCRYPTION_KEY).toString());
    const iv = enc.Utf8.parse(SHA256(import.meta.env.VITE_ENCRYPTION_KEY_IV).toString().substring(0, 16));

    const decrypted = AES.decrypt(role, key, {
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });

    return decrypted.toString(enc.Utf8)
    
}

