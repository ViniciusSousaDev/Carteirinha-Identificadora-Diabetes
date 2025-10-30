// script.js
const nameInput = document.getElementById('name')
const typeInput = document.getElementById('diabetesType')
const insulinInput = document.getElementById('usesInsulin')
const contactInput = document.getElementById('emergencyContact')
const notesInput = document.getElementById('notes')
const preview = document.getElementById('cardPreview')
const previewBtn = document.getElementById('previewBtn')
const generateBtn = document.getElementById('generateBtn')


function renderCard(){
const name = nameInput.value || '—'
const type = typeInput.value
const insulin = insulinInput.value
const contact = contactInput.value || '—'
const notes = notesInput.value || ''


preview.innerHTML = `
<div class="top">
<div class="icon">⚕</div>
<div>
<div class="title">Portador de Diabetes — ${type}</div>
<div class="body">Nome: <strong>${escapeHtml(name)}</strong></div>
</div>
</div>
<div class="body">
<div>Uso de insulina: <strong>${escapeHtml(insulin)}</strong></div>
<div>Contato de emergência: <strong>${escapeHtml(contact)}</strong></div>
<div>Observações: <strong>${escapeHtml(notes)}</strong></div>
</div>
<div class="footer">Em caso de emergência, acione socorro e informe que a pessoa possui diabetes.</div>
`
}


function escapeHtml(text){
return text.replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]})
}


previewBtn.addEventListener('click', ()=>{
renderCard()
})


// Geração do PDF - sem enviar dados
generateBtn.addEventListener('click', async ()=>{
renderCard()
// converte a pré-visualização para canvas
const element = preview
// opções para html2canvas
const canvas = await html2canvas(element, {scale:2, useCORS:true, backgroundColor: null})
const imgData = canvas.toDataURL('imagePNG', 1.0)
// tamanhos em mm — cartão 85x55
const pdfWidth = 85
const pdfHeight = 55
const { jsPDF } = window.jspdf
const pdf = new jsPDF({unit:'mm', format:[pdfWidth, pdfHeight]})
// desenha a imagem cobrindo a página inteira
pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
// nome do arquivo com nome curta
const safeName = (nameInput.value || 'carteirinha').replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_\-]/g,'')
pdf.save(`${safeName}_carteirinha_diabetes.pdf`)
})


// Render inicial
renderCard()