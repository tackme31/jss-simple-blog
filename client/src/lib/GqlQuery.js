import React from 'react';
import { Query } from 'react-apollo';
import {
  withSitecoreContext,
  resetExperienceEditorChromes
} from '@sitecore-jss/sitecore-jss-react';

class GqlQuery extends React.Component {
  render() {
    const { query, sitecoreContext, rendering } = this.props;

    // disable SSR if page shows in Experience Editor or query has subscription
    const isExperienceEditor = sitecoreContext && sitecoreContext.pageState !== 'normal';
    const hasSubscription = query.definitions.some((def) => def.kind === 'OperationDefinition' && def.operation === 'subscription');

    // get variable names from query
    const variables = this.props.variables || {};
    const variableNames = extractVariableNames(query);

    // set the datasource variable, if we're using it
    if (variableNames.datasource && rendering && rendering.dataSource) {
      variables.datasource = rendering.dataSource;
    }

    // set the contextItem variable, if we're using it
    if (variableNames.contextItem && sitecoreContext && sitecoreContext.itemId) {
      variables.contextItem = sitecoreContext.itemId;
    }

    return (
      <Query
        {...this.props}
        variables={variables}
        ssr={!isExperienceEditor && !hasSubscription && this.props.ssr}
      >
        {this.props.children}
      </Query>
    )
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate() {
    resetExperienceEditorChromes();
  }
}

// this is copied from ./GraphQLData.js
function extractVariableNames(query) {
  const variableNames = {};
  query.definitions
    .map((def) => def.variableDefinitions)
    .filter((def) => def)
    .forEach((defs) =>
      defs.forEach((def) => {
        if (def.kind && def.kind === 'VariableDefinition') {
          variableNames[def.variable.name.value] = true;
        }
      })
    );

  return variableNames;
}

export default withSitecoreContext()(GqlQuery);