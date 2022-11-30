'use strict';

// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import {Toast} from 'bootstrap';


// Import our custom JS
import { fetchExchangeRate } from './data.js';
/* -------------------------------------------------------------------------------  */

let calculatorForm = document.querySelector('#app > form');
calculatorForm.addEventListener('input', async evt => {
    let cryptoCurrencySelect = calculatorForm.querySelector('#select-crypto');
    let cryptoAmountInput = calculatorForm.querySelector('#input-crypto-amount');
    let fiatCurrencySelect = calculatorForm.querySelector('#select-fiat');
    let fiatAmountInput = calculatorForm.querySelector('#input-fiat-amount');

    // Pruefe, ob Eingaben alle getroffen wurden
    if (
        cryptoCurrencySelect.value !== 'none'
        && fiatCurrencySelect.value !== 'none'
        && cryptoAmountInput.value.length > 0
    ) {
        // Rufe Funktion zum Abrufen des Wechselkurses fuer jeweilige Waehrungen auf
        // und erwarte Ergebnis
        let exchangeRate = await fetchExchangeRate(cryptoCurrencySelect.value, fiatCurrencySelect.value).catch((err) => {
            console.log(err);
            // Zeige Fehlertoast an
            let newToast = createToast('Error', err);
            document.querySelector('.toast-container').appendChild(newToast);
            new Toast(newToast).show();
        })
        console.log(exchangeRate)
        // Wenn Ergebnis nicht null
        if (exchangeRate) {
            // Berechne Fiatwaehrungsbetrag anhand des Wechselkurses
            let amountFiatCurrency = (cryptoAmountInput.value * exchangeRate).toFixed(2);

            // Trage Fiatwaehrungsbetrag in Input ein
            fiatAmountInput.value = amountFiatCurrency;
        }
    }
});

function createToast(title, message) {
    
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    let toastHeader = document.createElement('div');
    toastHeader.classList.add('toast-header');
    toast.appendChild(toastHeader);

    let toastIcon = document.createElement('div');
    toastIcon.classList.add('me-1');
    toastIcon.style.width = '20px';
    toastIcon.style.height = '20px';
    toastIcon.style.backgroundColor = '#ff0000BB';
    toastIcon.style.borderRadius = '5px';
    toastHeader.appendChild(toastIcon);

    let toastTitle = document.createElement('strong');
    toastTitle.classList.add('me-auto');
    toastTitle.textContent = title;
    toastHeader.appendChild(toastTitle);

    let toastTimestamp = document.createElement('small');
    toastTimestamp.classList.add('text-muted');
    toastTimestamp.textContent = 'just now';
    toastHeader.appendChild(toastTimestamp);

    let toastCloseBtn = document.createElement('button');
    toastCloseBtn.classList.add('btn-close');
    toastCloseBtn.setAttribute('data-bs-dismiss', 'toast');
    toastCloseBtn.setAttribute('aria-label', 'Close');
    toastHeader.appendChild(toastCloseBtn);

    let toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.textContent = message;
    toast.appendChild(toastBody);

    return toast;
}
