//elementos
let adiciona = document.querySelector('.dropbtn')
let form = document.querySelector('.form-tarefa');
let main = document.querySelector('main');
let lista = document.getElementById('lista');

let counter = 0;
let userId = 0;
let tarefas = [];

/* Função para criar cards na página */
function gerarCard(id, titulo, situacao) {

  //Cria novo elemento list-item
  let itemLista = document.createElement('LI');

  //adiciona novo item de lista antes da posição 0, com os dados do animal conforme o contador
  itemLista.innerHTML = `<h3>ID: ${id}</h3>
                            <h3>Titulo: ${titulo}</h3>
                            <h3>Situação:  ${situacao}</h3>
                        `;
                                           
  /*Adiciona tarefas consumidas na lista  */
  lista.appendChild(itemLista);

}

//pegando informações
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => {
   
    json.map(data => {tarefas.push(data)});
    tarefas.forEach(tarefa => {gerarCard(tarefa.id, tarefa.title, tarefa.completed)});
  })


//-----------------------------------------------------------------------//
//Validações (Pedro)


// 1) Data de criação de tarefa (não é uma validação propriamente dita): Data deverá sempre ser a data presente

const dataHoje = new Date().toLocaleDateString('pt-BR');

const $dataCriacao = document.getElementById("data-criacao");

$dataCriacao.insertAdjacentText("afterbegin", dataHoje);


// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos

dataMin = new Date().toISOString().slice(0, 10);

const $dataLimite = document.getElementById("data-limite");

$dataLimite.setAttribute("min", dataMin);