// http://data.fixer.io/api/latest?access_key=d7ea219dbf3c01a833e9982926331c64
// https://restcountries.eu/rest/v2/currency/cop
const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=d7ea219dbf3c01a833e9982926331c64').then((response)=>{
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate; 
//     });
// };

const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=d7ea219dbf3c01a833e9982926331c64');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate; 
};

// const getCountries = (currencyCode)=>{
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=>{
//         return response.data.map((country) => country.name);
//     });
    
// };
const getCountries = async (currencyCode)=>{
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name); 
};

const convertCurrency = (from, to, amount) => {
    let convertedAmount;
    return getExchangeRate(from, to).then((rate)=>{
        convertedAmount = (amount * rate).toFixed(2);
        //console.log(convertedAmount);
        return getCountries(to);
    }).then((countries)=>{
        //console.log(countries);
        return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
    });
};
//---------------------------------------------
// getExchangeRate('USD', 'CAD').then((rate)=>{
//     console.log(rate);
// });
// getCountries('CAD').then((countries)=>{
//     console.log(countries);
// });

convertCurrency('USD', 'EUR', 20).then((message)=>{
    console.log(message);
});