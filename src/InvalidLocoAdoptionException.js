import { BaseException } from "./BaseException.js";

export class InvalidLocoAdoptionException extends BaseException {
  constructor() {
    super("Loco deve ser adotado junto com outro animal.");
  }
}
