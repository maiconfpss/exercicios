/* Operações de comparação


        > maior que
        < menor que
       == igual
       >= maior ou igual
       <= menor ou igual
       != diferente
       = atribuição

    Operadores Lógicos:
       && (E) -> As duas condições devem ser verdadeiras
       || (OU) -> Pelo menos uma condição deve ser verdadeira
       !  (NÃO) -> Inverte o valor (negação)

*/

const notaAluno = 10;

const notaMinima = 5;

if (notaAluno >= notaMinima) {
    console.log("Parabens, Aprovado");

    /* 
    
    aqui funciona assim como ta >= funciona com 5 e mair pra aprovaçao e se fosse > seria reprovado,
    pq esse sinal é de maior entao maior que 5 ou seja msm o aluno tirando 5 ele iria ser aprovado
    pq tem que ser maior como é >= que é maior ou igual passa com 5.

    */

    if (notaAluno >= 8) {
        console.log("Parabens, Aprovado com Distincao");
    }

    if (notaAluno == 10) {
        console.log("Parabens, Aprovado como aluno Destaque");
    }

} else {
    console.log("Reprovado :(");
}

/*
    Onde isso é usado em sites reais? (O "Cérebro" do site)
    
    1. Login: IF (senha == correta) -> Entra no site, ELSE -> Mostra "Senha incorreta".
    2. YouTube: IF (usuarioPremium == true) -> Sem anúncios, ELSE -> Mostra anúncios.
    3. Jogos: IF (vidaPersonagem <= 0) -> Game Over.
*/

const userpassword = "123456"; /* Com = é atribuição  */

/* Senha certa salva */

const password = "123456";

/* Senha errada que o usuario digitou */

if (userpassword == password) {  /* com == igual se for igual confirma */
    console.log("Conectado com sucesso");

    /* UserPassword é a senha salva no banco de dados, e Password é a senha que o usuario digitou
    se as duas forem iguais ele entra no site ai usar o if se for diferente ta errado ai usar o else
        ai if entra conectado com sucesso 
        e else mostra senha incorreta */

} else {
    console.log("Senha incorreta");
}