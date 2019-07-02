import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

const GeneralFooterBlock = (props) => (
  <div>
    <Text field={props.fields.heading} tag='h4' />
    <RichText field={props.fields.content} />
  </div>
);

export default GeneralFooterBlock;
