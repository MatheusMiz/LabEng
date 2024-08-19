//Função Para Verificar se o numero é Par ou Impar
function ParImpar(){
    let numero = prompt("Digite um numero", "")
    if (isNaN(numero) || numero <=0 ){
        alert("Valor Inválido, insira um número inteiro positivo")
    }
    else{
        if(numero % 2 == 0){
            alert("Numero é Par")
        }
        else{
            alert("O número é Impar")
        }
    }
}
function Primo(){
    let numero;
    let total = 0;
    while(isNaN(numero)){
        numero = prompt("Insira um número", "")
    }
    for(let i = 1; i<=numero; i++){
        if (numero % i == 0){
            total ++;
        }
    }
    if (total == 2){
        alert("O número "+ numero+ " é Primo")
    }
    else{
        alert("Não é primo")
        }
    
}
function fatorial(){
    let numero;
    let fatorial = 1;
    while(isNaN(numero)){
        numero = prompt("Insira um número válido", "")
    }
    let i = numero
    while(i > 0){
        fatorial = fatorial * i
        i = i - 1
    }
    alert("O fatorial de " +  numero + " é igual a " + fatorial)
}
function TipoDado(){
    let dado = prompt("Digite um dado: ", "")
    if(confirm("Deseja verificar o tipo do dado ?")){
        let tipo = typeof dado;
        document.body.innerHTML += `<p>O tipo do dado é :${tipo} </p>`
    }
    else{
        document.body.innerHTML += "<p>Obrigado por visitar a página</p>"
    }
}