import { BaseException } from "./BaseException.js";

export class InvalidInputException extends BaseException {

  constructor() {
    super('Dados de entrada inválidos')
  }
}