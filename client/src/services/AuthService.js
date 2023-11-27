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
   * login metamask
   * @param {Object} body
   * @param {string} body.metamaskAddress
   */
  static async logInMetamask(body) {
    return commonInstance.post(`/login-metamask`, body);
  }

  /**
   * forgot password
   * @param {Object} body
   * @param {string} body.email
   */
  static async forgotPassword(body) {
    return commonInstance.post(`/forgot-password`, body);
  }

  /**
   * reset password
   * @param {Object} body
   * @param {string} body.id
   * @param {string} body.token
   * @param {string} body.password
   */
  static async resetPassword(body) {
    return commonInstance.post(`/reset-password`, body);
  }

  /**
   * logout
   */
  static async logOut() {
    return baseInstance.delete(`/logout`);
  }
}
