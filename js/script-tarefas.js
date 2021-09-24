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