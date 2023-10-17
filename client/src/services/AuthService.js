import { baseInstance } from './index';

export class AuthService {
  /**
   * signup
   * @param {Object} body
   * @param {string} body.email
   * @param {string} body.password
   */
  static async signUp(body) {
    return baseInstance.post(`/signup`, body);
  }

  /**
   * login
   * @param {Object} body
   * @param {string} body.email
   * @param {string} body.password
   */
  static async logIn(body) {
    return baseInstance.post(`/login`, body);
  }
}
