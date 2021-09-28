// VARIAVEIS PARA VISUALIZAÇÃO DA DIV
let login = document.querySelector('div.login');
let cadastro = document.querySelector('div.cadastro');

// FUNÇÃOO PARA TROCAR A DIV VISUALIZADA
function trocaDiv() {
  document.getElementById('link1').addEventListener('click', () => {
    login.style.display = 'block';
    cadastro.style.display = 'none';
  })
};
trocaDiv()

// FUNÇÃO PARA VALIDAR O CAMPO NOME
function validar_nome() {
  let nome = document.getElementById("nome").value;
  // let padrao = /[^a-zà-ú]/gi; //uma palavra
  let padrao = /[^A-Z][a-z]+\s[A-Z][a-z]+/gi;   //duas palavras
  let valida_nome = nome.match(padrao);
  if ((nome.length <= 10) ||
    (nome == "") ||
    (valida_nome || !nome)
  ) {
    alert("IMPORTANTE! Campo 'Nome' preenchido de forma incorreta.");
    return false;
  } else {
    return true;
  }
}


// FUNÇÃO PARA VALIDAR O CAMPO SENHA
function validar_senha() {
  let senha = document.getElementById("senha").value;
  let senhaRepetir = document.getElementById("confirmSenha").value;
  if ((senha != senhaRepetir) ||
    (senha == "") || (senhaRepetir == "")) {
    alert("IMPORTANTE! O campo 'Repetir senha' não corresponde com o inserido em 'Senha' ou estão vázios.");
    return false;
  } else {
    return true;
  }
}



// FUNÇÃO PARA VERIFICAR O EMAIL
const $email = document.getElementById('email');
function validar_email() {
  let usuario = $email.value.substring(0, $email.value.indexOf("@"));
  let dominio = $email.value.substring($email.value.indexOf("@") + 1, $email.value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)
  ) {
    return true;
  } else {
    alert("IMPORTANTE! Campo E-mail preenchido de forma incorreta.")
    return false;
  }
}
// FUNÇÃO PARA VERIFICAR A DISPONIBILIDADE DO EMAIL
function verificar_Email() {
  let email = document.getElementById('email')
  let listaemail = []

  let emailValid = {
    nome: '',
    email: '',
    senha: ''
  }

  listaemail = JSON.parse(localStorage.getItem('listaUser') || '[]');

  listaemail.forEach((item) => {
    if (email.value == item.email) {

      emailValid = {
        nome: item.nome,
        email: item.email,
        senha: item.senha
      }

    }
  })
  if (email.value == emailValid.email) {
    alert("Este email não está disponivel");
    email.focus()
    return false;
  } else {
    return true;
  }
}


// FUNÇÃO PARA VALIDAR TODOS OS CAMPOS DO CADASTRO
function validar_tudo() {
  if ((validar_nome() == true) &&
    (validar_senha() == true) &&
    (validar_email() == true) &&
    (verificar_Email()) == true) {
    alert("Conta criada com sucesso!");
    return true;
  }
}

/*  FELIPE - 27/09 - Importando 15 primeiras tarefas da API */
let importarTarefas = _ => {

}

// ADICIONANDO O EVENTO AO BOTÃO CADASTRAR
document.querySelector('button').addEventListener('click', function cadastrar() {
  
  if (validar_tudo() == true) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nome: nome.value,
      email: email.value,
      senha: senha.value,
      tarefas: []
    })

    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    document.querySelector('form').reset()
    document.getElementById('form').reset()
    setTimeout(() => {
      login.style.display = 'block';
      cadastro.style.display = 'none';
    }, 500);


  } else { }
})