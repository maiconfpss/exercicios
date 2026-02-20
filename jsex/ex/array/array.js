

const users = [
    {
        id: 1,
        name: "Maicon",
        age: 21,
        email: "maiconfpss@array.js",
        password: "126378"
    },
    {
        id: 2,
        name: "Madu",
        age: 7,
        email: "MaryaEduarda@array.js",
        password: "2345632"
    },
    {
        id: 3,
        name: "Mavi",
        age: 7,
        email: "MaryaVitoria@array.js",
        password: "1242345"
    },
    {
        id: 4,
        name: "Carolyne",
        age: 5,
        email: "Carolyne@array.js",
        password: "1244956"
    },
]

/* Array serve para armazenar varias informacoes em uma unica variavel tipo cadastros, contatos, numeros etc */

console.log("Nome antes:", users[0].name);

users[0].name = "maiconfpss";    // Alterando o valor da propriedade 'name' dentro do array [0]

console.log("Nome depois:", users[0].name);
console.log("Lista completa atualizada:", users);