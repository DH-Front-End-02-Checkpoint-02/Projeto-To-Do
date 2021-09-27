//elementos
// let adiciona = document.querySelector('.dropbtn') // Onde pretende usar isso?
let form = document.querySelector('.form-tarefa');
let main = document.querySelector('main');
let lista = document.getElementById('lista');

let idTarefa = 0;
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
//     <div>Data de criação: ${dataCriacao.textContent}</div>
//     <div>Data limite: ${dataCriacao.textContent}</div>
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

const dataCriacao = document.getElementById("data-criacao");

dataCriacao.insertAdjacentText("afterbegin", dataHoje.toLocaleDateString('pt-BR'));


// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos

const arrData = [dataHoje.getFullYear(), dataHoje.getMonth()+1, dataHoje.getDate()];

function calcDataMin (arrData){
  if (arrData[1] < 10){
    arrData[1] = "0" + arrData[1];
  }
  const dataMin = arrData.reduce((acc, el) => acc+"-"+el);
  return dataMin;
}

const dataLimite = document.getElementById("data-limite");

dataLimite.setAttribute("min", calcDataMin(arrData));


//----------------------------------------------------------------//
//func para capturar data-limite escolhida pelo usuário

let cardDataLimite;

dataLimite.onchange = () => {
  let diaLimite = dataLimite.value.slice(8,10);
  let mesLimite = dataLimite.value.slice(5,7);
  let anoLimite = dataLimite.value.slice(0,4);
  cardDataLimite = diaLimite+"/"+mesLimite+"/"+anoLimite;
  return cardDataLimite
}


//----------------------------------------------------------------//
//func add tarefas

let txtTarefa = document.getElementById("txtTarefa");
let btnAddTarefa = document.getElementById("add-tarefa");


//preventDefault() -> elimina comportamento padrão do submit, como recarregar a página e exigir validações de campo estabelecidas via HTML
//deve ser removido. sugiro optar por onsubmit em lugar de onclick quando a parte de localstorage estiver pronta
//manter preventDefault() apenas para teste

btnAddTarefa.onclick = evt => {
  evt.preventDefault();
  gerarCard();
}

/* FELIPE - 27/09 -  Atualizando cards do usuario na tela */
window.onload = _ => {

  resgatarCards();

  let getObj = JSON.parse(localStorage.getItem('listaUser'));

  //Verifica se há tarefas a serem resgatadas e renderiza
  if(getObj[0].tarefas.length != 0) {
    idTarefa = getObj[0].tarefas[getObj[0].tarefas.length - 1].indice;
  }
}

/*  FELIPE - 27/09 - Importando 15 primeiras tarefas da API */
const importarTarefas = _ => {
  //Incluindo comsumo da API todos
  //pegando informações
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => {
    json.forEach((tarefa, index) => {index < 15 ? tarefasImportadas.push(tarefa) : null;
    });
  });
}

/* FELIPE - 27/09 - Recuperando dados do localSorage e renderizando na tela */
const resgatarCards = _ => {

  //Atualizando localStorage com nova tarefa
  let getObj = JSON.parse(localStorage.getItem('listaUser'));

  //Verifica se há tarefas a serem resgatadas e renderiza
  if(getObj[0].tarefas.length != 0) {
  console.log(getObj);

    getObj[0].tarefas.forEach(tarefa => {
      let itemLista = document.createElement('li');

      let cardID = document.createElement("h3");
      let cardDataCriacao = document.createElement("h3");
      let cardPrazo = document.createElement("h3");
      let cardTxtTarefa = document.createElement("h3");

      cardID.insertAdjacentText("afterbegin", (tarefa.id));
      cardDataCriacao.insertAdjacentText("afterbegin", "Criado em: " + tarefa.dtCriacao);
      cardPrazo.insertAdjacentText("afterbegin", "Prazo: " + tarefa.dtLimite);
      cardTxtTarefa.insertAdjacentText("afterbegin", "Tarefa: " + tarefa.tarefa);
    
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("icones-cards");
    
      let cardCheckbox = document.createElement("input");
      cardCheckbox.setAttribute("type", "checkbox");
      cardCheckbox.id="cardCheckbox";
      cardCheckbox.style.cssText=`
        outline: none;
        margin-top: .1rem;
        width: 1rem;
      `
    
      let cardLixeira = document.createElement("img");
      cardLixeira.setAttribute("src", "./img/remover.svg");
      cardLixeira.setAttribute("alt", "ícone de lixeira para excluir a tarefa");
      cardLixeira.id="icone-lixeira";
    
      itemLista.innerHTML += `  
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
    
      cardDiv.appendChild(cardCheckbox);
      cardDiv.appendChild(cardLixeira);
      itemLista.appendChild(cardID);
      itemLista.appendChild(cardDataCriacao);
      itemLista.appendChild(cardPrazo);
      itemLista.appendChild(cardTxtTarefa);
      itemLista.appendChild(cardDiv);
      lista.appendChild(itemLista);
    
      cardCheckbox.onclick = () => {
        itemLista.classList.toggle("checked");
      }
    });
  }
}

/* FELIPE - 27/09 - Função que renderiza novos cards e atualiza o LocalStoraga */
function gerarCard() {
  //Cria novo elemento list-item
  let itemLista = document.createElement('li');

  let cardID = document.createElement("h3");
  let cardDataCriacao = document.createElement("h3");
  let cardPrazo = document.createElement("h3");
  let cardTxtTarefa = document.createElement("h3");

  let tarefa = {
    id: idTarefa+1,
    dtCriacao: dataCriacao.textContent,
    dtLimite: cardDataLimite,
    tarefa: txtTarefa.value,
    indice: idTarefa+1
  }

  idTarefa++;

  //Atualizando localStorage com nova tarefa
  let getObj = JSON.parse(localStorage.getItem('listaUser'));
  console.log(getObj);

  getObj[0].tarefas.forEach(tarefa => {
    tarefa.indice = idTarefa;
  });

  getObj[0].tarefas.push(tarefa);
  localStorage.setItem('listaUser', JSON.stringify(getObj));
  
  cardID.insertAdjacentText("afterbegin", (idTarefa));
  cardDataCriacao.insertAdjacentText("afterbegin", "Criado em: " + dataCriacao.textContent);
  cardPrazo.insertAdjacentText("afterbegin", "Prazo: " + cardDataLimite);
  cardTxtTarefa.insertAdjacentText("afterbegin", "Tarefa: " + txtTarefa.value);

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("icones-cards");

  let cardCheckbox = document.createElement("input");
  cardCheckbox.setAttribute("type", "checkbox");
  cardCheckbox.id="cardCheckbox";
  cardCheckbox.style.cssText=`
    outline: none;
    margin-top: .1rem;
    width: 1rem;
  `

  let cardLixeira = document.createElement("img");
  cardLixeira.setAttribute("src", "./img/remover.svg");
  cardLixeira.setAttribute("alt", "ícone de lixeira para excluir a tarefa");
  cardLixeira.id="icone-lixeira";

  itemLista.innerHTML += `  
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

  cardDiv.appendChild(cardCheckbox);
  cardDiv.appendChild(cardLixeira);
  itemLista.appendChild(cardID);
  itemLista.appendChild(cardDataCriacao);
  itemLista.appendChild(cardPrazo);
  itemLista.appendChild(cardTxtTarefa);
  itemLista.appendChild(cardDiv);
  lista.appendChild(itemLista);

  cardCheckbox.onclick = () => {
    itemLista.classList.toggle("checked");
  }

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