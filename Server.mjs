import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

// CORS configuration to allow requests from your frontend's URL
const corsOptions = {
  origin: 'https://restapicodingchallenge.onrender.com', 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const getFilteredCountries = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map(country => ({
      name: country.name,
      capital: country.capital,
      population: country.population,
      flag: country.flags.svg,
      languages: country.languages,
      independent: country.independent,
      timezones: country.timezones,
      currencies: country.currencies
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching countries');
  }
}

app.get('/api', async (req, res) => {
  const countries = await getFilteredCountries('https://restcountries.com/v3.1/all');
  res.json({ countries });
});

app.get('/api/region/:region', async (req, res) => {
  const countries = await getFilteredCountries(`https://restcountries.com/v3.1/region/${req.params.region}`);
  res.json({ countries });
});

app.get('/api/subregion/:subregion', async (req, res) => {
  const countries = await getFilteredCountries(`https://restcountries.com/v3.1/subregion/${req.params.subregion}`);
  res.json({ countries });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
