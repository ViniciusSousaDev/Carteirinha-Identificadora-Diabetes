const inputs = document.querySelectorAll('#cardForm input, #cardForm textarea, #cardForm select');
const preview = document.getElementById('cardPreview');
const generateBtn = document.getElementById('generateBtn');
const thankYouScreen = document.getElementById('thankYouScreen');
const mainContent = document.getElementById('mainContent');
const backBtn = document.getElementById('backBtn');


// máscara de telefone
document.getElementById('emergencyContact').addEventListener('input', (e)=>{
let v = e.target.value.replace(/\D/g,'');
if(v.length > 11) v = v.slice(0,11);
if(v.length > 6) e.target.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
else if(v.length > 2) e.target.value = `(${v.slice(0,2)}) ${v.slice(2)}`;
else e.target.value = v;
renderCard();
});


function renderCard(){
const name = document.getElementById('name').value || '—';
const type = document.getElementById('diabetesType').value;
const insulin = document.getElementById('usesInsulin').value;
const contact = document.getElementById('emergencyContact').value || '—';
const notes = document.getElementById('notes').value || '';
const style = document.getElementById('cardStyle').value;


preview.className = `card ${style}`;
preview.innerHTML = `
<div class="header">Portador de Diabetes — ${type}</div>
<div class="body">
<div><strong>Nome:</strong> ${escapeHtml(name)}</div>
<div><strong>Uso de insulina:</strong> ${escapeHtml(insulin)}</div>
<div><strong>Contato de emergência:</strong> ${escapeHtml(contact)}</div>
<div><strong>Observações:</strong> ${escapeHtml(notes)}</div>
</div>
<div class="footer">Em caso de emergência, informe que esta pessoa é diabética.</div>
`;
}


function escapeHtml(text){
return text.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}


inputs.forEach(el => el.addEventListener('input', renderCard));
renderCard();


generateBtn.addEventListener('click', async ()=>{
renderCard();
const canvas = await html2canvas(preview, {scale:2, useCORS:true});
const imgData = canvas.toDataURL('image/png');
const { jsPDF } = window.jspdf;
const pdf = new jsPDF({unit:'mm', format:[85,55]});
pdf.addImage(imgData,'PNG',0,0,85,55);
pdf.save('carteirinha_diabetes.pdf');


// Transição suave para tela de agradecimento
mainContent.classList.add('fade-out');
setTimeout(()=>{
mainContent.classList.add('hidden');
thankYouScreen.classList.remove('hidden');
thankYouScreen.classList.add('fade-in');
},600);
});


backBtn.addEventListener('click', ()=>{
thankYouScreen.classList.add('fade-out');
setTimeout(()=>{
thankYouScreen.classList.add('hidden');
mainContent.classList.remove('hidden');
mainContent.classList.add('fade-in');
},600);
});