function getDatiCompleti() {
    const iban = document.getElementById('iban').textContent;
    const beneficiario = document.getElementById('beneficiario').textContent;
    const causale = document.getElementById('causale').textContent;
    
    return `📋 DATI PER IL BONIFICO\n\n💳 IBAN: ${iban}\n👤 Beneficiario: ${beneficiario}\n📝 Causale: ${causale}`;
}

function copia(campo) {
    const elemento = document.getElementById(campo);
    const testo = elemento.textContent;
    
    const textarea = document.createElement('textarea');
    textarea.value = testo;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        const btn = document.querySelector(`[data-field="${campo}"]`);
        btn.classList.add('copied');
        mostraNotifica('Copiato!');
        
        setTimeout(() => {
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Errore nella copia', err);
    }
    
    document.body.removeChild(textarea);
}

function copiaTutto() {
    const testo = getDatiCompleti();
    
    const textarea = document.createElement('textarea');
    textarea.value = testo;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        mostraNotifica('Tutti i dati copiati!');
    } catch (err) {
        console.error('Errore nella copia', err);
    }
    
    document.body.removeChild(textarea);
}

function condividiWhatsApp() {
    const testo = encodeURIComponent(getDatiCompleti());
    window.open(`https://wa.me/?text=${testo}`, '_blank');
}

function condividiTelegram() {
    const testo = encodeURIComponent(getDatiCompleti());
    window.open(`https://t.me/share/url?url=&text=${testo}`, '_blank');
}

function mostraNotifica(messaggio) {
    const notifica = document.getElementById('notification');
    notifica.textContent = messaggio;
    notifica.classList.add('show');
    
    setTimeout(() => {
        notifica.classList.remove('show');
    }, 2000);
}