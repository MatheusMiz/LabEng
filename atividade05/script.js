
class Tarefa {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = 'pendente'; 
    }

    concluir() {
        this.status = 'concluída';
    }

    detalhes() {
        return `Nome: ${this.nome}\nDescrição: ${this.descricao}\nStatus: ${this.status}`;
    }
}


class GerenciadorDeTarefas {
    #tarefas = [];

    adicionarTarefa(tarefa) {
        this.#tarefas.push(tarefa);
    }

    listarTarefas() {
        return this.#tarefas;
    }

    marcarComoConcluida(index) {
        if (this.#tarefas[index]) {
            this.#tarefas[index].concluir();
        }
    }

    removerTarefa(index) {
        if (this.#tarefas[index]) {
            this.#tarefas.splice(index, 1);
        }
    }

    visualizarDetalhes(index) {
        if (this.#tarefas[index]) {
            alert(this.#tarefas[index].detalhes());
        }
    }
}


const gerenciador = new GerenciadorDeTarefas();


function atualizarListaTarefas() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = ''; 
    gerenciador.listarTarefas().forEach((tarefa, index) => {
        const item = document.createElement('div');
        item.classList.add('tarefa');

        const nome = document.createElement('strong');
        nome.textContent = tarefa.nome;

       
        if (tarefa.status === 'concluída') {
            nome.classList.add('concluida');
        }

        const descricao = document.createElement('div');
        descricao.classList.add('descricao');
        descricao.textContent = tarefa.descricao;

       
        const btnDetalhes = document.createElement('button');
        btnDetalhes.textContent = 'Visualizar Detalhes';
        btnDetalhes.classList.add('btn-detalhes');
        btnDetalhes.onclick = () => gerenciador.visualizarDetalhes(index);

        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir Tarefa';
        btnConcluir.classList.add('btn-concluir');
        btnConcluir.onclick = () => {
            gerenciador.marcarComoConcluida(index);
            atualizarListaTarefas(); 
        };

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover Tarefa';
        btnRemover.classList.add('btn-remover');
        btnRemover.onclick = () => {
            gerenciador.removerTarefa(index);
            atualizarListaTarefas(); 
        };

       
        item.appendChild(nome);
        item.appendChild(descricao);
        item.appendChild(btnDetalhes);
        item.appendChild(btnConcluir);
        item.appendChild(btnRemover);
        lista.appendChild(item);
    });
}


function adicionarTarefa() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;

    if (nome && descricao) {
        const novaTarefa = new Tarefa(nome, descricao);
        gerenciador.adicionarTarefa(novaTarefa);
        atualizarListaTarefas(); 
    }

   
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
}


document.getElementById('formTarefa').addEventListener('submit', (event) => {
    event.preventDefault(); 
    adicionarTarefa();
});


atualizarListaTarefas();
