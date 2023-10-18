import { commonInstance, baseInstance } from './index';

export class AuthService {
  /**
   * signup
   * @param {Object} body
   * @param {string} body.email
   * @param {string} body.password
   */
  static async signUp(body) {
    return commonInstance.post(`/signup`, body);
  }

  /**
   * login
   * @param {Object} body
   * @param {string} body.email
   * @param {string} body.password
   */
  static async logIn(body) {
    return commonInstance.post(`/login`, body);
  }

  /**
   * logout
   */
  static async logOut() {
    return baseInstance.delete(`/logout`);
  }
}
