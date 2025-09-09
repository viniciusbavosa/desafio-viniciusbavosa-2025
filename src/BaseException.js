export class BaseException {
  lista = null;
  erro = "Algo inesperado ocorreu!";
  constructor(errorMessage) {
    this.erro = errorMessage;
  }
}
