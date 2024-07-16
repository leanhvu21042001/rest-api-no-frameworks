export default class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  async find() {
    return this.heroRepository.find();
  }

  async create(data) {
    return this.heroRepository.create(data);
  }
}
