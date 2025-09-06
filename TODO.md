# Planejamento

- ## Entendendo a lógica de negócio

  Estamos auxiliando um abrigo de animais. Nossa tarefa é facilitar o _match_ dos animalzinhos com seus possíveis tutores. Para isso, é preciso seguir algumas regras que ajudam a encontrar o melhor tutor:

  - Cada animal tem brinquedos favoritos
  - O tutor deve levar os brinquedos favoritos do animalzinho na ordem correta para adota-lo
  - Não tem problema se o tutor intercalar um brinquedo extra na fila de brinquedos, contanto que a ordem esteja correta.
  - Se dois ou mais tutores escolherem os brinquedos do mesmo animalzinho, ele não é adotado
  - Um tutor não pode levar mais de três animais para casa
  - Gatos não dividem seus brinquedos. Ou seja, não podem ser adotados com animais que gostam do mesmo brinquedo
  - O animalzinho **Loco** só pode ser adotado com um outro animal como companhia
  - **Loco** não se importa com a ordem dos brinquedos

  O desafio estipula 2 pessoas para os testes. Cada pessoa terá sua lista individual de brinquedos relacionados ao _pet_ que deseja. O programa deve receber 3 argumentos:

  - A lista de brinquedos da primeira pessoa
  - A lista de brinquedos da segunda pessoa
  - Os animais a serem adotados, em ordem de prioridade

  O programa deve ser capaz de realizar as seguintes verificações:

  - Se a ordem dos brinquedos passados como argumentos está na mesma ordem dos animais escolhidos
  - Se duas pessoas escolheram o mesmo animalzinho, com a ordem dos brinquedos válida
  - Se a pessoa que adotou **Loco** também tenha adotado outro animal
  - Se a pessoa que adotou um gato não tenha adotado outro bichinho com os mesmos brinquedos
  - Se a pessoa atingiu o limite de 3 animais adotados
  - Se os animais passados como argumentos são válidos
  - Se todos os campos foram preenchidos

- ## Design

  - Array de objetos estático contendo informações sobre os animais do abrigo.
