const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const rgInput = document.querySelector('#rg');
const cpfInput = document.querySelector('#cpf');
const paisNascimentoInput = document.querySelector('#paisNascimento');
const estadoNascimentoInput = document.querySelector('#estadoNascimento');
const cidadeNascimentoInput = document.querySelector('#cidadeNascimento');
const paisEstrangeiroInput = document.querySelector('#paisEstrangeiro');
const dataNascimentoInput = document.querySelector('#dataNascimento');
const resideBrasilInput = document.querySelector('#resideBrasil')
const cepInput = document.querySelector('#cep');
const logradouroInput = document.querySelector('#logradouro');
const numeroInput = document.querySelector('#numero');
const bairroInput = document.querySelector('#bairro');
const cidadeInput = document.querySelector('#cidade');
const estadoInput = document.querySelector('#estado');
const emailInput = document.querySelector('#email')
const telefoneInput = document.querySelector('#telefone');
const usaMedicamentoInput = document.querySelector('#usaMedicamento')
const periodoMedicamentoInput = document.querySelector('#periodoMedicamento')
const receitaMedicaInput = document.querySelector('#receitaMedica')
const docIdentificacaoInput = document.querySelector("#docIdentificacao")
const termosDeTesteCheckBox = document.querySelector("#concordo")

// variaveis para preenchimento do campo "Reside no Brasil" aparecendo os campos de endereço a serem preenchidos utilizando a API ViaCEP
const resideBrasilSelect = document.getElementById('resideBrasil');
const enderecoFields = document.getElementById('enderecoFields');
const preencherCep = document.getElementById('cep');
const preencherLogradouro = document.getElementById('logradouro');
const preencherNumero = document.getElementById('numero');
const preencherBairro = document.getElementById('bairro');
const preencherCidade = document.getElementById('cidade');
const preencherEstado = document.getElementById('estado');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const showError = (fieldName) => {
        alert(`O campo "${fieldName}" é obrigatório e precisa ser preenchido`);
    };

    if (nameInput.value === "") {
        showError("Nome");
        return;
    }

    if (rgInput.value === "") {
        showError("RG");
        return;
    }

    if (cpfInput.value === "") {
        showError("CPF");
        return;
    }

    if (paisNascimentoInput.value === "") {
        showError("Pais de nascimento");
        return;
    }

    if (paisNascimentoInput.value === "Brasil") {
        if (estadoNascimentoInput.value === "") {
            showError("Estado de nascimento");
            return;
        }
        if (cidadeNascimentoInput.value === "") {
            showError("Cidade de nascimento");
            return;
        }
        } else if (paisNascimentoInput.value === "Estrangeiro" && paisEstrangeiroInput.value === "") {
        showError("Nome do país de nascimento");
        return;
        }
    
    if (dataNascimentoInput.value === "") {
        showError("Data de Nascimento");
        return;
    }

    if (resideBrasilInput.value === "") {
        showError("Reside no Brasil");
        return;
    } else if (resideBrasilInput.value === "sim") {
        if (cepInput.value === "") {
            showError("CEP");
            return;
        }
        if (logradouroInput.value === "") {
            showError("Logradouro");
            return;
        }
        if (numeroInput.value === "") {
            showError("Número");
            return;
        }
        if (bairroInput.value === "") {
            showError("Bairro");
            return;
        }
        if (cidadeInput.value === "") {
            showError("Cidade");
            return;
        }
        if (estadoInput.value === "") {
            showError("Estado");
            return;
        }
    }
    
    if (emailInput.value === "" || !emailValido(emailInput.value)){
        showError("Email");
        return;
    }

    if (telefoneInput.value === "") {
        showError("Telefone");
        return;
    }

    //verificação das checkbox de medicamentos
    const usaMedicamentoValue = usaMedicamentoInput.value;
    if (usaMedicamentoValue === "sim") {
        if (periodoMedicamentoInput.value === "") {
            showError("Período de Medicamento");
            return;
        }
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"].medicamento');
        let peloMenosUmMedicamentoMarcado = false;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                peloMenosUmMedicamentoMarcado = true;
            }
        });
        
        if (!peloMenosUmMedicamentoMarcado) {
            alert('Por favor, selecione pelo menos um medicamento');
            return;
        }

        // Verificar se há um arquivo de receita médica anexado
        if (!receitaMedicaInput.files.length) {
            showError("Receita Médica");
            return;
        }
    } else if (usaMedicamentoValue === "não") {
        // Se a opção for "não", ocultar os campos de medicamentos
        informacoesMedicasFields.classList.add('hidden');
        receitaMedicaAnexo.classList.add('hidden');
    }



    if (!docIdentificacaoInput.files.length) {
        showError("Documento de Identidade")
        return;
    }

    if (termosDeTesteCheckBox.checked === false){
        showError("Termo de Teste")
        return;
    }

    //após verificar todos os campos o form é enviado
    form.submit(alert(`Formulário enviado com sucesso`));
    
})


// impede o usuário de digitar carecteres no campo RG
rgInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});

// realiza a mascara de CPF impedindo o usuário de digitar carecteres no campo
cpfInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
    this.value = this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
});

function emailValido(email) {

    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    )

    if (emailRegex.test(email)) {
        return true;
    }

    return false;
}

telefoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value.length === 10) {
        this.value = this.value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } else if (this.value.length === 11) {
        this.value = this.value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
});

function mostrarOcultarCamposEndereco() {
    const paisNascimento = paisNascimentoInput.value;
    const resideBrasil = resideBrasilSelect.value;

    if (paisNascimento === 'Brasil' && resideBrasil === 'sim') {
        enderecoFields.classList.remove('hidden');
    } else {
        enderecoFields.classList.add('hidden');
        clearAddressFields();
    }
}

// Adiciona um evento de mudança ao campo resideBrasil
resideBrasilSelect.addEventListener('change', mostrarOcultarCamposEndereco);

// Adiciona um evento de mudança ao campo paisNascimento
paisNascimentoInput.addEventListener('change', mostrarOcultarCamposEndereco);

//validação dos campos paisNascimento, estadoNascimento, cidadeNascimento.
function carregarEstados() {
    const paisSelecionado = document.getElementById("paisNascimento").value;
    const estadoDiv = document.querySelector("#estadoNascimento").parentElement;
    const cidadeDiv = document.querySelector("#cidadeNascimento").parentElement;
    const paisEstrangeiroDiv = document.querySelector("#paisEstrangeiroDiv");

    if (paisSelecionado === "Brasil") {
        // Mostrar os campos e os títulos
        document.getElementById("estadoNascimento").disabled = false;
        document.getElementById("cidadeNascimento").disabled = false;
        estadoDiv.classList.remove('hidden');
        cidadeDiv.classList.remove('hidden');
        enderecoFields.classList.remove('hidden');
        paisEstrangeiroDiv.classList.add('hidden');
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => response.json())
            .then((data) => preencherEstados(data))
            .catch((error) => console.error("Erro ao carregar estados:", error));
    } else if (paisSelecionado === "Estrangeiro") {
        // Mostrar campo de país estrangeiro e ocultar outros campos
        document.getElementById("estadoNascimento").disabled = true;
        document.getElementById("cidadeNascimento").disabled = true;
        estadoDiv.classList.add('hidden');
        cidadeDiv.classList.add('hidden');
        paisEstrangeiroDiv.classList.remove('hidden');
        enderecoFields.classList.add('hidden');
    } else {
        // Ocultar os campos e os títulos
        document.getElementById("estadoNascimento").disabled = true;
        document.getElementById("cidadeNascimento").disabled = true;
        estadoDiv.classList.add('hidden');
        cidadeDiv.classList.add('hidden');
        paisEstrangeiroDiv.classList.add('hidden');
        document.getElementById("estadoNascimento").innerHTML = "<option value=''>Selecione o estado de nascimento</option>";
        document.getElementById("cidadeNascimento").innerHTML = "<option value=''>Selecione a cidade de nascimento</option>";
        enderecoFields.classList.add('hidden');
    }
}

function preencherEstados(estados) {
    const estadoSelect = document.getElementById("estadoNascimento");
    estadoSelect.disabled = false;
    estadoSelect.innerHTML = "<option value=''>Selecione o estado</option>";

    estados.forEach((estado) => {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
    });
}

function carregarCidades() {
    const estadoSelecionado = document.getElementById("estadoNascimento").value;

    if (estadoSelecionado) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then((response) => response.json())
            .then((data) => preencherCidades(data))
            .catch((error) => console.error("Erro ao carregar cidades:", error));
    } else {
        // Caso o estado selecionado seja vazio, desabilita o menu de cidades
        document.getElementById("cidade").disabled = true;
        document.getElementById("cidade").innerHTML = "<option value=''>Selecione a cidade</option>";
    }
}

function preencherCidades(cidades) {
    const cidadeSelect = document.getElementById("cidadeNascimento");
    cidadeSelect.disabled = false;
    const cidadeSelecionada = cidadeSelect.value;
    cidadeSelect.innerHTML = "<option value=''>Selecione a cidade</option>";

    cidades.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.nome;
        option.textContent = cidade.nome;

        // Definir a opção selecionada se for a mesma que estava selecionada anteriormente
        if (cidade.nome === cidadeSelecionada) {
            option.selected = true;
        }

        cidadeSelect.appendChild(option);
    });
}

resideBrasilSelect.addEventListener('change', () => {
    if (resideBrasilSelect.value === 'sim') {
        enderecoFields.classList.remove('hidden');
    } else {
        enderecoFields.classList.add('hidden');
        ocultarCamposDeEndereco();
    }
});

function ocultarCamposDeEndereco() {
    document.getElementById('cep').value = '';
    document.getElementById('logradouro').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';

}

resideBrasilSelect.addEventListener('change', () => {
    if (resideBrasilSelect.value === 'sim') {
        enderecoFields.classList.remove('hidden');
    } else {
        enderecoFields.classList.add('hidden');
        clearAddressFields();
    }
});

preencherCep.addEventListener('blur', async () => {
    const cepValue = preencherCep.value.replace(/\D/g, '');
    if (cepValue.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
            const data = await response.json();

            if (!data.erro) {
                preencherLogradouro.value = data.logradouro;
                preencherBairro.value = data.bairro;
                preencherCidade.value = data.localidade;
                preencherEstado.value = data.uf;
            } else {
                clearAddressFields();
                alert('CEP não encontrado. Verifique o CEP digitado.');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    }
});

function clearAddressFields() {
    logradouroInput.value = '';
    numeroInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    estadoInput.value = '';
}

function ocultarCamposMedicamentos() {
    document.getElementById('agomelatina').checked = false;
    document.getElementById('bezodiazepina').checked = false;
    document.getElementById('bupropiona').checked = false;
    document.getElementById('buspirona').checked = false;
    document.getElementById('citalopram').checked = false;
    document.getElementById('duloxetina').checked = false;
    document.getElementById('escitalopram').checked = false;
    document.getElementById('fluoxetina').checked = false;
    document.getElementById('periodoMedicamento').value = '';
    document.getElementById('receitaMedica').value = '';
}

usaMedicamento.addEventListener('change', () => {
    if (usaMedicamento.value === 'sim') {
        // Mostrar os campos de informações médicas
        informacoesMedicasFields.classList.remove('hidden');
        receitaMedicaAnexo.classList.remove('hidden');
    } else {
        // Esconder os campos de informações médicas e limpar os valores
        informacoesMedicasFields.classList.add('hidden');
        receitaMedicaAnexo.classList.add('hidden');
        ocultarCamposMedicamentos();
    }
});

receitaMedicaInput.addEventListener("change", function (){
    const extencoesPermitidas = ["pdf", "png", "jpeg", "jpg"];
    const nomeArquivoReceitaMedica = receitaMedicaInput.value.toLowerCase();
    const extencaoArquivo = nomeArquivoReceitaMedica.split(".").pop();

    if(!extencoesPermitidas.includes(extencaoArquivo)) {
        alert("Por favor, selecione um arquivo PDF, PNG ou JPEG/JPG");
        receitaMedicaInput.value = "";
        return;
    }
})

docIdentificacaoInput.addEventListener("change", function(){
    const extencoesPermitidas = ["pdf", "png", "jpeg", "jpg"];
    const nomeArquivoDocIdentificacao = docIdentificacaoInput.value.toLowerCase();
    const extencaoArquivo = nomeArquivoDocIdentificacao.split(".").pop();

    if (!extencoesPermitidas.includes(extencaoArquivo)) {
        alert("Por favor, selecione um arquivo PDF, PNG ou JPEG/JPG");
        docIdentificacaoInput.value = "";
        return;
    }
})

