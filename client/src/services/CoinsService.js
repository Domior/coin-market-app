import { baseInstance } from './index';

export class CoinsService {
  /**
   * get coins list
   * @param {Object} params
   * @param {string} params.vs_currency
   */
  static async getCoins(params) {
    return baseInstance.get(`/coins`, { params });
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

  /**
   * get coin chart
   * @param {string} id
   * @param {Object} params
   * @param {string} params.vs_currency
   * @param {string} params.days
   */
  static async getCoinChart(id, params) {
    return baseInstance.get(`/chart/${id}`, { params });
  }
}
