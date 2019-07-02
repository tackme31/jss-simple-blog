import React from 'react';
import moment from 'moment';
import {
  getFieldValue,
  withSitecoreContext,
  DateField,
  Text,
} from '@sitecore-jss/sitecore-jss-react';

const EntryDetail = ({ sitecoreContext: context }) => {
  const { fields } = context.route;
  const tags = getFieldValue(fields, 'tags').split(' ').filter(t => t);
  const date = moment(getFieldValue(fields, 'datetime'));

  return (
    <article>
      <header>
        <DateField field={fields.datetime} tag='time' render={() => (
          <time>{date.format('YYYY/M/D')}</time>
        )} />
        <Text field={fields.title} tag='h1' />
        <ul>
          {tags.map((tag, index) => (<li key={index}>{tag}</li>))}
        </ul>
      </header>
      <div>
        <Text field={fields.introduction} tag='p' />
        <Text field={fields.body} tag='p' />
      </div>
      <footer>
        <Text field={fields.author.fields.fullname} editable={false} tag='p' />
        <p>{date.fromNow()}</p>
        <p>Social buttons here.</p>
      </footer>
    </article>
  );
};

export default withSitecoreContext()(EntryDetail);