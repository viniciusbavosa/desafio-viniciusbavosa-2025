const animalsArr = [{
  nome: 'REX',
  raça: 'CAO',
  brinquedos: ['RATO, BOLA']
}, {
  nome: 'MIMI',
  raça: 'GATO',
  brinquedos: ['BOLA', 'LASER']
}, {
  nome: 'FOFO',
  raça: 'GATO',
  brinquedos: ['BOLA, RATO, LASER']
}, {
  nome: 'ZERO',
  raça: 'GATO',
  brinquedos: ['RATO, BOLA']
}, {
  nome: 'BOLA',
  raça: 'CAO',
  brinquedos: ['CAIXA, NOVELO']
}, {
  nome: 'BEBE',
  raça: 'CAO',
  brinquedos: ['LASER, RATO, BOLA']
}, {
  nome: 'LOCO',
  raça: 'JABUTI',
  brinquedos: ['SKATE, RATO']
}];


const InvalidAnimalException = {
  lista: null,
  erro: 'Animal inválido'
}
class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const firstPersonInput = brinquedosPessoa1.toUpperCase().trim();
    const secondPersonInput = brinquedosPessoa2.toUpperCase().trim();
    const chosenAnimals = ordemAnimais.toUpperCase().trim();

    if (!this.isValidAnimal(chosenAnimals)) return InvalidAnimalException;

  }

  isValidAnimal(animal) {
    const animals = animal.split(',');
    let result;

    animals.forEach((animalInput, _) => {
      result = animalsArr.some((animalData, _) => animalData.nome === animalInput)
    })

    return result;
  }
}


export { AbrigoAnimais as AbrigoAnimais };
