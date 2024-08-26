//exibir data atual
function DataAtual(){
    const hoje = new Date();
    const DiaSemana = ["Domigo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const Meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const DiaDaSemana = DiaSemana[hoje.getDay()];
    const dia = hoje.getDate();
    const mes = Meses[hoje.getMonth()];
    const ano = hoje.getFullYear();
    const Data= `${DiaDaSemana}, ${dia} de ${mes} de ${ano}`;
    document.getElementById('DataAtual').textContent = Data;
}
window.onload = DataAtual;

//  Verificar se o texto é um palindromo

function Palindromo(){
    const text = document.getElementById('Texto').value;

    const FormatarTexto = str => {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    }
    
    const textoLimpo = FormatarTexto(text);

    const InverterTexto = textoLimpo.split('').reverse().join('')
    if(textoLimpo == InverterTexto){
        alert("O texto é um Palíndromo")
    }
    else{
        alert("O texto não é um Palíndromo")
    }
    
}

//Exibir Horario atual
function Relogio(){
    const agora = new Date();
    
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    HoraAtual = `${horas}:${minutos}:${segundos}`;
    document.getElementById('relogio').textContent = HoraAtual;
}
setInterval(Relogio, 1000);
Relogio();