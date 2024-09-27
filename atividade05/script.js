// Classe Tarefa
class Tarefa {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = 'pendente'; // status pode ser 'pendente' ou 'concluída'
    }

    concluir() {
        this.status = 'concluída';
    }

    detalhes() {
        return `Nome: ${this.nome}\nDescrição: ${this.descricao}\nStatus: ${this.status}`;
    }
}

// Classe GerenciadorDeTarefas
class GerenciadorDeTarefas {
    #tarefas = []; // Array privado para armazenar as tarefas

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

// Instância do gerenciador de tarefas
const gerenciador = new GerenciadorDeTarefas();

// Função para atualizar a lista de tarefas no DOM
function atualizarListaTarefas() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = ''; // Limpa a lista antes de atualizar
    gerenciador.listarTarefas().forEach((tarefa, index) => {
        const item = document.createElement('div');
        item.classList.add('tarefa');

        const nome = document.createElement('strong');
        nome.textContent = tarefa.nome;

        // Adiciona classe para tarefa concluída
        if (tarefa.status === 'concluída') {
            nome.classList.add('concluida');
        }

        const descricao = document.createElement('div');
        descricao.classList.add('descricao');
        descricao.textContent = tarefa.descricao;

        // Botões
        const btnDetalhes = document.createElement('button');
        btnDetalhes.textContent = 'Visualizar Detalhes';
        btnDetalhes.classList.add('btn-detalhes');
        btnDetalhes.onclick = () => gerenciador.visualizarDetalhes(index);

        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir Tarefa';
        btnConcluir.classList.add('btn-concluir');
        btnConcluir.onclick = () => {
            gerenciador.marcarComoConcluida(index);
            atualizarListaTarefas(); // Atualiza a lista após marcar como concluída
        };

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover Tarefa';
        btnRemover.classList.add('btn-remover');
        btnRemover.onclick = () => {
            gerenciador.removerTarefa(index);
            atualizarListaTarefas(); // Atualiza a lista após remover
        };

        // Adiciona os elementos à tarefa
        item.appendChild(nome);
        item.appendChild(descricao);
        item.appendChild(btnDetalhes);
        item.appendChild(btnConcluir);
        item.appendChild(btnRemover);
        lista.appendChild(item);
    });
}

// Função para adicionar tarefa
function adicionarTarefa() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;

    if (nome && descricao) {
        const novaTarefa = new Tarefa(nome, descricao);
        gerenciador.adicionarTarefa(novaTarefa);
        atualizarListaTarefas(); // Atualiza a lista após adicionar
    }

    // Limpa os campos do formulário
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
}

// Event listener para o formulário
document.getElementById('formTarefa').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário
    adicionarTarefa();
});

// Inicializa a lista de tarefas ao carregar a página
atualizarListaTarefas();
