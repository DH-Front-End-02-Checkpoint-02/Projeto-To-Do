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

/* Adiciona tarefas da API em ordem invertida - desabilitado */                        
/*   lista.insertBefore(itemLista, lista.childNodes[0]); */

  /*Adiciona tarefas consumidas na lista  */
  lista.appendChild(itemLista);

  //Incrementa valor 1, para constar que um novo card foi adicionado - desabilitado por enquanto
  /* counter += 1; */
}

//pegando informações
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => {
    /* console.log(json) */
    
    json.map(data => {tarefas.push(data)});
    /* console.log("Tarefas pre armazenadas: " + tarefas) */
    tarefas.forEach(tarefa => {gerarCard(tarefa.id, tarefa.title, tarefa.completed)});
  })
/* 
console.log("Tarefas pre armazenadas: " + tarefas)
tarefas.forEach(tarefa => {gerarCard(tarefa.id, tarefa.title, tarefa.completed)}); */


//Adiciona tarefa na API ao clicar
/* form.addEventListener('submit', e => {
  e.preventDefault(); */

  /* Ajustando data inicial do calentádio */
  /* let today = new Date()

  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate(); */

  /* Adiciona 0 na frente de numeros menores que 10*/
  /* day < 10 ? day = '0' + day : null;
  month < 10 ? month = '0' + month : null;
 */
  /* Definindo valor do input do calendario para a data atual */
  /* let date = `${day}/${month}/${year}`;
  let descricao = document.getElementById("descricao").value

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      taskId: userId + 1,
      title: date,
      body: descricao,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => response.json())
    .then((json) => {
      gerarCard()
      console.log(json)
    })
  userId++; */
/* }); */