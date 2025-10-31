// Atualizar preview em tempo real
function atualizarPreview() {
    document.getElementById("preview-nome").textContent = document.getElementById("nome").value || "-";
    document.getElementById("preview-nascimento").textContent = document.getElementById("nascimento").value || "-";
    document.getElementById("preview-tipo").textContent = document.getElementById("tipo").value || "-";
    document.getElementById("preview-medicamentos").textContent = document.getElementById("medicamentos").value || "-";
    document.getElementById("preview-contato").textContent = document.getElementById("contato").value || "-";
    document.getElementById("preview-observacoes").textContent = document.getElementById("observacoes").value || "-";
}

// Adicionar event listeners para todos os campos do formulário
document.querySelectorAll("#carteirinhaForm input, #carteirinhaForm select, #carteirinhaForm textarea").forEach(element => {
    element.addEventListener("input", atualizarPreview);
    element.addEventListener("change", atualizarPreview);
});

// Inicializar o preview
atualizarPreview();

// Gerar PDF (código original mantido)
document.getElementById("gerarPDF").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [85, 55] // tamanho de carteirinha aproximado
    });

    const nome = document.getElementById("nome").value;
    const nascimento = document.getElementById("nascimento").value;
    const tipo = document.getElementById("tipo").value;
    const medicamentos = document.getElementById("medicamentos").value;
    const contato = document.getElementById("contato").value;
    const observacoes = document.getElementById("observacoes").value;

    // Fundo da carteirinha
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 85, 55, "F");

    // Informações do usuário
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("CARTEIRINHA DE DIABÉTICO", 42.5, 8, { align: "center" });

    doc.setFontSize(8);
    doc.text(`Nome: ${nome}`, 5, 20);
    doc.text(`Nascimento: ${nascimento}`, 5, 26);
    doc.text(`Tipo: ${tipo}`, 5, 32);
    doc.text(`Medicamentos: ${medicamentos}`, 5, 38);
    doc.text(`Contato Emergência: ${contato}`, 5, 44);
    doc.text(`Observações: ${observacoes}`, 5, 50);

    doc.save("carteirinha.pdf");
});