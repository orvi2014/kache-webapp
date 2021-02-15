import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from 'components/Skeleton';
import PropTypes from 'prop-types';
import { useStore } from 'store';
import styled from 'styled-components';
import { GET_LOCATIONS, SEARCH_LOCATIONS } from 'graphql/location';
import Empty from 'components/Empty';

import InfiniteScroll from 'components/InfiniteScroll';
import { EXPLORE_PAGE_POSTS_LIMIT } from 'constants/DataLimit';


const Root = styled.div`
  width: 100%;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.xl};
`;

const SelectOption = ({
  value
}) => {
  const [locations, setLocation] = useState([]);
  const variables = {
    // userId: auth.user.id,
    skip: 0,
    // limit: PEOPLE_PAGE_USERS_LIMIT,
  };
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_LOCATIONS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
  const handleInputChange = async (e) => {
    // Trim white space only from beginning
    const value = e.target.value.replace(/^\s+/g, '');
    console.log('tai', value)
    setLocation(value);
  };
  const renderContent = () => {
    if (loading && networkStatus === 1) {
      return (
          <Skeleton height={300} count={EXPLORE_PAGE_POSTS_LIMIT} />

      );
    }
    const  locations  = data.getLocations;
    
    if (!locations.length > 0) return <Empty text="No Location." />; 
    return (
      <InfiniteScroll
        data={locations}
        dataKey="getLocations"
        // count={parseInt(count)}
        variables={variables}
        fetchMore={fetchMore}
      >
        
        {(data) => {

            
          return (
            <Fragment>{
              <select
              onChange={handleInputChange}
              >
                
              {data.map((option) => (
                <option 
                onChange={handleInputChange} 
                value={option.id}>{option.city} / {option.name}</option>
              ))}
            </select>     
                }  
            </Fragment>
          );
        }}
      </InfiniteScroll>
    );
  };
  return (
    <Root maxWidth="md">
      {renderContent()}
    </Root>
  );
}

SelectOption.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SelectOption;