import { AdoptionLimitReachedException } from "./AdoptionLimitReachedException.js";
import { InvalidAnimalException } from "./InvalidAnimalException.js";
import { InvalidInputException } from "./InvalidInputException.js";
import { InvalidLocoAdoptionException } from "./InvalidLocoAdoptionException.js";
import { InvalidToyException } from "./InvalidToyException.js";
import { Person } from "./person.js";

const animalsArr = [
  {
    nome: "Rex",
    raça: "Cao",
    brinquedos: ["RATO", "BOLA"],
  },
  {
    nome: "Mimi",
    raça: "Gato",
    brinquedos: ["BOLA", "LASER"],
  },
  {
    nome: "Fofo",
    raça: "Gato",
    brinquedos: ["BOLA", "RATO", "LASER"],
  },
  {
    nome: "Zero",
    raça: "Gato",
    brinquedos: ["RATO", "BOLA"],
  },
  {
    nome: "Bola",
    raça: "Cao",
    brinquedos: ["CAIXA", "NOVELO"],
  },
  {
    nome: "Bebe",
    raça: "Cao",
    brinquedos: ["LASER", "RATO", "BOLA"],
  },
  {
    nome: "Loco",
    raça: "Jabuti",
    brinquedos: ["SKATE", "RATO"],
  },
];

class AbrigoAnimais {
  static animalsAvailable = animalsArr;
  static animalsToys = AbrigoAnimais.animalsAvailable
    .flatMap((data) => data.brinquedos)
    .filter((toy, index, arr) => arr.indexOf(toy) === index);

  static buildAdoptionMessage(
    personOneAnimals,
    personTwoAnimals,
    animalsNames
  ) {
    let result = [];

    if (!personOneAnimals.length && !personTwoAnimals.length) {
      animalsNames.forEach((value) => result.push(`${value} - abrigo`));
    }

    for (let i = 0; i < personOneAnimals.length; i++) {
      const animalNamePersonOne = personOneAnimals[i].nome;

      if (animalsNames.includes(animalNamePersonOne))
        result.push(`${animalNamePersonOne} - pessoa 1`);
    }

    for (let i = 0; i < personTwoAnimals.length; i++) {
      const animalNamePersonTwo = personTwoAnimals[i].nome;

      if (animalsNames.includes(animalNamePersonTwo))
        result.push(`${animalNamePersonTwo} - pessoa 2`);
    }

    animalsNames.forEach((value) => {
      if (!result.some((string) => string.startsWith(value)))
        result.push(`${value} - abrigo`);
    });

    return {
      lista: result.sort(),
      error: null,
    };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    if (!brinquedosPessoa1 || !brinquedosPessoa2 || !ordemAnimais)
      return new InvalidInputException();

    const personOne = new Person(
      brinquedosPessoa1.split(",").map((v) => v.trim().toUpperCase())
    );

    const personTwo = new Person(
      brinquedosPessoa2.split(",").map((v) => v.trim().toUpperCase())
    );

    const chosenAnimals = ordemAnimais.split(",").map((v) => v.trim());

    if (!this.isValidAnimal(chosenAnimals)) return new InvalidAnimalException();

    if (!this.isValidToy(personOne.toys) || !this.isValidToy(personTwo.toys)) {
      return new InvalidToyException();
    }

    const animalsToBeAdoptedByPersonOne = AbrigoAnimais.animalsAvailable.filter(
      (animal) => this.canAdoptAnimal(personOne, animal, chosenAnimals)
    );

    const animalsToBeAdoptedByPersonTwo = AbrigoAnimais.animalsAvailable.filter(
      (animal) => this.canAdoptAnimal(personTwo, animal, chosenAnimals)
    );

    const duplicatedElement = this.isDuplicate(
      animalsToBeAdoptedByPersonOne,
      animalsToBeAdoptedByPersonTwo
    );

    if (duplicatedElement) {
      this.removeDuplicateAdoptions(
        animalsToBeAdoptedByPersonOne,
        duplicatedElement
      );
      this.removeDuplicateAdoptions(
        animalsToBeAdoptedByPersonTwo,
        duplicatedElement
      );
    }

    if (
      chosenAnimals.includes("Loco") &&
      (!this.validateLocoAdoption(animalsToBeAdoptedByPersonOne) ||
        !this.validateLocoAdoption(animalsToBeAdoptedByPersonTwo))
    ) {
      return new InvalidLocoAdoptionException();
    }

    personOne.adopted = animalsToBeAdoptedByPersonOne.length;
    personTwo.adopted = animalsToBeAdoptedByPersonTwo.length;

    if (personOne.totalAdoptedAnimals > 3 || personTwo.totalAdoptedAnimals > 3)
      return new AdoptionLimitReachedException();

    return AbrigoAnimais.buildAdoptionMessage(
      animalsToBeAdoptedByPersonOne,
      animalsToBeAdoptedByPersonTwo,
      chosenAnimals
    );
  }

  isValidAnimal(animalInput) {
    return animalInput.every((animalName) =>
      AbrigoAnimais.animalsAvailable.some(
        (animal) => animal.nome === animalName
      )
    );
  }

  isValidToy(toyInput) {
    return toyInput.every((toyName) =>
      AbrigoAnimais.animalsToys.includes(toyName)
    );
  }

  isDuplicate(personOneAnimals, personTwoAnimals) {
    return personOneAnimals.find((animal) => personTwoAnimals.includes(animal));
  }

  removeDuplicateAdoptions(animalsToBeAdopted, elementIndex) {
    return animalsToBeAdopted.splice(
      animalsToBeAdopted.indexOf(elementIndex),
      1
    );
  }

  canAdoptAnimal(person, animal, chosenAnimals) {
    return animal.brinquedos.every(
      (toy, index) =>
        person.toys.indexOf(toy) === index &&
        chosenAnimals.includes(animal.nome)
    );
  }

  validateLocoAdoption(animalsToBeAdopted) {
    return (
      animalsToBeAdopted.find((animal, _, arr) => animal.nome === "Loco") &&
      animalsToBeAdopted.length > 1
    );
  }
}

export { AbrigoAnimais as AbrigoAnimais };
