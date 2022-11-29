'use strict';

// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

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
        let exchangeRate = await fetchExchangeRate(cryptoCurrencySelect.value, fiatCurrencySelect.value);
        
        // Wenn Ergebnis nicht null
        if (exchangeRate) {
            // Berechne Fiatwaehrungsbetrag anhand des Wechselkurses
            let amountFiatCurrency = (cryptoAmountInput.value * exchangeRate).toFixed(2);

            // Trage Fiatwaehrungsbetrag in Input ein
            fiatAmountInput.value = amountFiatCurrency;
        }
    }
});
