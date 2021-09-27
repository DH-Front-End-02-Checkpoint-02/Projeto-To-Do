//elementos
// let adiciona = document.querySelector('.dropbtn') // Onde pretende usar isso?
let form = document.querySelector('.form-tarefa');
let main = document.querySelector('main');
let lista = document.getElementById('lista');

let counter = 0;
let userId = 0;
let tarefas = [];

let sairbtn = document.getElementById('btsair'); // Adicionei dropbtn nessa variável para sair.

let usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('#logado');

logado.innerHTML = `${usuarioLogado.nome}`;

// COMENTE ESSE TRECHO CASO NÃO CONSIGA PERMANECER NA PAGINA SEM ESTAR LOGADO LINHA 22 A 27

// FIREWALL QUE IMPEDE A ENTRADA SEM TOKEN
if(localStorage.getItem('token') == null){
  setTimeout(() => {
    alert('Você precisa está logado para acessar essa pagina')
    window.location.href = 'http://127.0.0.1:5500/index.html'; 
  }, 5000);
};

// SAIR DA TO-DO LIST 
sairbtn.addEventListener('click',()=>{
  localStorage.removeItem('token');
  window.location.href = 'http://127.0.0.1:5500/index.html';
});


// /* Função para criar cards na página */
// function gerarCard(id, tarefa) {

//   //Cria novo elemento list-item
//   let itemLista = document.createElement('li');

//   //adiciona novo item de lista antes da posição 0, com os dados do animal conforme o contador
//   itemLista.innerHTML = `
//     <h3>ID: ${id}</h3>
//     <div>Data de criação: ${$dataCriacao.textContent}</div>
//     <div>Data limite: ${$dataCriacao.textContent}</div>
//     <h3>Tarefa: ${tarefa}</h3>
//     `;

//     // <h3>Situação:  ${situacao}</h3>
//     //Situação foi comentada, pois não deve ser exibida ao usuário. Referência apenas para usuário

//     //Data criação. Ele pegará a data da criação. Todavia, estamos criando sempre "hoje", pois os cards do API são criados quando roda o script
                                           
//   /*Adiciona tarefas consumidas na lista  */
//   lista.appendChild(itemLista);

// }

// //buscar limitar o número de cards de API apresentados?

// //pegando informações
// fetch('https://jsonplaceholder.typicode.com/todos')
//   .then((response) => response.json())
//   .then((json) => {
    
//     json.map(data => {tarefas.push(data)});
//     tarefas.forEach(tarefa => {gerarCard(tarefa.id, tarefa.title, tarefa.completed)});
//   })


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

$dataLimite.setAttribute("min", calcDataMin(arrData));


//----------------------------------------------------------------//
//func para capturar data-limite escolhida pelo usuário

let cardDataLimite;

$dataLimite.onchange = () => {
  let diaLimite = $dataLimite.value.slice(8,10);
  let mesLimite =$dataLimite.value.slice(5,7);
  let anoLimite =$dataLimite.value.slice(0,4);
  cardDataLimite = diaLimite+"/"+mesLimite+"/"+anoLimite;
  return cardDataLimite
}


//----------------------------------------------------------------//
//func add tarefas

let $txtTarefa = document.getElementById("txtTarefa");
let $btnAddTarefa = document.getElementById("add-tarefa");


//preventDefault() -> elimina comportamento padrão do submit, como recarregar a página e exigir validações de campo estabelecidas via HTML
//deve ser removido. sugiro optar por onsubmit em lugar de onclick quando a parte de localstorage estiver pronta
//manter preventDefault() apenas para teste
$btnAddTarefa.onclick = evt => {
  evt.preventDefault();
  gerarCard();
}


function gerarCard() {

  //Cria novo elemento list-item
  let itemLista = document.createElement('li');

  //adiciona novo item de lista antes da posição 0, com os dados do animal conforme o contador
  itemLista.innerHTML = `
    <h3>ID: SETAR A PARTIR DE LOCALSTORAGE!</h3> 
    <h3>Criação: ${$dataCriacao.textContent}</h3> 
    <h3>Limite : ${cardDataLimite}</h3> 
    <h3>Tarefa: ${$txtTarefa.value}</h3> 
    <div class="icones-cards">
      <input type="checkbox">
      <img id="icone-lixeira" src="./img/remover.svg" alt="ícone de lixeira para excluir a tarefa">
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Deseja realmente excluir essa tarefa?</p>
        <br>
        <button id="btnSim" class="btnModal">Sim</button>
        <button id="btnNao" class="btnModal">Não</button>
       </div>
    </div>
    `;

                                           
  /*Adiciona tarefas consumidas na lista  */
  lista.appendChild(itemLista);

  criarModal();
}


// Função do modal

function criarModal() {

  let lixeiras = document.querySelectorAll("#icone-lixeira")
  let modals = document.querySelectorAll(".modal");
  let btnsSim = document.querySelectorAll("#btnSim");
  let spans = document.querySelectorAll(".close");
  let btnsNao = document.querySelectorAll("#btnNao");
  let itensLista = document.querySelectorAll("li");

  for (let i = 0;i < itensLista.length;i++) {

    let lixeira = lixeiras[i];
    let btnSim = btnsSim[i];
    let modal = modals[i];
    let span = spans[i];
    let btnNao = btnsNao[i];
    let itemLista = itensLista[i];

    lixeira.addEventListener("click", () => {
      modal.style.display = "block";
    });

    btnSim.addEventListener("click", () => {
      itemLista.remove();
      // tarefas.splice(i, 1);
      // localStorage.setItem("itemLista", JSON.stringify(itemLista));
    });

    btnNao.addEventListener('click', () => {
      modal.style.display = "none";
    });

    span.addEventListener('click', () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
}