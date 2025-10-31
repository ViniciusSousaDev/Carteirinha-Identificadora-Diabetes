const form = document.getElementById("form");
const gerarBtn = document.getElementById("gerar");
const baixarBtn = document.getElementById("baixar");

const nomePreview = document.getElementById("nome-preview");
const tipoPreview = document.getElementById("tipo-preview");
const insulinaPreview = document.getElementById("insulina-preview");
const contatoPreview = document.getElementById("contato-preview");
const observacoesPreview = document.getElementById("observacoes-preview");
const fotoPreview = document.getElementById("foto-preview");

document.getElementById("foto").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fotoPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function atualizarPreview() {
  nomePreview.textContent = document.getElementById("nome").value || "—";
  tipoPreview.textContent = document.getElementById("tipo").value || "—";
  insulinaPreview.textContent = document.getElementById("insulina").value || "—";
  contatoPreview.textContent = document.getElementById("contato").value || "—";
  observacoesPreview.textContent = document.getElementById("observacoes").value || "—";
}

form.addEventListener("input", atualizarPreview);

gerarBtn.addEventListener("click", () => {
  atualizarPreview();
  alert("Carteirinha gerada com sucesso 🎉");
});

baixarBtn.addEventListener("click", async () => {
  const preview = document.getElementById("preview");
  const canvas = await html2canvas(preview);
  const link = document.createElement("a");
  link.download = "carteirinha.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
