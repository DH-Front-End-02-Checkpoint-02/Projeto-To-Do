# Projeto to-do list

## 2º Checkpoint da disciplina Front-end II - Aplicação to-do list

### Integrantes:

- [Aline Pollis](https://github.com/lipollis)
- [Felipe Moreira](https://github.com/moreirafelipe)
- [Fernando Carvalho](https://github.com/Fer96carvalho)
- [Mar Brito](https://github.com/MarBrito)
- [Paula Augusto](https://github.com/pcamposaugusto)
- [Pedro Brito](https://github.com/pedroisb)


### Objetivo

Esta atividade tem como objetivo servir como segundo instrumento avaliativo da disciplina Front-end II. Se atente às instruções e bom trabalho. O entregável é uma aplicação de to-do (lista de coisas a fazer). O projeto terá 2 páginas.

### Instruções e requisitos do entregável

#### 1. A primeira página deve ter um *formulário de cadastro* com os inputs:

- Nome
- Senha
- Repetir senha
- E-mail
- Botão de submit para criar a conta.


#### 2. A segunda página deve ter um *formulário para criação de tarefas* com os inputs:

- Data de criação: o usuário não poderá alterar esse input, mas ele deve ser exibido.
- Data limite da tarefa: data que o usuário deseja terminar aquela tarefa.
- Descrição: texto da tarefa.
- Botão de submit.


#### 3. Validações:

- Nenhum campo pode ser vazio.
- A descrição deve ter mais que 10 caracteres.
- IMPORTANTE: Quando o usuário não preencher corretamente deve ser exibido um alerta indicando que existem erros na criação da tarefa.
- OPCIONAL/EXTRA: a data limite da tarefa deve ser hoje ou no futuro.


#### 4. Funcionalidades:

- Quando o usuário clicar em submit, se ele passar pela validação, a anotação deve ser exibida na tela por meio de um card.
- No card da anotação deve ter um botão para excluir a anotação. Quando ele for clicado deverá ser exibido um aviso confirmando a intenção de excluir a anotação. Se o usuário confirmar a intenção de excluir, o card desta nota deve desaparecer.
- Ainda no card da anotação, deverá existir um checkbox que ao ser clicado faz o texto daquela anotação ficar tachado. Tarefa concluida.
- OPCIONAL/EXTRA: versão dark mode


#### 5. Na segunda página, iremos consumir uma api de lista de tarefas.

- O end-point (https://jsonplaceholder.typicode.com/todos/) responde com um JSON com 200 tarefas. Essas 200 tarefas devem ser consumidas pelo JS e renderizadas também como cards na página.
- Nas tarefas onde o atributo “completed": true” o texto do atributo title deve estar tachado. Pois significa que a tarefa ja foi completada.
- Nas tarefas onde o atributo “completed": false” o texto do atributo title deve estar em negrito. Pois significa que a tarefa está a fazer.
- Exiba também o conteúdo do atributo “id”.

