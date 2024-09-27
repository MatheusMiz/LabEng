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
            document.getElementById("area").setAttribute('required', 'required');
            document.getElementById("matriculaProfessor").setAttribute('required', 'required');
            document.getElementById("lattes").setAttribute('required', 'required');
            document.getElementById("curso").removeAttribute('required');
            document.getElementById("matriculaAluno").removeAttribute('required');
            professorCampo.style.display = 'block';
            alunoCampo.style.display = 'none';
        } else {
            document.getElementById("area").removeAttribute('required');
            document.getElementById("matriculaProfessor").removeAttribute('required');
            document.getElementById("lattes").removeAttribute('required');
            document.getElementById("curso").setAttribute('required', 'required');
            document.getElementById("matriculaAluno").setAttribute('required', 'required');
            professorCampo.style.display = 'none';
            alunoCampo.style.display = 'block';
        }
    }

    form.addEventListener('reset', () => {
        limparErros();
        resultadoForm.innerHTML = "";
        setTimeout(atualizarCampos, 0);
    });

    document.querySelectorAll('input[name="tipo"]').forEach(radio => {
        radio.addEventListener('change', atualizarCampos);
    });

    function validarCampo(id, regex, erroMsg) {
        const valor = document.getElementById(id).value.trim();
        const erroElemento = document.getElementById(`erro${id.charAt(0).toUpperCase() + id.slice(1)}`);
        if (!regex.test(valor)) {
            erroElemento.textContent = erroMsg;
            return false;
        } else {
            erroElemento.textContent = '';
            return true;
        }
    }

    function validarFormulario() {
        const validacoes = [
            validarCampo('nomeCompleto', /^([a-zA-Z]+(?:\s+[a-zA-Z]+)+)$/, 'Nome deve conter pelo menos um nome e um sobrenome.'),
            validarCampo('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido.'),
            validarCampo('nascimento', /^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento inválida.'),
            validarCampo('telefoneFixo', /\(\d{2}\) \d{4}-\d{4}/, 'Telefone Fixo inválido.'),
            validarCampo('telefoneCelular', /\(\d{2}\) \d{5}-\d{4}/, 'Telefone Celular inválido.'),
            validarArea(),
            validarRegistroProfessor(),
            validarCurso(),
            validarRegistroAluno()
        ];
        return validacoes.every(Boolean);
    }

    function validarArea() {
        const area = document.getElementById('area').value;
        const erroArea = document.getElementById('erroArea');
        if (document.querySelector('input[name="tipo"]:checked').value === 'Professor' && !area) {
            erroArea.textContent = 'A área é obrigatória para professores.';
            return false;
        } else {
            erroArea.textContent = '';
            return true;
        }
    }

    function validarRegistroProfessor() {
        return validarCampo('matriculaProfessor', /^\d{5}$/, 'Matrícula do professor deve conter 5 dígitos.');
    }

    function validarCurso() {
        const curso = document.getElementById('curso').value;
        const erroCurso = document.getElementById('erroCurso');
        if (document.querySelector('input[name="tipo"]:checked').value === 'Aluno' && !curso) {
            erroCurso.textContent = 'Curso é obrigatório para alunos.';
            return false;
        } else {
            erroCurso.textContent = '';
            return true;
        }
    }

    function validarRegistroAluno() {
        return validarCampo('matriculaAluno', /^\d{10}$/, 'Matrícula do aluno deve conter 10 dígitos.');
    }

    function formatarTelefone(input) {
        input.addEventListener('input', () => {
            let valor = input.value.replace(/\D/g, '');
            if (input.id === 'telefoneFixo') {
                if (valor.length <= 10) {
                    valor = valor.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
                }
            } else if (input.id === 'telefoneCelular') {
                if (valor.length <= 11) {
                    valor = valor.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
                }
            }
            input.value = valor;
        });
    }

    formatarTelefone(document.getElementById('telefoneFixo'));
    formatarTelefone(document.getElementById('telefoneCelular'));

    function limparErros() {
        const mensagensErro = document.querySelectorAll('.mensagem-erro');
        mensagensErro.forEach(el => el.textContent = '');
    }

    form.addEventListener('submit', (event) => {
        if (!validarFormulario()) {
            event.preventDefault(); // Impede o envio do formulário se a validação falhar
        }
    });

    form.addEventListener('blur', (event) => {
        if (event.target.matches('input')) {
            switch (event.target.id) {
                case 'nome':
                    validarCampo();
                    break;
                case 'email':
                    validarCampo();
                    break;
                case 'dataNascimento':
                    validarCampo();
                    break;
                case 'telefoneFixo':
                    validarCampo();
                    break;
                case 'telefoneCelular':
                    validarCampo();
                    break;
                case 'area':
                    validarArea();
                    break;
                case 'matriculaProfessor':
                    validarRegistroProfessor();
                    break;
                case 'curso':
                    validarCurso();
                    break;
                case 'matriculaAluno':
                    validarRegistroAluno();
                    break;
            }
        }
    }, true);


    function salvarCadastro(pessoa) {

        let typePessoa = '';
        if (pessoa instanceof Professor) {
            typePessoa = 'Professor';
        } else if (pessoa instanceof Aluno) {
            typePessoa = 'Aluno';
        }


        let resultado = `<h2>Dados:</h2>
                         <p><strong>Tipo:</strong> ${typePessoa}</p>
                         <p><strong>Nome:</strong> ${pessoa.nome}</p>
                         <p><strong>Email:</strong> ${pessoa.email}</p>
                         <p><strong>Data de Nascimento:</strong> ${pessoa.dataNascimento}</p>
                         <p><strong>Telefone Fixo:</strong> ${pessoa.telefoneFixo}</p>
                         <p><strong>Telefone Celular:</strong> ${pessoa.telefoneCelular}</p>`;

        if (pessoa instanceof Professor) {
            resultado += `<p><strong>Área de Atuação:</strong> ${pessoa.area}</p>
                          <p><strong>Matrícula Professor:</strong> ${pessoa.matriculaProfessor}</p>
                          <p><strong>Lattes:</strong> ${pessoa.lattes}</p>`;
        } else if (pessoa instanceof Aluno) {
            const curso = document.getElementById('curso').value;
            const matriculaAluno = document.getElementById('matriculaAluno').value;
            resultado += `<p><strong>Curso:</strong> ${pessoa.curso}</p>
                          <p><strong>Matrícula Aluno:</strong> ${pessoa.matriculaAluno}</p>`;
        }

        document.getElementById('Resultado').innerHTML = resultado;
    };
    function Obj(){
        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const nome = document.getElementById('nomeCompleto').value;
        const email = document.getElementById('email').value;
        const dataNascimento = document.getElementById('nascimento').value;
        const telefoneFixo = document.getElementById('telefoneFixo').value;
        const telefoneCelular = document.getElementById('telefoneCelular').value;

        if (tipo === 'Professor'){
            const area = document.getElementById('area').value;
            const matriculaProfessor = document.getElementById('matriculaProfessor').value;
            const lattes = document.getElementById('lattes').value;
            return new Professor(nome, email, dataNascimento, telefoneFixo, telefoneCelular, area, matriculaProfessor, lattes);
        } else if (tipo === 'Aluno') {
            const curso = document.getElementById('curso').value;
            const matriculaAluno = document.getElementById('matriculaAluno').value;
            return new Aluno(nome, email, dataNascimento, telefoneFixo, telefoneCelular, curso, matriculaAluno);
        }
    }
    document.getElementById('Form').addEventListener('submit', (event) => {
        salvarCadastro(Obj());
    });
    atualizarCampos();
});
