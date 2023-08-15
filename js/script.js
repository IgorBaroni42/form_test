const form = document.querySelector('#form');
const name = document.querySelector('#name');
const rg = document.querySelector('#rg');
const cpf = document.querySelector('#cpf');

const resideBrasilSelect = document.getElementById('resideBrasil');
const enderecoFields = document.getElementById('enderecoFields')

resideBrasilSelect.addEventListener('change', () =>{
    if(resideBrasilSelect.value === 'sim') {
        enderecoFields.classList.remove('hidden');
    } else{
        enderecoFields.classList.add('hidden');
        clearAddressFields();
    }
});

function clearAddressFields() {
    document.getElementById('cep').value = '';
    document.getElementById('logradouro').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//validação dos campos paisNascimento, estadoNascimento, cidadeNascimento.
function carregarEstados() {
    const paisSelecionado = document.getElementById("paisNascimento").value;
    const estadoDiv = document.querySelector("#estadoNascimento").parentElement;
    const cidadeDiv = document.querySelector("#cidadeNascimento").parentElement;
  
    if (paisSelecionado === "Brasil") {
        // Mostrar os campos e os títulos
        document.getElementById("estadoNascimento").disabled = false;
        document.getElementById("cidadeNascimento").disabled = false;
        estadoDiv.classList.remove('hidden');
        cidadeDiv.classList.remove('hidden');
        enderecoFields.classList.remove('hidden');
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => response.json())
            .then((data) => preencherEstados(data))
            .catch((error) => console.error("Erro ao carregar estados:", error));
    } else {
        // Ocultar os campos e os títulos
        document.getElementById("estadoNascimento").disabled = true;
        document.getElementById("cidadeNascimento").disabled = true;
        estadoDiv.classList.add('hidden');
        cidadeDiv.classList.add('hidden');
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








