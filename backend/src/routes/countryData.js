const router = require("express").Router();
const verifyToken = require("../middleware");
const axios = require('axios');

// Endpoint to get country data by name
router.get('/country/:countryName',verifyToken, async (req, res) => {
  try {
      const countryName = req.params.countryName;

      // Fetch country data from REST Countries API
      const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      const countryData = countryResponse.data[0];

      if (!countryData) {
          return res.status(404).json({ message: 'Country not found.' });
      }
      const countryCurrencies = countryData.currencies;

      // Fetch exchange rate data from ExchangeRate-API
      const exchangeRateResponse = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=ACCESS_KEY&format=1`);
      const exchangeRateData = exchangeRateResponse.data;
      if (!exchangeRateData) {
          return res.status(500).json({ message: 'Could not fetch exchange rate data.' });
      }

      // gathering data in object to return response
      let reponseData = {
        country : countryData.name.common,
        official: countryData.name.official,
        population : countryData.population
    }

      //De-structuring the data by Mapping the currencies to include exchange rates
      const currenciesWithRates = Object.keys(countryCurrencies).map(code => {
        const currencyName = countryCurrencies[code].name;
        const rateToEUR = exchangeRateData.rates[code] || 'N/A';
        reponseData.symbol = code;
        reponseData.rateToEUR = rateToEUR;
        reponseData.perRateToEur = rateToEUR;
        reponseData.currency = currencyName;
        return { code, name: currencyName, rateToEUR };
      });

      // Return the data
      res.json(reponseData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;
