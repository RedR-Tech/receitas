// Frases românticas do dia
const frases = [
  "Você é meu lugar favorito no mundo 💜",
  "Se eu pudesse escolher de novo, escolheria você mil vezes ✨",
  "Nosso amor é meu maior tesouro 💎",
  "Com você, até o silêncio tem poesia 🎶",
  "Meu coração sempre encontra o caminho até você 💖"
];
 
function fraseAleatoria() {
  const index = Math.floor(Math.random() * frases.length);
  document.getElementById("fraseDoDia").innerText = frases[index];
}
 
// Troca de abas
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
 
// Carregar do localStorage
let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
 
function renderReceitas() {
  let div = document.getElementById("listaReceitas");
  div.innerHTML = "";
 
  receitas.forEach((r, index) => {
 
    // --- Ingredientes ---
    // Substituir quebras de linha por vírgula, dividir por vírgula
    let ingredientesRaw = r.ingredientes.replace(/\n/g, ','); 
    let ingredientesArray = ingredientesRaw.split(',').map(i => i.trim()).filter(i => i.length > 0);
    const ingredientesLista = ingredientesArray.map(item => `<li>${item}</li>`).join('');
 
    // --- Modo de preparo ---
    let preparoRaw = r.preparo.replace(/\n/g, ','); 
    let preparoArray = preparoRaw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    const preparoLista = preparoArray.map(item => `<li>${item}</li>`).join('');
 
    div.innerHTML += `
      <div class="card">
        <h4>${r.titulo}</h4>
        <p><b>Ingredientes:</b></p>
        <ul style="text-align:left; padding-left:1.2rem; color:#f3e6ff;">
          ${ingredientesLista}
        </ul>
        <p><b>Modo de preparo:</b></p>
        <ol style="text-align:left; padding-left:1.2rem; color:#f3e6ff;">
          ${preparoLista}
        </ol>
        <div style="margin-top:10px;">
          <button onclick="editReceita(${index})" style="margin-right:5px;">✏️ Editar</button>
          <button onclick="deleteReceita(${index})" style="margin-left:5px;">🗑️ Excluir</button>
        </div>
      </div>
    `;
  });
}
 
 
// Adicionar receita (mantém igual)
function addReceita() {
  let titulo = document.getElementById("tituloReceita").value;
  let ingredientes = document.getElementById("ingredientes").value;
  let preparo = document.getElementById("preparo").value;
  if(titulo && ingredientes && preparo) {
    receitas.push({titulo, ingredientes, preparo});
    localStorage.setItem("receitas", JSON.stringify(receitas));
    renderReceitas();
    // Limpar campos
    document.getElementById("tituloReceita").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("preparo").value = "";
  }
}
 
// Editar receita
function editReceita(index) {
  const r = receitas[index];
  // Preencher campos do formulário com os valores da receita
  document.getElementById("tituloReceita").value = r.titulo;
  document.getElementById("ingredientes").value = r.ingredientes;
  document.getElementById("preparo").value = r.preparo;
 
  // Ao clicar em salvar, sobrescreve a receita
  document.querySelector(".save").onclick = function() {
    const titulo = document.getElementById("tituloReceita").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const preparo = document.getElementById("preparo").value;
    if(titulo && ingredientes && preparo) {
      receitas[index] = {titulo, ingredientes, preparo};
      localStorage.setItem("receitas", JSON.stringify(receitas));
      renderReceitas();
      // Resetar botão de salvar para adicionar nova receita
      document.querySelector(".save").onclick = addReceita;
      // Limpar campos
      document.getElementById("tituloReceita").value = "";
      document.getElementById("ingredientes").value = "";
      document.getElementById("preparo").value = "";
    }
  }
}
 
// Excluir receita
function deleteReceita(index) {
  if(confirm("Tem certeza que quer excluir esta receita?")) {
    receitas.splice(index, 1);
    localStorage.setItem("receitas", JSON.stringify(receitas));
    renderReceitas();
  }
}
 
 
function addMensagem() {
  let msg = document.getElementById("novaMensagem").value;
  if(msg) {
    mensagens.push(msg);
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
    renderMensagens();
  }
}
 
// Inicializar
fraseAleatoria();
renderReceitas();
renderMensagens();
showSection("receitas");