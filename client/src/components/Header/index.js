import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const Header = (props) => (
  <div>
    <a href='/'><Text field={props.fields.title} tag='h1' /></a>
    <Text field={props.fields.subtitle} tag='h2' />
  </div>  
);

export default Header;
