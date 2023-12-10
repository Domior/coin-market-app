class DBService {
  constructor(model) {
    this.model = model;
  }
  async findUser(identifier, byEmail = true) {
    const query = byEmail ? { email: identifier } : { metamaskAddress: identifier };
    return await this.model.findOne(query);
  }

  async createUser(obj) {
    return await this.model.create(obj);
  }

  async updateUserPasswordById(id, hashedPassword) {
    return await this.model.findByIdAndUpdate(id, { password: hashedPassword });
  }

  async findFavorites({ email, metamaskAddress }) {
    const query = email ? { userEmail: email } : { userMetamaskAddress: metamaskAddress };

    return await this.model.findOne(query);
  }

  async createFavorites({ email, metamaskAddress, favorites }) {
    const query = email ? { userEmail: email, favorites: favorites } : { userMetamaskAddress: metamaskAddress, favorites: favorites };

    return await this.model.create(query);
  }
}

module.exports = DBService;
