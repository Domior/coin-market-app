import { baseInstance } from './index';

export class CoinsService {
  /**
   * get coins list
   * @param {Object} body
   * @param {string} body.vs_currency
   */
  static async getCoins(body) {
    return baseInstance.get(`/coins`, body);
  }
}
