import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Spacing } from 'components/Layout';
import { A } from 'components/Text';

const Root = styled.div`
  width: 100%;
  max-height: 350px;
  min-height: 40px;
  overflow: auto;
  position: absolute;
  top: 50px;
  font-size: ${(p) => p.theme.font.size.xs};
  box-shadow: ${(p) => p.theme.shadows.sm};
  background-color: ${(p) => p.theme.colors.white};
`;

const StyledA = styled(A)`
  display: block;

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[100]};
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xs};
`;

const NoSelectResult = styled.div`
  text-align: center;
  padding: ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.text.main};
`;
const handleLocationChange = async (e) => {
    let location = e.target.value;
    this.props.handleLocationChange(location)
    console.log("ami",location)
  }
/**
 * Displays search result, meant to be used in Search component
 */
const SelectResult = ({ users}) => {
  if (users.length < 1) {
    return (
      <Root>
        <NoSelectResult>No search results.</NoSelectResult>
      </Root>
    );
  }

  return (
    <Root>
      {users.map((user) => (
        <StyledA
        >
          <Item>

            <Spacing left="xs">
      <option onChange={handleLocationChange} value={user.id}>{user.name} / {user.city}</option>
            </Spacing>
          </Item>
        </StyledA>
      ))}   
    </Root>
  );
};

SelectResult.propTypes = {
  users: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectResult;
