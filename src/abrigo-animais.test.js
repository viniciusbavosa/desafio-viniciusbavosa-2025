import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );

    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar argumentos vazios", () => {
    const resultado = new AbrigoAnimais().encontraPessoas("", "", "Bola");

    expect(resultado.erro).toBe("Dados de entrada inválidos");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BATATA",
      "Rex,Fofo"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar a adoção por limite de animais adotados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "LASER,RATO,BOLA,RATO",
      "RATO,BOLA",
      "Rex,Zero,Fofo,Bebe"
    );

    expect(resultado.erro).toBe("Você não pode adotar mais que 3 animais.");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar quem adotou apenas Loco.", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO",
      "RATO,BOLA,CAIXA",
      "Loco,Rex"
    );

    expect(resultado.erro).toBe(
      "Loco deve ser adotado junto com outro animal."
    );
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve impedir a adoção quando ambas as pessoas podem adotar um animal.", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );

    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });
});
