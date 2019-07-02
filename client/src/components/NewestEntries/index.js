import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { t } from 'i18next';
import GqlQuery from '../../lib/GqlQuery';

const query = gqlLoader('./query.graphql');

const NewestEntries = () => {
  return (
    <div>
      <h4>{t('newest-entries')}</h4>
      <GqlQuery
        query={query}
        variables={{
          count: 5
        }}
      >
        {({ data, loading, error }) => {
          if (error) {
            return <p>{t('error')}: {error.toString()}</p>;
          }

          if (loading) {
            return <p>{t('loading')}</p>;
          }

          return (
            <ul>
              {data.result.entries.map(entry => (
                <li key={entry.id}>
                  <a href={entry.url}>{entry.title.value}</a>
                </li>
              ))}
            </ul>
          );
        }}
      </GqlQuery>
    </div>
  )
};

export default NewestEntries;
