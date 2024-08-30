const Dados = [];

function atualizarLista(){
    Dados.sort((a,b) =>a.name.localeCompare(b.name));
    
    const Lista = document.getElementById("list");
    Lista.innerHTML = '';

    Dados.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.idade} anos`;
        Lista.appendChild(li);
    });
}

document.getElementById('Formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const ADDnome = document.getElementById('nome');
    const ADDidade = document.getElementById('idade');
    const nome = ADDnome.value.trim();
    const idade = parseInt(ADDidade.value.trim(), 10);

    if(nome && !isNaN(idade)){
        Dados.push({nome, idade});
        atualizarLista();

        ADDnome.value = '';
        ADDidade.value = '';


    }
});