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

  /**
   * get coin details
   * @param {string} id
   */
  static async getCoinDetails(id) {
    return baseInstance.get(`/coins/${id}`);
  }

  /**
   * get coin details
   * @param {string} coinId
   * @param {boolean} isFavorite
   */
  static async setFavorite({ coinId, isFavorite }) {
    return baseInstance.patch(`/favorites/${coinId}`, { isFavorite });
  }
}
