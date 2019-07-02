import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { t } from 'i18next';
import GqlQuery from '../../lib/GqlQuery';

const query = gqlLoader('./query.graphql');

const facetComparer = (facet1, facet2) => {
  return facet1.name < facet2.name ? 1 : -2;
}
const formatMonthFacet = (facetName) => {
  const year = facetName.slice(0, 4);
  const month = facetName.slice(4) * 1;
  return year + ' / ' + month;
}

const MonthlyArchives = (props) => (
  <div>
    <h4>{t('monthly-archives')}</h4>
    <GqlQuery query={query}>
      {({ data, loading, error }) => {
        if (error) {
          return <p>{t('error')}: {error.toString()}</p>;
        }

        if (loading) {
          return <p>{t('loading')}</p>;
        }

        const yearFacet = data.result.facets.find(facet => facet.name === 'year');
        const monthFacet = data.result.facets.find(facet => facet.name === 'month');
        return (
          <ul>
            {yearFacet.values
              .sort(facetComparer)
              .map(year => (
                <React.Fragment key={year.name}>
                  <li>
                    <a href={'/?archivesOn=' + year.name}>{year.name} ({year.count})</a>
                  </li>
                  <ul>
                    {monthFacet.values
                      .filter(month => month.name.startsWith(year.name))
                      .sort(facetComparer)
                      .map(month => (
                      <li key={month.name}>
                        <a href={'/?archivesOn=' + month.name}>{formatMonthFacet(month.name)} ({month.count})</a>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
          </ul>
        );
      }}
    </GqlQuery>
  </div>
);

export default MonthlyArchives;
