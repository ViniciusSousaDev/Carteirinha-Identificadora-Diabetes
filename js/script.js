const inputs = document.querySelectorAll('#cardForm input, #cardForm textarea, #cardForm select');
});


document.getElementById('emergencyContact').addEventListener('input', e => {
let v = e.target.value.replace(/\D/g,'');
if(v.length > 11) v = v.slice(0,11);
if(v.length > 6) e.target.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
else if(v.length > 2) e.target.value = `(${v.slice(0,2)}) ${v.slice(2)}`;
else e.target.value = v;
renderPreview();
});


function renderPreview(){
document.getElementById('previewName').textContent = document.getElementById('name').value || '—';
document.getElementById('previewType').textContent = document.getElementById('diabetesType').value;
document.getElementById('previewInsulin').textContent = document.getElementById('usesInsulin').value || '—';
document.getElementById('previewContact').textContent = document.getElementById('emergencyContact').value || '—';
document.getElementById('previewNotes').textContent = document.getElementById('notes').value || '—';
}


inputs.forEach(el => el.addEventListener('input', renderPreview));
renderPreview();


async function generateCardAsImage(){
const card = document.getElementById('cardPreview');
const canvas = await html2canvas(card, {scale:2, useCORS:true});
return canvas;
}


generatePdfBtn.addEventListener('click', async ()=>{
const canvas = await generateCardAsImage();
const imgData = canvas.toDataURL('image/png');
const { jsPDF } = window.jspdf;
const pdf = new jsPDF({unit:'mm', format:'a4'});
const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();
const cardWidth = 90, cardHeight = 55;
const x = (pageWidth - cardWidth) / 2;
const y = (pageHeight - cardHeight) / 2;
pdf.addImage(imgData,'PNG',x,y,cardWidth,cardHeight);
pdf.save('carteirinha_diabetes.pdf');
transitionToThankYou();
});


generatePngBtn.addEventListener('click', async ()=>{
const canvas = await generateCardAsImage();
const link = document.createElement('a');
link.download = 'carteirinha_diabetes.png';
link.href = canvas.toDataURL();
link.click();
transitionToThankYou();
});


function transitionToThankYou(){
mainContent.classList.add('fade-out');
setTimeout(()=>{
mainContent.classList.add('hidden');
thankYouScreen.classList.remove('hidden');
thankYouScreen.classList.add('fade-in');
},600);
}


backBtn.addEventListener('click', ()=>{
thankYouScreen.classList.add('fade-out');
setTimeout(()=>{
thankYouScreen.classList.add('hidden');
mainContent.classList.remove('hidden');
mainContent.classList.add('fade-in');
},600);
});