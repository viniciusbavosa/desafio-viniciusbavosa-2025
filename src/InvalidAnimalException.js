import { BaseException } from "./BaseException.js";

export class InvalidAnimalException extends BaseException {

  constructor() {
    super('Animal inválido')
  }
}