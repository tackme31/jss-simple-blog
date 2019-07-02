import React from 'react';
import { t } from 'i18next';

const SearchBox = (props) => (
  <div>
    <h4>{t('search')}</h4>
    <form method='get' action='/'>
      <input type='search' name='keywords' placeholder={t('search-by-keywords')} />
      <input type='submit' value='Search' />
    </form>
  </div>
);

export default SearchBox;
