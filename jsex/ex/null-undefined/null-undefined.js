

const user = {
    nickname: "maiconfpss",
    id: null,   // Null = Valor vazio por propósito. O sistema sabe que o ID existirá, mas ainda não foi definido.
    email: "maiconfpss@gmail.com",
    // password: undefined -> Se comentarmos a linha, o JS retorna undefined porque a chave não existe no objeto.
}

console.log("Nickname:", user.nickname);
console.log("ID (propositalmente vazio):", user.id);
console.log("E-mail:", user.email);
console.log("Senha (não existe no objeto):", user.password);