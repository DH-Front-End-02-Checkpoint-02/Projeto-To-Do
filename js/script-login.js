// FUNÇÃO PARA VALIDAR O CAMPO NOME
function validar_nome() {
    let nome = document.getElementById("nome").value;
    let padrao = /[^a-zà-ú]/gi;              //uma palavra
    // let padrao = /[^A-Z][a-z]+\s[A-Z][a-z]+/gi;   //duas palavras
    let valida_nome = nome.match(padrao);
    if ((nome.length <= 10)
        || (nome == "")
        || (valida_nome || !nome)
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
    let senhaRepetir = document.getElementById("senhaRepetir").value;
    if ((senha != senhaRepetir)
        || (senha == "") || (senhaRepetir == "")) {
        alert("IMPORTANTE! O campo 'Repetir senha' não corresponde com o inserido em 'Senha' ou estão vázios.");
        return false;
    } else {
        return true;
    }
}

// FUNÇÃO PARA VERIFICAR O EMAIL 
function validar_email(field) {
    let usuario = field.value.substring(0, field.value.indexOf("@"));
    let dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

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
    }
    else {
        alert("IMPORTANTE! Campo E-mail preenchido de forma incorreta.")
        return false;
    }
}

// FUNÇÃO PARA VALIDAR TODOS OS CAMPOS DO LOGIN
function validar_tudo() {
    if ((validar_nome() == true)
        && (validar_senha() == true)
        && (validar_email() == true)) {
        alert("Formulário enviado!");
        return true;
    }
}