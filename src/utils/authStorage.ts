

import { AES, enc, mode, pad, SHA256 } from 'crypto-js';


/**
    * 
    * @description save the user information to local storage
    * @param {any} user user information 
    * @returns void
    * @example
    * saveUserToStorage({name: john, email:john@email.com})
    * 
*/
export const saveUserToStorage = (user: any) => localStorage.setItem("user", JSON.stringify(user));

/**
    * 
    * @description get the user information from local storage
    * @returns JSON.parse(userData)
    * @returns null
    * @example
    * const user = getUserFromStorage()
    * 
*/
export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

/**
    * 
    * @description remove the user information from local storage
    * @returns void
    * @example
    * removeUserFromStorage()
    * 
*/
export const removeUserFromStorage = () => localStorage.removeItem("user");

/**
    * 
    * @description checks the token expiration
    * @param {number} exp token expiration 
    * @returns boolean
    * @example
    * const expiration = 90000
    * const isTokenExpired = isTokenExpired(expiration)
    * 
*/
export const isTokenExpired = (exp: number): boolean => {
    return Date.now() >= exp * 1000;
};

/**
    * 
    * @description checks the token expiration
    * @param {string} role string 
    * @returns string
    * @example
    * const decryptedRole = decryptUserRole("encrypted-role-text")
    * 
*/
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

