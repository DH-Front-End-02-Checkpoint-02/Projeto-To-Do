// Create a "close" button and append it to each list item
let listaTarefas = document.getElementsByTagName("li");
let i;
for (i = 0; i < listaTarefas.length; i++) {
  let span = document.createElement("span");
  let btnDeMais = document.createTextNode("+");
  span.className = "close";
  span.appendChild(btnDeMais);
  listaTarefas[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
let j;
for (j = 0; j < close.length; j++) {
  close[j].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'li') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function novaTarefa() {
  let li = document.createElement("li");
  let inputValue = document.getElementByClass("inputs").value;
  let t = document.createTextNode(inputValue);
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