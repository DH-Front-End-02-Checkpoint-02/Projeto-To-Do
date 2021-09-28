let porcent = document.querySelector('.porcent');
let loading = document.querySelector('.loading');
let count = 1;

let load = setInterval(animate, 25);

function animate(){
  if(count == 100){
    //Faz ao terminar de carregar ahref
    loading.parentElement.removeChild(loading);
    clearInterval(load);
  }else{
    count++;
    porcent.textContent = count + "%";
  }
}
//-----------------------------------------------------------------------//
// SAIR DA TO-DO LIST 
let sairbtn = document.getElementById('btsair'); 

sairbtn.addEventListener('click',()=>{
  localStorage.removeItem('token');
  window.location.href = './index.html';
});

//-----------------------------------------------------------------------//
// Identifica e apresenta o nome do usuário logado no form
let usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('#logado');

logado.innerHTML = `${usuarioLogado.nome}`;


//-----------------------------------------------------------------------//
// FIREWALL QUE IMPEDE A ENTRADA SEM TOKEN
if(localStorage.getItem('token') == null){
  setTimeout(() => {
    alert('Você precisa está logado para acessar essa pagina')
    window.location.href = './index.html'; 
  }, 5000);
};

// 1) Data de criação de tarefa: Data deverá sempre ser a data presente
const dataHoje = new Date();

const dataCriacao = document.getElementById("data-criacao");

dataCriacao.insertAdjacentText("afterbegin", dataHoje.toLocaleDateString("pt-BR"));


// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos
const arrData = [dataHoje.getFullYear(), dataHoje.getMonth()+1, dataHoje.getDate()];

let dataMin;

function calcDataMin (arrData){
  if (arrData[1] < 10){
    arrData[1] = "0" + arrData[1];
  }
  dataMin = arrData.reduce((acc, el) => acc+"-"+el);
  return dataMin;
}

calcDataMin(arrData)

const dataLimite = document.getElementById("data-limite");

dataLimite.setAttribute("min", dataMin);

//-----------------------------------------------------------------------//
//Setando Datas

// 1) Data de criação de tarefa: Data deverá sempre ser a data presente
/* const dataHoje = new Date();

const dataCriacao = document.getElementById("data-criacao");

dataCriacao.insertAdjacentText("afterbegin", dataHoje.toLocaleDateString('pt-BR')); */


// 2) Data-limite da tarefa: Data deverá ser do dia presente em diante. Nunca dias pretéritos
/* const arrData = [dataHoje.getFullYear(), dataHoje.getMonth()+1, dataHoje.getDate()];

function calcDataMin (arrData){
  if (arrData[1] < 10){
    arrData[1] = "0" + arrData[1];
  }
  const dataMin = arrData.reduce((acc, el) => acc+"-"+el);
  return dataMin;
}

const dataLimite = document.getElementById("data-limite");

dataLimite.setAttribute("min", calcDataMin(arrData)); */


//-----------------------------------------------------------------------//
//func para capturar data-limite escolhida pelo usuário

let cardDataLimite;

  dataLimite.onchange = () => {
  let diaLimite = dataLimite.value.slice(8,10);
  let mesLimite = dataLimite.value.slice(5,7);
  let anoLimite = dataLimite.value.slice(0,4);
  cardDataLimite = diaLimite+"/"+mesLimite+"/"+anoLimite;
  return cardDataLimite;
}

//-----------------------------------------------------------------------//
//func add tarefas

// let counter = 0; 
// let userId = 0;
// Essas variáveis estão sendo utilizadas?

let idTarefa = 0;
/* let tarefas = []; */

let txtTarefa = document.getElementById("txtTarefa");

const formTarefa = document.getElementById("form-tarefa");

//Evento de envio dos dados
formTarefa.onsubmit = (evt) => {
  evt.preventDefault();
  gerarCard();
}

//Incluindo comsumo da API todos
//pegando informações
fetch('https://jsonplaceholder.typicode.com/todos')
.then((response) => response.json())
.then((json) => {
  let getObj = JSON.parse(localStorage.getItem('listaUser'));

  if(getObj[0].tarefas.length == 0) {

    json.forEach((tarefa, index) => {

      if (index < 15) {
        getObj[0].tarefas.push({id: tarefa.id, dtCriacao: dataCriacao.textContent, dtLimite: dtLimite, tarefa: tarefa.title, situacao: tarefa.completed, indice: tarefa.id});
        idTarefa++;
        
        getObj[0].tarefas.forEach(tarefa => {
          tarefa.indice = idTarefa;
        });
      }
      })
      localStorage.setItem('listaUser', JSON.stringify(getObj));
      window.location.reload(true);
  }
});

/* FELIPE - 27/09 -  Atualizando cards do usuario na tela */
window.onload = _ => {

  let getObj = JSON.parse(localStorage.getItem('listaUser'));

  //Incluindo comsumo da API todos
  //pegando informações
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => {
    let getObj = JSON.parse(localStorage.getItem('listaUser'));

    if(getObj[0].tarefas.length == 0) {

      json.forEach((tarefa, index) => {

        if (index < 15) {
          getObj[0].tarefas.push({id: tarefa.id, dtCriacao: dataCriacao.textContent, dtLimite: dtLimite, tarefa: tarefa.title, situacao: tarefa.completed, indice: tarefa.id});
          idTarefa++;
          
          getObj[0].tarefas.forEach(tarefa => {
            tarefa.indice = idTarefa;
          });
        }
        })
        localStorage.setItem('listaUser', JSON.stringify(getObj));
    }
  });

  //Verifica se há tarefas a serem resgatadas e renderiza
  if(getObj[0].tarefas[getObj[0].tarefas.length - 1].indice != null) {
    /* Atualiza indice de IDs de cards quando o ultimo card da memoria for valido*/
    idTarefa = getObj[0].tarefas[getObj[0].tarefas.length - 1].indice;
    /* Recuperar cards da memoria se o ultimo card da memoria tiver id valido */
  }
  resgatarCards();
}

let dtLimite;

/* Ajustando data inicial do calentádio */
let today = new Date()

let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();

/* Adiciona 0 na frente de numeros menores que 10*/
day < 10 ? day = '0'+ day : null;
month < 10 ? month = '0'+ month : null;

/* Definindo valor do input do calendario para a data atual */
dtLimite = `${day}/${month}/${year}`;

/* FELIPE - 27/09 - Recuperando dados do localSorage e renderizando na tela */
const resgatarCards = _ => {

  //Atualizando localStorage com nova tarefa
  let getObj = JSON.parse(localStorage.getItem('listaUser'));

  //Verifica se há tarefas a serem resgatadas e renderiza
  if(getObj[0].tarefas.at(-1).id != null) {
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
      cardLixeira.setAttribute('onclick', "criarModal(" + tarefa.id + ")")
    
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

      //Disabilita cards com tarefas já feitas
      if(tarefa.situacao == true) {
        itemLista.classList.toggle("checked");
        cardCheckbox.checked=true;
      }

        //Desabilita cards marcados
        cardCheckbox.onclick = () => {
        itemLista.classList.toggle("checked");
        let getObj= JSON.parse(localStorage.getItem('listaUser'))
          if(getObj[0].tarefas[tarefa.id].situacao=false) {
            getObj[0].tarefas[tarefa.id].situacao=true;
            localStorage.setItem('listaUser', JSON.stringify(getObj));
          } else {
            getObj[0].tarefas[tarefa.id].situacao=false;
            localStorage.setItem('listaUser', JSON.stringify(getObj));
          }
      }
    });
  }
  criarModal(tarefa.id);
}


/* FELIPE - 27/09 - Função que renderiza novos cards e atualiza o LocalStoraga */
function gerarCard() {
  let getObj = JSON.parse(localStorage.getItem('listaUser'));
  let tarefa;

  if(getObj[0].tarefas.at(-1).id==null) {

    getObj[0].tarefas.at(-1).id=idTarefa+1;
    getObj[0].tarefas.at(-1).dtCriacao=dataCriacao.textContent;
    getObj[0].tarefas.at(-1).dtLimite=cardDataLimite;
    getObj[0].tarefas.at(-1).tarefa=txtTarefa.value;
    getObj[0].tarefas.at(-1).situacao=false;
    getObj[0].tarefas.at(-1).indice=idTarefa+1;

    localStorage.setItem('listaUser', JSON.stringify(getObj));
    idTarefa++

  } else {
    
    tarefa = {
      id: idTarefa+1,
      dtCriacao: dataCriacao.textContent,
      dtLimite: cardDataLimite,
      tarefa: txtTarefa.value,
      situacao: false,
      indice: idTarefa+1
    }
    
    idTarefa++;
    //Atualizando localStorage com nova tarefa
    /* let getObj = JSON.parse(localStorage.getItem('listaUser'));
    console.log(getObj); */

    /*Atualiza indice de IDs nos objetos */
    getObj[0].tarefas.forEach(tarefa => {
      tarefa.indice = idTarefa;
    });

    getObj[0].tarefas.push(tarefa);
    localStorage.setItem('listaUser', JSON.stringify(getObj));
  }
        //Cria novo elemento list-item
        let itemLista = document.createElement('li');

        let cardID = document.createElement("h3");
        let cardDataCriacao = document.createElement("h3");
        let cardPrazo = document.createElement("h3");
        let cardTxtTarefa = document.createElement("h3");
    
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
        cardLixeira.setAttribute('onclick', "criarModal(" + idTarefa + ")")
    
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
/*     
        cardCheckbox.onclick = () => {
          itemLista.classList.toggle("checked");
          let getObj= JSON.parse(localStorage.getItem('listaUser'))
            if(getObj[0].tarefas[tarefa.id].situacao=false) {
              getObj[0].tarefas[tarefa.id].situacao=true;
              localStorage.setItem('listaUser', JSON.stringify(getObj));
            } else {
              getObj[0].tarefas[tarefa.id].situacao=false;
              localStorage.setItem('listaUser', JSON.stringify(getObj));
            }
        } */

        cardCheckbox.onclick = () => {
          itemLista.classList.toggle("checked");
        }
    
        criarModal(id);
}

const excluirCard = id => {

  let getObj= JSON.parse(localStorage.getItem('listaUser'))

  // findIndex percorre o array e compara o valor do index de cada objeto com o parâmetro passado
  let index = getObj[0].tarefas.findIndex(tarefa => tarefa.id == id)
/* 
  idTarefa = index.indice
  console.log(idTarefa) */
  
/*   getObj[0].tarefas.splice(index, 1); */

  if(getObj[0].tarefas.length > 1) {
      getObj[0].tarefas.splice(index, 1);
      localStorage.setItem('listaUser', JSON.stringify(getObj));
      document.location.reload(true);
  } else {
      getObj[0].tarefas.at(-1).id = null;
      getObj[0].tarefas.at(-1).dtCriacao = null;
      getObj[0].tarefas.at(-1).dtLimite = null;
      getObj[0].tarefas.at(-1).tarefa = null;

      idTarefa = getObj[0].tarefas.at(-1).indice;
      localStorage.setItem('listaUser', JSON.stringify(getObj));
      document.location.reload(true);
  }
}

// Função do modal
function criarModal(id) {
/*   let lixeiras = document.querySelector("#icone-lixeira") */
  let modal = document.querySelector(".modal");
  let btnSim = document.querySelector("#btnSim");
  let span = document.querySelector(".close");
  let btnNao = document.querySelector("#btnNao");
  let itemLista = document.querySelector("li");
  modal.style.display = "block";

  
  btnSim.addEventListener("click", () => {
    itemLista.remove();
    excluirCard(id);
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
  })
}
