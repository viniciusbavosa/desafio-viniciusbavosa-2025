export class Person {
  #adoptedAnimals = 0;

  constructor(toysArr) {
    this.toys = toysArr;
  }

  get totalAdoptedAnimals() {
    return this.#adoptedAnimals;
  }

  /**
   * @param {number} quantity
   */
  set adopted(quantity) {
    this.#adoptedAnimals = quantity;
  }
}
