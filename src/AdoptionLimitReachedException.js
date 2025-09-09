import { BaseException } from "./BaseException.js";

export class AdoptionLimitReachedException extends BaseException {
  constructor() {
    super("Você não pode adotar mais que 3 animais.");
  }
}
