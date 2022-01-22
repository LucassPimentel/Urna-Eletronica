let seuVotoPara = document.querySelector(".divisao-1-msg span");
let cargo = document.querySelector(".divisao-1-msg-2 span");
let descGeral = document.querySelector(".divisao-1-msg-4");
let aviso = document.querySelector(".divisao-2");
let lateral = document.querySelector(".divisao-1-dir");
let numeros = document.querySelector(".divisao-1-nums");

let etapaAtual = 0;
let numero = "";
let branco = false;
let nome = "";
let etapasHtml = etapas;

function comecarEtapa() {
  let etapa = etapas[etapaAtual];
  let numeroHtml = "";
  numero = "";
  branco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="num font-maior"></div>';
    } else {
      numeroHtml += '<div class="num font-maior"></div>';
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descGeral.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descGeral.innerHTML = `Nome:${candidato.nome} <br>
    Partido: ${candidato.partido} `;

    let fotosHtml = "";

    for (let i in candidato.fotos) {
      fotosHtml += `<div class="divisao-1-img"><img  class="format-imgs" src="assets/imgs/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descGeral.innerHTML =
      '<div class ="aviso--grande">NENHUM CANDIDATO COM ESTE NÚMERO</div>';
    setTimeout(comecarEtapa, 1000);
  }
}

function Clicou(n) {
  let elNum = document.querySelector(".num.font-maior");

  if (elNum !== null) {
    elNum.innerHTML = n;
    numero = `${numero}${n}`;

    elNum.classList.remove("font-maior");
    if (elNum.nextElementSibling !== null) {
      elNum.nextElementSibling.classList.add("font-maior");
    } else {
      atualizaInterface();
    }
  }
}

function Branco() {
  if (numero === "") {
    branco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descGeral.innerHTML = '<div class ="aviso--grande">VOTO EM BRANCO</div>';
  } else {
    descGeral.innerHTML =
      '<div class ="aviso--grande">PARA VOTAR EM BRANCO NÃO PODE TER DIGITADO NENHUM NÚMERO, APERTE EM "CORRIGE" PARA RETORNAR..</div>';
    aviso.style.display = "block";
    cargo.innerHTML = "";
    numeros.innerHTML = "";
    lateral.innerHTML = "";
    seuVotoPara.style.display = "none";
  }
}

function Corrige() {
  comecarEtapa();
}

function Confirma() {
  let etapa = etapas[etapaAtual];
  const somConfirma = new Audio('assets/audio/confirma-som.mp3')
  let votoConfirmado = false;

  if (branco === true) {
    somConfirma.play()
    votoConfirmado = true;
    alert("VOTO COMPUTADO COMO BRANCO.");
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    somConfirma.play()
    alert(`VOTO COMPUTADO EM ${numero}`);
    comecarEtapa();
  } else {
    alert("[ERRO]");
    comecarEtapa();
  }
  comecarEtapa();
}

// // if(candidatoExis.length <= 0) {
// //   alert("VOCÊ PRECISA INSERIR OS NÚMEROS DO CANDIDATO OU VOTAR EM BRANCO");
// // } else {
// //   alert("SEU VOTO FOI COMPUTADO!");

// }

comecarEtapa();
