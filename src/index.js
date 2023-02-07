import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries, countryList, countryInfo } from './fetchCountries';

const DEBOUNCE_DELAY = 400;

const input = document.getElementById('search-box');
console.log(input);

const debounced = debounce(() => {
  if (input.value.trim() === '') {
    countryList.textContent = '';
    countryInfo.textContent = '';
    return;
  }
  fetchCountries(input.value.trim());
}, DEBOUNCE_DELAY);

input.addEventListener('input', debounced);
