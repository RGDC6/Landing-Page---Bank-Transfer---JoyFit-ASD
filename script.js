/**
 * 1. FUNZIONE AGGIORNA PULSANTI
 * Gestisce l'abilitazione dei tasti e chiude il selettore su mobile
 */
function aggiornaPulsanti() {
    const select = document.getElementById('causale');
    const isSelezionato = select.value !== '';
    
    // FORZA LA CHIUSURA SU MOBILE
    if (isSelezionato) {
        select.blur(); // Rimuove il focus e chiude la tendina/tastiera
    }

    // Abilita/Disabilita i pulsanti
    document.getElementById('copyCausale').disabled = !isSelezionato;
    document.getElementById('whatsappBtn').disabled = !isSelezionato;
    document.getElementById('copyAllBtn').disabled = !isSelezionato;
}

/**
 * 2. FUNZIONE COPIA SINGOLO CAMPO
 */
function copia(campo) {
    const elemento = document.getElementById(campo);
    let testo = (campo === 'causale') ? elemento.value : elemento.textContent;

    if (campo === 'causale' && !testo) {
        mostraNotifica('Seleziona prima una causale!');
        return;
    }

    eseguiCopia(testo);
    
    const btn = document.querySelector(`[data-field="${campo}"]`);
    if (btn) {
        btn.classList.add('copied');
        mostraNotifica('Copiato!');
        setTimeout(() => btn.classList.remove('copied'), 2000);
    }
}

/**
 * 3. FUNZIONE COPIA TUTTO
 */
function copiaTutto() {
    const causale = document.getElementById('causale').value;
    if (!causale) {
        mostraNotifica('Seleziona una causale!');
        return;
    }

    const iban = document.getElementById('iban').textContent;
    const beneficiario = document.getElementById('beneficiario').textContent;
    const testoCompleto = `DATI BONIFICO:\n\n IBAN: ${iban}\n Beneficiario: ${beneficiario}\n Causale: ${causale}`;
    
    eseguiCopia(testoCompleto);
    mostraNotifica('Tutti i dati copiati!');
}

/**
 * 4. CONDIVISIONE WHATSAPP
 */
function condividiWhatsApp() {
    const causale = document.getElementById('causale').value;
    const iban = document.getElementById('iban').textContent;
    const beneficiario = document.getElementById('beneficiario').textContent;
    
    const messaggio = `📋 *DATI BONIFICO*\n\n💳 *IBAN:* ${iban}\n👤 *Benef:* ${beneficiario}\n📝 *Causale:* ${causale}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(messaggio)}`, '_blank');
}

/**
 * LOGICA DI COPIA (Helper)
 */
function eseguiCopia(testo) {
    const area = document.createElement('textarea');
    area.value = testo;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
}

/**
 * MOSTRA NOTIFICA
 */
function mostraNotifica(messaggio) {
    const notifica = document.getElementById('notification');
    notifica.textContent = messaggio;
    notifica.classList.add('show');
    setTimeout(() => notifica.classList.remove('show'), 2000);
}