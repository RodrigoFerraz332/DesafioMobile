import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'users';
  private LOGGED_KEY = 'loggedUser';

  constructor() {}

  /**
   * Cadastra um novo usuário.
   * @param name
   * @param email
   * @param password
   * @returns
   */
  registerUser(name: string, email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Verifica se email já existe
    const exists = users.find((u: any) => u.email === email);
    if (exists) return false;

    // Adiciona novo usuário
    users.push({ name, email, password });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return true;
  }

  /**
   * Faz login do usuário.
   * @param email
   * @param password
   * @returns
   */
  loginUser(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(this.LOGGED_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  /**
   * Retorna o usuário logado atualmente (ou null)
   */
  getLoggedUser(): any | null {
    return JSON.parse(localStorage.getItem(this.LOGGED_KEY) || 'null');
  }

  /**
   * Desloga o usuário
   */
  logout() {
    localStorage.removeItem(this.LOGGED_KEY);
  }
}
