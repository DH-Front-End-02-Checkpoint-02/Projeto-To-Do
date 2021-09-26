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
//Setando Datas (Pedro)


// 1) Data de criação de tarefa (não é uma validação propriamente dita): Data deverá sempre ser a data presente

const dataHoje = new Date();

const $dataCriacao = document.getElementById("data-criacao");

$dataCriacao.insertAdjacentText("afterbegin", dataHoje.toLocaleDateString('pt-BR'));


// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos

const arrData = [dataHoje.getFullYear(), dataHoje.getMonth()+1, dataHoje.getDate()];

function calcDataMin (arrData){
  if (arrData[1] < 10){
    arrData[1] = "0" + arrData[1];
  }
  const dataMin = arrData.reduce((acc, el) => acc+"-"+el);
  return dataMin;
}

const $dataLimite = document.getElementById("data-limite");

$dataLimite.setAttribute("min", calcDataMin (arrData));


