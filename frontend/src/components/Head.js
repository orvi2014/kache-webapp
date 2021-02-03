import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import SiteInfo from 'constants/SiteInfo.json';

/**
 * Component that manages changes to document head
 * currently we are editing only title, but you can add meta description, image ...
 */
const Head = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
<description>{description}</description>
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Head.defaultProps = {
  title: SiteInfo.name,
  description: SiteInfo.description,
};

export default Head;
