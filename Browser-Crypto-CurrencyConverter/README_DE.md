# Währungsumrechner

Erstelle eine Webseite mit einem Währungsumrechner. Die Seite soll die angegebene Währung in die gewählte Währung umrechnen.

- Der Nutzer kann eine Kryptowährung auswählen und den Preis eingeben.
- Dann kann der Nutzer die Kryptowährung in eine andere ausgewählte Währung umrechnen, z. B. USD/EUR usw.
- Der Nutzer kann entweder BTC, ETH oder LTC als Kryptowährung auswählen
- Der Nutzer kann entweder EUR, GBP oder USD als Währung wählen.
- Das Ergebnis wird dem Nutzer dann angezeigt

## Anweisungen

- Verwende die Coinbase-API, um den Kassakurs zu ermitteln; https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-prices#get-spot-price
  - Hinweis: Einige APIs haben Nutzungsbeschränkungen; zu viele Anfragen in zu kurzer Zeit können deinen Zugang einschränken
  - Beispielabfrage: https://api.coinbase.com/v2/prices/LTC-EUR/spot

Beispiel, sobald dein Programm richtig läuft (ignoriere die Dropdown-Werte):

![Vorschau](./demo.gif)