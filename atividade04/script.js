class Pessoa {
    constructor(nome, email, dataNascimento, telefoneFixo, telefoneCelular) {
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.telefoneFixo = telefoneFixo;
        this.telefoneCelular = telefoneCelular;
    }
}

class Professor extends Pessoa {
    constructor(nome, email, dataNascimento, telefoneFixo, telefoneCelular, area, matriculaProfessor, lattes) {
        super(nome, email, dataNascimento, telefoneFixo, telefoneCelular);
        this.area = area;
        this.matriculaProfessor = matriculaProfessor;
        this.lattes = lattes;
    }
}

class Aluno extends Pessoa {
    constructor(nome, email, dataNascimento, telefoneFixo, telefoneCelular, curso, matriculaAluno) {
        super(nome, email, dataNascimento, telefoneFixo, telefoneCelular);
        this.curso = curso;
        this.matriculaAluno = matriculaAluno;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form');
    const professorCampo = document.getElementById('campoProfessor');
    const alunoCampo = document.getElementById('campoAluno');
    const resultadoForm = document.getElementById('Resultado');

    function atualizarCampos() {
        const tipoSelecionado = document.querySelector('input[name="tipo"]:checked').value;
        if (tipoSelecionado === 'Professor') {
            professorCampo.style.display = 'block';
            alunoCampo.style.display = 'none';
        } else {
            professorCampo.style.display = 'none';
            alunoCampo.style.display = 'block';
        }
    }

    form.addEventListener('reset', () => {
        resultadoForm.innerHTML = "";
        setTimeout(atualizarCampos, 0);
    });

    document.querySelectorAll('input[name="tipo"]').forEach((input) => {
        input.addEventListener('change', atualizarCampos);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validarFormulario()) {
            return; // Impede a execução do restante
        }

        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const nome = document.getElementById('nomeCompleto').value;
        const email = document.getElementById('email').value;
        const dataNascimento = document.getElementById('nascimento').value;
        const telefoneFixo = document.getElementById('telefoneFixo').value;
        const telefoneCelular = document.getElementById('telefoneCelular').value;

        let resultado = `
            <h2>Informações do cadastro:</h2>
            <p><strong>Tipo:</strong> ${tipo}</p>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
            <p><strong>Telefone Fixo:</strong> ${telefoneFixo}</p>
            <p><strong>Telefone Celular:</strong> ${telefoneCelular}</p>`;

        if (tipo === 'Professor') {
            const area = document.getElementById('area').value;
            const matriculaProfessor = document.getElementById('matriculaProfessor').value;
            const lattes = document.getElementById('lattes').value;
            resultado += `
                <p><strong>Área de Atuação:</strong> ${area}</p>
                <p><strong>Matrícula Professor:</strong> ${matriculaProfessor}</p>
                <p><strong>Lattes:</strong> ${lattes}</p>`;
        } else if (tipo === 'Aluno') {
            const curso = document.getElementById('curso').value;
            const matriculaAluno = document.getElementById('matriculaAluno').value;
            resultado += `
                <p><strong>Curso:</strong> ${curso}</p>
                <p><strong>Matrícula Aluno:</strong> ${matriculaAluno}</p>`;
        }

        resultadoForm.innerHTML = resultado;
    });

    function validarFormulario() {
        let valido = true;
        limparErros();

        
        const nome = document.getElementById('nomeCompleto').value;
        if (nome.length < 5) {
            document.getElementById('erroNomeCompleto').textContent = "Nome completo deve ter pelo menos 5 caracteres.";
            valido = false;
        }

        
        const email = document.getElementById('email').value;
        if (!/\S+@\S+\.\S+/.test(email)) {
            document.getElementById('erroEmail').textContent = "Email inválido.";
            valido = false;
        }

        const nascimento = document.getElementById('nascimento').value;
        if (nascimento === "") {
            document.getElementById('erroNascimento').textContent = "Data de nascimento é obrigatória.";
            valido = false;
        }

        
        const telefoneFixo = document.getElementById('telefoneFixo').value;
        if (!/^\(\d{2}\) \d{4}-\d{4}$/.test(telefoneFixo)) {
            document.getElementById('erroTelefoneFixo').textContent = "Telefone fixo inválido.";
            valido = false;
        }

       
        const telefoneCelular = document.getElementById('telefoneCelular').value;
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefoneCelular)) {
            document.getElementById('erroTelefoneCelular').textContent = "Telefone celular inválido.";
            valido = false;
        }

        
        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        if (tipo === 'Professor') {
            const area = document.getElementById('area').value;
            if (area.length < 3) {
                document.getElementById('erroArea').textContent = "Área de atuação deve ter pelo menos 3 caracteres.";
                valido = false;
            }

            const matriculaProfessor = document.getElementById('matriculaProfessor').value;
            if (matriculaProfessor.length < 5) {
                document.getElementById('erroMatriculaProfessor').textContent = "Matrícula do professor deve ter pelo menos 5 caracteres.";
                valido = false;
            }
        } else if (tipo === 'Aluno') {
            const curso = document.getElementById('curso').value;
            if (curso.length < 3) {
                document.getElementById('erroCurso').textContent = "Curso deve ter pelo menos 3 caracteres.";
                valido = false;
            }

            const matriculaAluno = document.getElementById('matriculaAluno').value;
            if (matriculaAluno.length < 5) {
                document.getElementById('erroMatriculaAluno').textContent = "Matrícula do aluno deve ter pelo menos 5 caracteres.";
                valido = false;
            }
        }

        return valido;
    }

    function limparErros() {
        document.getElementById('erroNomeCompleto').textContent = "";
        document.getElementById('erroEmail').textContent = "";
        document.getElementById('erroNascimento').textContent = "";
        document.getElementById('erroTelefoneFixo').textContent = "";
        document.getElementById('erroTelefoneCelular').textContent = "";
        document.getElementById('erroArea').textContent = "";
        document.getElementById('erroMatriculaProfessor').textContent = "";
        document.getElementById('erroCurso').textContent = "";
        document.getElementById('erroMatriculaAluno').textContent = "";
    }

    atualizarCampos(); 
});
