
// VARIAVEIS PARA VISUALIZAÇÃO DA DIV
let login2 = document.querySelector( 'div.login');
let cadastro2 = document.querySelector('div.cadastro')

// FUNÇÃOO PARA TROCAR A DIV VISUALIZADA
function trocaDiv1(){
  document.getElementById('link2').addEventListener('click',()=>{
    login2.style.display = 'none';
    cadastro2.style.display = 'block';
  })
};
  
trocaDiv1()

// FAZENDO A VERIFICAÇÃO DE LOGIN 
document.getElementById("botaoo").addEventListener('click', function entrar() {
  let email = document.getElementById('email#')
  let emailLabel = document.querySelector('#emailLabel')

  let senha = document.getElementById('senha#')
  let senhaLabel = document.querySelector('#senhaLabel')

  let listaUser = []

  let userValid = {
    nome: '',
    email: '',
    senha: ''
  }

  listaUser = JSON.parse(localStorage.getItem('listaUser'))

  listaUser.forEach((item) => {
    if (email.value == item.email && senha.value == item.senha) {

      userValid = {
        nome: item.nome,
        email: item.email,
        senha: item.senha
      }

    }
  })

  if (email.value == userValid.email && senha.value == userValid.senha) {
    document.getElementById('form').reset()
    // window.location.href = 'https:  //Local de redirecionamento apos confirmação de login

    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom

    localStorage.setItem('token', token)
    localStorage.setItem('userLogado', JSON.stringify(userValid))

  } else {
    emailLabel.setAttribute('style', 'color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    email.setAttribute('style', 'border-color: red')
    document.getElementById('form').reset()
    email.focus()
    alert('Usuario ou senha Incorretos')
  }

})