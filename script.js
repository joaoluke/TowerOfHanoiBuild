
//DOM
let torreA = [[0,0],[0,1],[0,2],[0,3]]

let torreB = [[1,0], [1,1], [1,2], [1,3]]

let torreC = [[2,0], [2,1], [2,2], [2,3]]



let botaoDesfazer = document.getElementById("undo");

function criaTorre(torre, torreName, divPrincipal) {
//  como parâmetro: recebe a torre (array), nome ("A", "B", ou "C") 
// e minha Div principal( onde as Torres criadas ficarão) 

  let divTorre = document.createElement('div');
  divTorre.className = "barra";
  divTorre.id = torreName;
  divPrincipal.appendChild(divTorre);
}

//lógica: criar os discos 

let disco1 = {
  tamanho: 1,
  posicao: [0, 3]

}

let disco2 = {
  tamanho: 2,
  posicao: [0, 2],

}

let disco3 = {
  tamanho: 3,
  posicao: [0, 1],


}

let disco4 = {
  tamanho: 4,
  posicao: [0, 0],

}

// Pega os objetos e cria uma div( que serão os discos) para cada de acordo com o tamanho.

function criaDiv(disco) { // Vai criar os discos com base no objeto disco passado 
  let divObject = document.createElement('div')
  divObject.id = 'disco' + disco.tamanho // vai resultar em uma div, que será um disco de acordo com a propriedade tamnho do obj
  
  return divObject
}

//momento de chamar a função cria torre
function generateHTML() {
  let divGame = document.getElementById('tower')

  criaTorre(torreA, 'A', divGame) // cria as torres abc 
  criaTorre(torreB, 'B', divGame)
  criaTorre(torreC, 'C', divGame)


}

function initialState() { //momento de colocar os discos no lugar inicial
 
  generateHTML()  
  
  // criaDiv(disco4)
  let positionDisco4 = document.getElementById('A') // pega a div espaço que irá o disco 
  let disco4Div = criaDiv(disco4) // chama a função para criar o primeiro disco 

  positionDisco4.appendChild(disco4Div)
  // criaDiv(disco3)
  let positionDisco3 = document.getElementById('A') 
  let disco3Div = criaDiv(disco3) 
  positionDisco3.appendChild(disco3Div)

  // criaDiv(disco2)
  let positionDisco2 = document.getElementById('A') 
  let disco2Div = criaDiv(disco2) 
  positionDisco2.appendChild(disco2Div) 

  // criaDiv(disco1)
  let positionDisco1 = document.getElementById('A') 
  let disco1Div = criaDiv(disco1) 
  positionDisco1.appendChild(disco1Div) 


}

initialState(); //chamando a função


//lógica para a movimentação:

let moveDisco = document.querySelectorAll("div.barra"); //vou trabalhar com as torres, todas têm a classe barra


//lógicas para ação de cada clique:


//obj que será parâmetro para a mudança de lugar
let mudaLugar = {
  divAtual: '',
  clique: 0,
  tamanho: 0
}

let countGame = document.getElementById("placar"); //para receber contador

let ultimoDisco; 

// Se no primeiro clique o obj estiver em sua condição inicial,
// com o clique será possível selecionar o 
// ultimo filho, e ainda mudar sua cor através da nova classe.
// Após isso, a div atual será daquele clicado

let contador = 0;

// o clique será 1 e o tamanho será da div clicada. 
function primeiroClique(e) {
  countGame.innerHTML = "" //limpando o campo contador em cada jogada 
  contador ++; //lógica para printar número de jogadas 
 
  let placar = document.createElement("span");
  placar.className = "jogadas";
  placar.id = "jogadasFeitas"
  placar.innerHTML = `Seu número de jogadas é ${contador}`;
  countGame.appendChild(placar);

  if (mudaLugar.clique == 0) {
    ultimoDisco = e.currentTarget.lastElementChild;
    ultimaJogada.disco = ultimoDisco;
    ultimaJogada.torre = e.currentTarget;

    ultimoDisco.className = 'selecionado'
    
    mudaLugar.divAtual = ultimoDisco
    mudaLugar.clique = 1
    mudaLugar.tamanho = ultimoDisco.clientWidth
   
  }

  // ao final da função preciso remover o listner do evento,
  // para receber o próximo listener que será o do clique dois.
  removeEventListenerPrimeiroClique();
  adicionaEventListenerSegundoClique();
}

let d = document.getElementById('trophie1');

function segundoClique(e) {
  botaoDesfazer.disabled = false; // o botão de desfazer a jogada só desabilita quando eu faço uma jogada, com o segundo clique 
  if (mudaLugar.clique == 1) {
    //torreFutura vai receber o clique 
    let torreFutura = e.currentTarget;
    //filho vai receber o ultmo elemento da torreFutura 
    let filho = torreFutura.lastElementChild;
    mudaLugar.divAtual.className = ''; //saiu a cor preta 

    if (filho == null) {
      // se o filho (ultimo) estiver vazio, vai receber o disco
      torreFutura.appendChild(mudaLugar.divAtual); 
      // caso o filho seja um disco, então vai comparar as larguras, 
    } else if (filho.clientWidth > mudaLugar.tamanho) { 
       // se o ultimo elemento for maior, permitirá um outro disco acima dele  
      torreFutura.appendChild(mudaLugar.divAtual);
    } else {
      alert("Não pode colocar um disco maior em cima de um menor!") // se não, a mensagem irá informar a regra "Não pode colocar um disco maior em cima de um menor!"
    }

    // if (mudaLugar.tamanho > torreAtu)
    mudaLugar.divAtual = '';
    mudaLugar.clique = 0;
    mudaLugar.tamanho = 0;
  }


  let c = document.getElementById("C").childElementCount;
  if (c === 4) {
    let b = document.getElementById("finished");
    b.innerHTML = "Parabéns você venceu!!!";
    d.style.display = "inline-flex";
    setTimeout(function(){ location.reload(); }, 3000);
  }

  removeEventListenerSegundoClique();
  adicionaEventListenerPrimeiroClique();
}


adicionaEventListenerPrimeiroClique()

function adicionaEventListenerPrimeiroClique() {
  for (var i = 0; i < moveDisco.length; i++) {
    moveDisco[i].addEventListener('click', primeiroClique, false);
  }
}

function adicionaEventListenerSegundoClique() {
  for (var i = 0; i < moveDisco.length; i++) {
    moveDisco[i].addEventListener('click', segundoClique, false);
  }
}
function removeEventListenerPrimeiroClique() {
  for (var i = 0; i < moveDisco.length; i++) {
    moveDisco[i].removeEventListener('click', primeiroClique, false);
  }
}

function removeEventListenerSegundoClique() {
  for (var i = 0; i < moveDisco.length; i++) {
    moveDisco[i].removeEventListener('click', segundoClique, false);
  }
}

//lógica desfazer a jogada

let ultimaJogada = {
  disco: "",
  torre: "",

}

botaoDesfazer.onclick = function(e){
  botaoDesfazer.disabled = true;
  if(contador != 0){
    let torre = ultimaJogada.torre;
    torre.appendChild(ultimaJogada.disco)
    
    contador -= 1;
    ultimaJogada = {
      disco: "",
      torre: "",
    }
  }
}


let botaoReset = document.getElementById("reset");
botaoReset.onclick = function (e) {
  let zeraplacar = document.getElementById("jogadasFeitas")
  zeraplacar.innerText = ""
  contador = 0;
  
  // lógica para voltar a posição inicial 
  let TorreDeInicio = document.getElementById("A");

  let voltaPosicaoD4 = document.getElementById("disco4");
  TorreDeInicio.appendChild(voltaPosicaoD4)
  let voltaPosicaoD3 = document.getElementById("disco3");
  TorreDeInicio.appendChild(voltaPosicaoD3)
  let voltaPosicaoD2 = document.getElementById("disco2");
  TorreDeInicio.appendChild(voltaPosicaoD2)
  let voltaPosicaoD1 = document.getElementById("disco1");
  TorreDeInicio.appendChild(voltaPosicaoD1)
 

}
