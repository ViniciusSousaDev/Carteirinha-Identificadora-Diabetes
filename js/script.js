// Atualizar preview em tempo real
function atualizarPreview() {
    document.getElementById("preview-nome").textContent = document.getElementById("nome").value || "-";
    document.getElementById("preview-nascimento").textContent = formatarData(document.getElementById("nascimento").value) || "-";
    document.getElementById("preview-tipo").textContent = document.getElementById("tipo").value || "-";
    document.getElementById("preview-medicamentos").textContent = document.getElementById("medicamentos").value || "-";
    document.getElementById("preview-contato").textContent = document.getElementById("contato").value || "-";
    document.getElementById("preview-parentesco").textContent = document.getElementById("parentesco").value || "-";
    document.getElementById("preview-endereco").textContent = document.getElementById("endereco").value || "-";
}

// Formatar data para DD/MM/AAAA
function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Adicionar event listeners para todos os campos do formulário
document.querySelectorAll("#carteirinhaForm input, #carteirinhaForm select, #carteirinhaForm textarea").forEach(element => {
    element.addEventListener("input", atualizarPreview);
    element.addEventListener("change", atualizarPreview);
});

// Inicializar o preview
atualizarPreview();

// Gerar PDF na HORIZONTAL
document.getElementById("gerarPDF").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape", // Alterado para horizontal
        unit: "mm",
        format: [85, 54] // Formato carteirinha horizontal (padrão)
    });

    const nome = document.getElementById("nome").value;
    const nascimento = formatarData(document.getElementById("nascimento").value);
    const tipo = document.getElementById("tipo").value;
    const medicamentos = document.getElementById("medicamentos").value;
    const contato = document.getElementById("contato").value;
    const parentesco = document.getElementById("parentesco").value;
    const endereco = document.getElementById("endereco").value;

    // Fundo da carteirinha com gradiente
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 85, 54, "F");

    // Cabeçalho
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("SOU DIABÉTICO", 42.5, 8, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(tipo, 42.5, 13, { align: "center" });

    // Linha divisória
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    doc.line(5, 16, 80, 16);

    // Informações em duas colunas
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    
    // Coluna esquerda
    doc.text("Nome:", 5, 20);
    doc.setFont(undefined, 'bold');
    doc.text(nome, 20, 20);
    
    doc.setFont(undefined, 'normal');
    doc.text("Contato de Emergência:", 5, 25);
    doc.setFont(undefined, 'bold');
    doc.text(contato, 32, 25);
    
    doc.setFont(undefined, 'normal');
    doc.text("Parentesco:", 5, 30);
    doc.setFont(undefined, 'bold');
    doc.text(parentesco, 22, 30);

    // Coluna direita
    doc.setFont(undefined, 'normal');
    doc.text("Nascimento:", 45, 20);
    doc.setFont(undefined, 'bold');
    doc.text(nascimento, 60, 20);
    
    doc.setFont(undefined, 'normal');
    doc.text("Endereço:", 45, 25);
    doc.setFont(undefined, 'bold');
    doc.text(endereco, 55, 25);
    
    doc.setFont(undefined, 'normal');
    doc.text("Medicamentos:", 45, 30);
    doc.setFont(undefined, 'bold');
    doc.text(medicamentos, 60, 30);

    doc.save("carteirinha_diabetico.pdf");
});