import { BaseException } from "./BaseException.js";

export class InvalidToyException extends BaseException {
  constructor() {
    super('Brinquedo inválido')
  }
}