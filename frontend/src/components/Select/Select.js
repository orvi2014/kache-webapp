import React, { useState, useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loading } from 'components/Loading';
import SelectInput from './SelectInput';
// import SelectResult from './SelectResult';

import { Spacing } from 'components/Layout';
import { A } from 'components/Text';

import { useClickOutside } from 'hooks/useClickOutside';
import { useDebounce } from 'hooks/useDebounce';

import { SEARCH_LOCATIONS, GET_LOCATIONS } from 'graphql/location';

const StyledLoading = styled(Loading)`
  position: absolute;
  top: 14px;
  right: 16px;
`;
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
 * Renders search input
 */
const Select = ({ location, hideIcon, forMessage, backgroundColor, placeholder, autoFocus, ...others }) => {
  const client = useApolloClient();

  const [isOpenSelectResult, setIsOpenSelectResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Close search result on click outside
  const inputRef = useRef(null);
  useClickOutside(inputRef, () => setIsOpenSelectResult(false));

  // Debounce search query value
  const debounceSearchQuery = useDebounce(500);

  useEffect(() => {
    // Clear search input value, after location change
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    const search = async () => {
      const { data } = await client.query({
        query: GET_LOCATIONS,
        variables: { searchQuery: debounceSearchQuery },
      });
      setUsers(data.getLocations);
      setLoading(false);

      const openSelectResult = debounceSearchQuery !== '';
      setIsOpenSelectResult(openSelectResult);
    };

    debounceSearchQuery ? search() : setIsOpenSelectResult(false);

    return () => setLoading(false);
  }, [debounceSearchQuery, client]);

  const handleInputChange = async (e) => {
    // Trim white space only from beginning
    const value = e.target.value.replace(/^\s+/g, '');
    setSearchQuery(value);
    setUsers(value);
    if (value) {
      setLoading(true);
    }
  };

  const handleLocationChange = async (e) => {
    let location = e.target.value;
    this.props.onSelectLocation(location)
  }

  const handleInputFocus = () => setIsOpenSelectResult(true);

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
          key={user.id}
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
  return (
    <SelectInput
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      values={searchQuery}
      inputRef={inputRef}
      placeholder={placeholder}
      hideIcon={hideIcon}
      backgroundColor={backgroundColor}
      autoFocus={autoFocus}
      // {...others}
    >
      {loading && <StyledLoading size="xxs" />}
        {console.log(users)}
      {isOpenSelectResult && <SelectResult users={users} onChange={handleLocationChange} />}
    </SelectInput>
  );
};

Select.propTypes = {
  location: PropTypes.object.isRequired,
  hideIcon: PropTypes.bool,
  forMessage: PropTypes.bool,
  backgroundColor: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  values: PropTypes.string.isRequired,
};

export default Select;
