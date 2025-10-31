let userPhoto = null;

// Gerenciar upload de foto
document.getElementById("foto").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userPhoto = e.target.result;
            // Atualizar preview
            const previewPhoto = document.getElementById("preview-photo");
            previewPhoto.innerHTML = `<img src="${userPhoto}" alt="Foto">`;
        };
        reader.readAsDataURL(file);
    }
});

// Atualizar preview em tempo real
function atualizarPreview() {
    document.getElementById("preview-nome").textContent = document.getElementById("nome").value || "-";
    document.getElementById("preview-nascimento").textContent = formatarData(document.getElementById("nascimento").value) || "-";
    document.getElementById("preview-tipo").textContent = document.getElementById("tipo").value || "-";
    document.getElementById("preview-medicamentos").textContent = document.getElementById("medicamentos").value || "-";
    document.getElementById("preview-contato").textContent = document.getElementById("contato").value || "-";
    document.getElementById("preview-parentesco").textContent = document.getElementById("parentesco").value || "-";
    document.getElementById("preview-endereco").textContent = document.getElementById("endereco").value || "-";
    document.getElementById("preview-observacoes").textContent = document.getElementById("observacoes").value || "-";
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
document.getElementById("gerarPDF").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85, 54]
    });

    const nome = document.getElementById("nome").value;
    const nascimento = formatarData(document.getElementById("nascimento").value);
    const tipo = document.getElementById("tipo").value;
    const medicamentos = document.getElementById("medicamentos").value;
    const contato = document.getElementById("contato").value;
    const parentesco = document.getElementById("parentesco").value;
    const endereco = document.getElementById("endereco").value;
    const observacoes = document.getElementById("observacoes").value;

    // Fundo da carteirinha
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 85, 54, "F");

    // Adicionar foto se existir
    if (userPhoto) {
        doc.addImage(userPhoto, 'JPEG', 5, 5, 15, 20);
    } else {
        // Retângulo para área da foto
        doc.setDrawColor(255, 255, 255);
        doc.setFillColor(255, 255, 255, 0.2);
        doc.rect(5, 5, 15, 20, 'F');
        doc.setTextColor(255, 255, 255, 0.5);
        doc.setFontSize(6);
        doc.text("FOTO", 12.5, 15, { align: "center" });
    }

    // Cabeçalho
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("SOU DIABÉTICO", 55, 8, { align: "center" });
    
    doc.setFontSize(7);
    doc.text(tipo, 55, 12, { align: "center" });

    // Linha divisória
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    doc.line(22, 16, 82, 16);

    // Configurações de texto
    doc.setFontSize(6);
    doc.setFont(undefined, 'normal');

    // Coluna esquerda
    let yPos = 20;
    
    // Nome (com quebra de linha se necessário)
    const nomeLines = doc.splitTextToSize(nome, 25);
    doc.text("Nome:", 22, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(nomeLines, 28, yPos);
    doc.setFont(undefined, 'normal');
    yPos += nomeLines.length * 3 + 2;

    doc.text("Nascimento:", 22, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(nascimento, 35, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 4;

    doc.text("Contato Emergência:", 22, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(contato, 40, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 4;

    // Coluna direita
    yPos = 20;
    
    doc.text("Parentesco:", 50, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(parentesco, 60, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 4;

    // Endereço (com quebra de linha)
    const enderecoLines = doc.splitTextToSize(endereco, 30);
    doc.text("Endereço:", 50, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(enderecoLines, 58, yPos);
    doc.setFont(undefined, 'normal');
    yPos += enderecoLines.length * 3 + 2;

    doc.text("Medicamentos:", 50, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(medicamentos, 63, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 4;

    // Observações
    if (observacoes) {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.2);
        doc.line(22, 38, 82, 38);
        
        doc.text("Observações:", 22, 41);
        doc.setFont(undefined, 'bold');
        const obsLines = doc.splitTextToSize(observacoes, 55);
        doc.text(obsLines, 32, 41);
    }

    doc.save("carteirinha_diabetico.pdf");
});