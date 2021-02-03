import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { Spacing } from 'components/Layout';
import { H1, A, Error } from 'components/Text';
import { InputText, Button } from 'components/Form';
import Head from 'components/Head';

import * as Routes from 'routes';

const Root = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const Container = styled.div`
  width: 450px;
  margin: 0 auto;
  background-color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.md};
  border-radius: ${(p) => p.theme.radius.sm};
  width: 100%;
  margin-top: 80px;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 450px;
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    margin-top: auto;
  }
`;

const Text = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  line-height: 22px;
`;

const Header = styled.p`

`;

/**
 * Landing page
 */
const LandingPage = () => {
  return (
  <div></div>
   );
};

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
