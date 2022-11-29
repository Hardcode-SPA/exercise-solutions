# Currency converter

Create a currency converter webpage. The page should convert the given currency to the chosen one.

- The user will be able to select a crypto currency and input the price
- Then, the user will be able to convert the crypto currency into another selected currency e.g. USD/EUR etc
- Allow to user to choose either BTC, ETH or LTC for the cryptocurrency
- Allow to user to choose either EUR, GBP or USD for the currency
- The result will, then, be displayed to the user

## Instructions

- Use the coinbase API to get the spot price; https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-prices#get-spot-price
  - Note: some APIs have usage limitations; too many requests too quickly might limit your access
  - Example query: https://api.coinbase.com/v2/prices/LTC-EUR/spot

Example once your program is running properly (ignore dropdown values):

![preview](./demo.gif)