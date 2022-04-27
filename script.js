let pessoas = [
  { nome: "Ana", idade: 18 },
  { nome: "Maria", idade: 20 },
  { nome: "José", idade: 17 },
  { nome: "Marcos", idade: 22 },
];
let people = [{ name: "VAZIO", birth_year: "VAZIO" }];
let currentPage = "https://swapi.dev/api/people";
let nextPage = null;
const objTraducao = {
  name: "Nome",
  height: "Altura",
};

const btFetch = document.getElementById("btFetch");
const btProxPag = document.getElementById("btProxPag");
const tabela = document.getElementById("tabela");
const tabelaFetch = document.getElementById("tabelaFetch");

function exibirTabela() {
  for (let i = 0; i < pessoas.length; ++i) {
    const trNode = document.createElement("tr");
    const tdNode1 = document.createElement("td");
    const tdNode2 = document.createElement("td");
    const tdNode3 = document.createElement("td");
    tdNode1.innerText = i + 1;
    tdNode2.innerText = pessoas[i].nome;
    tdNode3.innerText = pessoas[i].idade;
    trNode.appendChild(tdNode1);
    trNode.appendChild(tdNode2);
    trNode.appendChild(tdNode3);
    tabela.appendChild(trNode);
  }
}
function exibirTabelaStarWars() {
  btProxPag.disabled = nextPage == null;
  for (let i = 0; i < people.length; ++i) {
    let str = "";
    for (let campo in people[i]) {
      str += `${objTraducao[campo]}: ${people[i][campo]}\n`;
    }
    const trNode = document.createElement("tr");
    const tdNode1 = document.createElement("td");
    const tdNode2 = document.createElement("td");
    const tdNode3 = document.createElement("td");
    const tdNode4 = document.createElement("td");
    const tdNode5 = document.createElement("td");
    const tdNode6 = document.createElement("td");
    const tdNode7 = document.createElement("td");

    tdNode1.innerText = people[i].name;
    tdNode2.innerText = people[i].birth_year;
    tdNode3.innerText = people[i].height;
    tdNode4.innerText = people[i].mass;
    tdNode5.innerText = people[i].hair_color;
    tdNode6.innerText = people[i].eye_color;
    tdNode7.innerText = people[i].gender;

    trNode.appendChild(tdNode1);
    trNode.appendChild(tdNode2);
    trNode.appendChild(tdNode3);
    trNode.appendChild(tdNode4);
    trNode.appendChild(tdNode5);
    trNode.appendChild(tdNode6);
    trNode.appendChild(tdNode7);

    tabelaFetch.appendChild(trNode);
  }
}

const fetchStarWarsPeople = () => {
  fetch(currentPage)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      people = data.results;
      nextPage = data.next;
      exibirTabelaStarWars();
    })
    .catch((err) => {
      console.log("Erro recebido: ", err);
    });
};

const fetchProxPag = () => {
  currentPage = nextPage;
  nextPage = null;
  fetchStarWarsPeople();
};

exibirTabela();
