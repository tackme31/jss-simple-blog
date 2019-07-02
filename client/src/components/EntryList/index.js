import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { withRouter } from 'react-router';
import { t } from 'i18next';
import queryString from 'querystring'
import { getFieldValue } from '@sitecore-jss/sitecore-jss-react';
import GqlQuery from '../../lib/GqlQuery';
import EntryOverview from '../EntryOverview';

const query = gqlLoader('./query.graphql');

class EntryList extends React.Component {
  urlQuery = parseSearch(this.props.location.search);

  render() {
    const currentPage = parseInt(this.urlQuery.page) || 1;
    const pageSize = getFieldValue(this.props.fields, 'pageSize');

    return (
      <GqlQuery
        query={query}
        variables={{
          offset: (currentPage - 1) * pageSize,
          limit: pageSize,
          keywords: (this.urlQuery.keywords || '').split(' ').filter(k => k),
          tags: this.urlQuery.tag ? [this.urlQuery.tag] : [],
          archivesOn: this.urlQuery.archivesOn
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (error) {
            return <p>{t('error')}: {error.toString()}</p>;
          }

          if (loading) {
            return <p>{t('loading')}</p>;
          }

          if (!data.result.entries.length) {
            return <p>{t('no-entries')} (<a href='/'>{t('go-to-top')}</a>)</p>;
          }

          return (
            <div>
              {data.result.entries.map(entry => <EntryOverview key={entry.id} entry={entry} />)}
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: data.result.entries.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult.result.entries.length) {
                        return prev;
                      }

                      fetchMoreResult.result.entries = [
                        ...prev.result.entries,
                        ...fetchMoreResult.result.entries
                      ];

                      return fetchMoreResult;
                    }
                  });
                }}
              >
                {t('load-more')}
              </button>
            </div>
          );
        }}
      </GqlQuery>
    )
  }
};

function parseSearch(search) {
	if (!search) {
		return {};
	}

	if (search[0] === '?') {
		search = search.substr(1);
	}

	return queryString.parse(search);
}

export default withRouter(EntryList);
