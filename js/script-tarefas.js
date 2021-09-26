//elementos
// let adiciona = document.querySelector('.dropbtn') // Onde pretende usar isso?
let form = document.querySelector('.form-tarefa');
let main = document.querySelector('main');
let lista = document.getElementById('lista');

let counter = 0;
let userId = 0;
let tarefas = [];

let sairbtn = document.querySelector('.dropbtn'); // Adicionei dropbtn nessa variável para sair.

let usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('#logado');

logado.innerHTML = `${usuarioLogado.nome}`;

// FIREWALL QUE IMPEDE A ENTRADA SEM TOKEN
if(localStorage.getItem('token') == null){
  setTimeout(() => {
    alert('Você precisa está logado para acessar essa pagina')
    window.location.href = 'http://127.0.0.1:5500/index.html'; 
  }, 5000);

};

// SAIR DA TO-DO LIST 
sairbtn.addEventListener('click',()=>{
  // localStorage.removeItem('token');
  window.location.href = 'http://127.0.0.1:5500/index.html';
});

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

const dataHoje = new Date().toLocaleDateString('pt-BR');

const $dataCriacao = document.getElementById("data-criacao");

$dataCriacao.insertAdjacentText("afterbegin", dataHoje);


// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos

const dataMin = new Date().toISOString().slice(0, 10);

const $dataLimite = document.getElementById("data-limite");

$dataLimite.setAttribute("min", dataMin);