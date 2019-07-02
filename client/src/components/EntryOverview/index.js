import React from 'react';
import moment from 'moment';
import { t } from 'i18next';
import {
  getFieldValue,
  DateField,
  Text,
} from '@sitecore-jss/sitecore-jss-react';

const EntryOverview = ({ entry }) => {
  const tags = entry.tags.value.split(' ').filter(t => t);
  const date = moment(getFieldValue(entry.datetime, 'datetime'));

  return (
    <article>
      <header>
        <DateField field={entry.datetime} editable={false} tag='time' render={() => (
          <time>{date.format('YYYY/M/D')}</time>
        )} />
        <Text field={entry.title} editable={false} tag='h1' />
        <ul>
          {tags.map((tag, index) => (<li key={index}>{tag}</li>))}
        </ul>
      </header>
      <div>
        <Text field={entry.introduction} editable={false} tag='p' />
        <a href={entry.url}>{t('read-more')}</a>
      </div>
      <footer>
        <Text field={entry.author.targetItem.fullname} editable={false} tag='p' />
        <p>{date.fromNow()}</p>
        <p>Social buttons here.</p>
      </footer>
    </article>
  )
};

export default EntryOverview;
