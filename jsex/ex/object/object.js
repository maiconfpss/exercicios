

const people = {
    name: 'Maicon',
    lastname: 'Souza',
    age: 21,        // Números (inteiros ou decimais) não precisam de aspas
    address: {
        city: 'Mulungu do Morro',
        number: "s/n",
        zipcode: '44885-000',
        state: 'Bahia',
        country: 'Brasil'
    }
}

people.name = "maiconfpss"; // Alterando o valor da propriedade 'name'

console.log(people);    // Exibe o objeto completo no console

console.log(people.address);  // Acessando o objeto aninhado 'address'

console.log(people.address.city);   // Acessando uma propriedade específica dentro de 'address'

alert(JSON.stringify(people, null, 2));

console.log("Nome alterado para:", people.name);

/* 
    Objetos são estruturas de dados que armazenam informações em pares de chave e valor.
    Aqui eu criei um objeto chamado 'people' que agrupa várias informações relacionadas.
    Propriedades como 'name' e 'lastname' são simples, enquanto 'address' é um objeto 
    aninhado (um objeto dentro de outro), o que permite categorizar melhor os dados 
    (como cidade, estado, etc) usando um novo par de chaves {}.
*/