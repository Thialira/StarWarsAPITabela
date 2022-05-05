Parse.initialize(
  "GFjqPA0w6c4es7Bmor5l6AqFti79XWWbJNJAEeoW",
  "RNJP7VxHQAG9q3kNFG6U6bNyN364P0jLW5wF7pSh"
);
Parse.serverURL = "https://parseapi.back4app.com/";

let vetPersonagens = [];
const lista = document.getElementById("lista");
const inputNome = document.getElementById("inputNome");
const inputAlbum = document.getElementById("inputAnoCriacao");
const inputMusica = document.getElementById("inputMusica");
const inputLancamento = document.getElementById("inputLancamento");
const btn = document.getElementById("btnInserir");

function gerarLista() {
  lista.innerHTML = "";
  for (let i = 0; i < vetBandas.length; ++i) {
    const li = document.createElement("li");
    const txt = document.createTextNode(
      `Nome: ${vetBandas[i].Nome} || Ano Criacao: ${vetBandas[i].AnoCriacao} || Musica: ${vetBandas[i].Musica}  ||  Lancamento: ${vetBandas[i].Lancamento}`
    );
    li.appendChild(txt);
    lista.appendChild(li);
  }
}

const gerar = async () => {
  const Bandas = Parse.Object.extend("Bandas");
  const query = new Parse.Query(Bandas);
  try {
    const results = await query.find();
    vetBandas = [];
    for (const object of results) {
      const Nome = object.get("Nome");
      const AnoCriacao = object.get("AnoCriacao");
      const Musica = object.get("Musica");
      const Lancamento = object.get("Lancamento");
      vetBandas.push({ Nome, AnoCriacao, Musica, Lancamento });
    }
    gerarLista();
  } catch (error) {
    console.error("Error while fetching Bandas", error);
  }
};

const inserir = async () => {
  const myNewObject = new Parse.Object("Bandas");
  myNewObject.set("Nome", inputNome.value);
  myNewObject.set("AnoCriacao", Number(inputAnoCriacao.value));
  myNewObject.set("Musica", inputMusica.value);
  myNewObject.set("Lancamento", inputLancamento.value);

  try {
    const result = await myNewObject.save();
    console.log("Bandas created", result);
    gerar();
    inputNome.value = "";
    inputAnoCriacao.value = "";
    inputLancamento.value = "";
  } catch (error) {
    console.error("Error while creating Bandas: ", error);
  }
};

gerar();

btn.onclick = inserir;
