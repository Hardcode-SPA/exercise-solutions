// URL-Konstanten
const API_BASE_URL = 'https://api.coinbase.com/v2';
const API_PRICE_ENDPOINT = '/prices';
const API_PRICE_SPOT_ENDPOINT = '/spot';

// TODO detailliertere Fehlerbehandlung

// Asynchrone Funktion zum Abrufen von Umrechnungsraten von Cryptowaehrungen gegenueber Fiatwaehrungen
async function fetchExchangeRate(cryptoCurrency, fiatCurrency) {
    // konstruiere Waehrungspaar String fuer Anfrage
    let currencyPair = '/' + cryptoCurrency.toUpperCase() + '-' + fiatCurrency.toUpperCase();

    // Konstruiere die gesamte Anfrage URL
    // https://api.coinbase.com/v2/prices/:currency_pair/spot
    let requestUrl = `${API_BASE_URL}${API_PRICE_ENDPOINT}${currencyPair}${API_PRICE_SPOT_ENDPOINT}`;

    // Sende Anfrage an API mittels fetch auf konstruierte URL
    let exchangeRes = await fetch(requestUrl);

    // Parse API Anwort
    let exchangeBody = await exchangeRes.json();

    // Wenn Anfrageergebnis positiv (HTTP-Statuscode 2XX)
    if (exchangeRes.ok) {
        // Extrahiere errechneten Wert und gebe zurueck
        return exchangeBody.data.amount;

    } else { // Fehlerfall der Anfrage
        // Gebe null zurueck, um Aufrufer wissen zu lassen,
        // dass Fehler entstanden ist
        return null;
    }
}

export { fetchExchangeRate };