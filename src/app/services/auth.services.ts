import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'users';
  private LOGGED_KEY = 'loggedUser';

  constructor() {
    // Para fins de teste, cria um usuário padrão se não existir nenhum.
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (!users.some((u: any) => u.email === 'teste@email.com')) {
      users.push({ name: 'Usuário Teste', email: 'teste@email.com', password: '123' });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }

  /**
   * Verifica se um usuário com o e-mail fornecido já existe.
   * @param email O e-mail a ser verificado.
   * @returns Retorna true se o e-mail existir, caso contrário, false.
   */
  checkUserExists(email: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return users.some((u: any) => u.email === email);
  }

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

  /**
   * Redefine a senha de um usuário.
   * @param email O email do usuário.
   * @param newPassword A nova senha.
   * @returns Retorna true se a senha foi redefinida, false caso o usuário não exista.
   */
  redefinePassword(email: string, newPassword: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Encontra o índice do usuário na lista
    const userIndex = users.findIndex((u: any) => u.email === email);

    // Se o usuário não for encontrado, retorna false
    if (userIndex === -1) {
      return false;
    }

    // Atualiza a senha do usuário encontrado
    users[userIndex].password = newPassword;

    // Salva a lista de usuários atualizada no localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

    // Opcional: Se o usuário que redefiniu a senha estiver logado,
    // atualiza também a sua sessão.
    const loggedUser = this.getLoggedUser();
    if (loggedUser && loggedUser.email === email) {
      loggedUser.password = newPassword;
      localStorage.setItem(this.LOGGED_KEY, JSON.stringify(loggedUser));
    }

    return true;
  }
}

