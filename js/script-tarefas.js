//Setando Datas (Pedro)

// 1) Data de criação de tarefa (não é uma validação propriamente dita): Data deverá sempre ser a data presente

const dataHoje = new Date().toLocaleDateString('pt-BR');

const $dataCriacao = document.getElementById("data-criacao");

$dataCriacao.insertAdjacentText("afterbegin", dataHoje);

// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos

const dataMin = new Date().toISOString().slice(0, 10);

const $dataLimite = document.getElementById("data-limite");

$dataLimite.setAttribute("min", dataMin);



// // Criação das Tarefas e do botão de mais
// let tarefas = document.getElementsByTagName("li");
// let i;
// for (i = 0; i < tarefas.length; i++) {
//   let span = document.createElement("span");
//   let btnDeMais = document.createTextNode("+");
//   span.className = "mais";
//   span.appendChild(btnDeMais);
//   tarefas[i].appendChild(span);
// }


// // Clicar no botão de mais para aparecer a descrição da tarefa
// let mais = document.getElementsByClassName("mais");
// let j;
// for (j = 0; j < mais.length; j++) {
//   mais[j].onclick = function() {
//     let div = this.parentElement;
//     div.style.display = "none";
//   }
// }

let tarefas = document.getElementsByTagName("li");
let i;

for (i = 0; i < tarefas.length; i++) {
    let span = document.createElement("span");
    let btnDeMais = document.createTextNode("+");
    span.className = "mais";
    span.appendChild(btnDeMais);
    tarefas[i].appendChild(span);
    tarefas[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let conteudoTarefa = this.nextElementSibling;
        if (conteudoTarefa.style.display === "block") {
            conteudoTarefa.style.display = "none";
        } else {
            conteudoTarefa.style.display = "block";
        }
    });
}

// Adicionar "checked" quando uma tarefa for finalizada

let checked = document.getElementById('checked');
list.addEventListener('click', function(ev) {
  if (ev.checked === true) {
    tarefas.style.cssText = `
    text-decoration: line-through`;
  }
}, false);

// Criação de uma nova tarefa quando clicamos no botão "Adicionar tarefa"

function novaTarefa() {
  let li = document.createElement("li");
  let nomeTarefa = document.getElementById("nome-tarefa").value;
  let criacao = document.createTextNode(nomeTarefa);
  let inputs = document.getElementByClass("inputs").value;
  let t = document.createTextNode(inputs);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Você deve incluir uma tarefa");
  } else {
    document.getElementById("tarefas").appendChild(li);
  }
  document.getElementById("inputs").value = "";

  let span = document.createElement("span");
  let btnDeMais = document.createTextNode("+");
  span.className = "close";
  span.appendChild(btnDeMais);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}



// //elementos
// let adiciona = document.querySelector('.dropbtn')
// let form = document.querySelector('.form-tarefa');
// let main = document.querySelector('main');
// let lista = document.getElementById('lista');

// let counter = 0;
// let userId = 0;
// let tarefas = [];

// /* Função para criar cards na página */
// function gerarCard(id, titulo, situacao) {

//   //Cria novo elemento list-item
//   let itemLista = document.createElement('LI');

//   //adiciona novo item de lista antes da posição 0, com os dados do animal conforme o contador
//   itemLista.innerHTML = `<h3>ID: ${id}</h3>
//                             <h3>Titulo: ${titulo}</h3>
//                             <h3>Situação:  ${situacao}</h3>
//                         `;
                                           
//   /*Adiciona tarefas consumidas na lista  */
//   lista.appendChild(itemLista);

// }

// //pegando informações
// fetch('https://jsonplaceholder.typicode.com/todos')
//   .then((response) => response.json())
//   .then((json) => {
   
//     json.map(data => {tarefas.push(data)});
//     tarefas.forEach(tarefa => {gerarCard(tarefa.id, tarefa.title, tarefa.completed)});
//   })
