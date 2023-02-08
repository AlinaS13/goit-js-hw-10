import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`
  )
    .then(response => {
      if (!response.ok || response.status === 404) {
        throw Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(result => {
      countryInfo.textContent = '';
      countryList.textContent = '';
      if (result.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (result.length > 1) {
        const markap = result.map(
          ({ name, flag }) =>
            `<li><div class="wrap"><img src=${flag} alt="flag" width="40"/><h3>${name}</h3></div></li>`
        );
        countryList.insertAdjacentHTML('beforeend', markap.join(''));
      } else {
        const country = result.map(
          ({ name, capital, population, flag, languages }) =>
            `<div class="wrap"><img src=${flag} alt="flag" width="50"/><h2>${name}</h2></div><p><strong>Capital:</strong> ${capital}</p><p><strong>Population:</strong> ${population}</p><p><strong>Languages:</strong> ${Object.value(
              languages
            )}</p>`
        );
        countryInfo.insertAdjacentHTML('beforeend', country.join(''));
      }
    })
    .catch(error => {
      Notify.failure(error.message);
      countryList.textContent = '';
      countryInfo.textContent = '';
    });
}

export { fetchCountries, countryList, countryInfo };
