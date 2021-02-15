import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AutoSuggest from "react-autosuggest";
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import { Spacing, Container } from 'components/Layout';
import { H1, Error } from 'components/Text';
import { InputText, Button, Textarea } from 'components/Form';

import { Loading } from 'components/Loading';
import Head from 'components/Head';

import { SIGN_UP } from 'graphql/user';
import { useDebounce } from 'hooks/useDebounce';

import { SEARCH_LOCATIONS, GET_LOCATIONS } from 'graphql/location';

import * as Routes from 'routes';
import { render } from 'react-dom';

const Root = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: space-between;
    margin-top: 120px;
  }
`;

const Welcome = styled.div`
  display: none;
  flex-direction: column;
  color: ${(p) => p.theme.colors.white};
  max-width: ${(p) => p.theme.screen.xs};

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: flex;
  }
`;

const Heading = styled(H1)`
  margin-bottom: ${(p) => p.theme.spacing.sm};
`;

const Form = styled.div`
  padding: ${(p) => p.theme.spacing.md};
  border-radius: ${(p) => p.theme.radius.sm};
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 450px;
  }
`;

const theme = {
  container: {
    position: 'relative'
  },
  
  input: {
    width: 280,
    height: 36,
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: '1px solid',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 33,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};
/**
 * Sign Up page
 */
const SignUp = ({ history, refetch }) => {
  const client = useApolloClient();

  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false);
  const [locations, setLocations] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    location: '',
  });
  const [signup] = useMutation(SIGN_UP);
  
  
  useEffect(()=>{
    console.log('hhuuh', suggestions);
  setValues({...values, ["location"]:locations});
  }, [locations])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const validate = () => {
    if (!fullName || !email || !username || !password || !location) {
      return 'All fields are required';
    }

    if (fullName.length > 50) {
      return 'Full name no more than 50 characters';
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      return 'Enter a valid email address.';
    }

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    if (!usernameRegex.test(username)) {
      return 'Usernames can only use letters, numbers, underscores and periods';
    } else if (username.length > 20) {
      return 'Username no more than 50 characters';
    }

    if (password.length < 6) {
      return 'Password min 6 characters';
    }

    if (location === ''){
      return 'You should select your area';
    }

    return false;
  };
  const debounceSearchQuery = useDebounce(locations, 500);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setError(error);
      return false;
    }

    try {
      const response = await signup({
        variables: { input: { fullName, email, password, username, location } },
      });
      console.log(response);
      localStorage.setItem('token', response.data.signup.token);
      await refetch();
      history.push(Routes.HOME);
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const { fullName, email, password, username,location } = values;
  console.log('gguguy', values);
  return (
    <Root maxWidth="lg">
      <Head />

      <Welcome>
        <div>
          <Heading color="white">Connect with neighbours and community.</Heading>
        </div>

        <p>See photos and updates from your neighbours.</p>
        <p>Follow your neighbours.</p>
        <p>Know the community update immediately.</p>
        <p>Find the government alert.</p>
      </Welcome>

      <Form>
        <Spacing bottom="md">
          <H1>Create Account</H1>
        </Spacing>

        <form onSubmit={(e) => handleSubmit(e, signup)}>
          <InputText
            type="text"
            name="fullName"
            values={fullName}
            onChange={handleChange}
            placeholder="Full name"
            borderColor="white"
          />
          <Spacing top="xs" bottom="xs">
            <InputText
              type="text"
              name="email"
              values={email}
              onChange={handleChange}
              placeholder="Email"
              borderColor="white"
            />
          </Spacing>
          <InputText
            type="text"
            name="username"
            values={username}
            onChange={handleChange}
            placeholder="Username"
            borderColor="white"
          />
          <Spacing top="xs" bottom="xs">
            <InputText
              type="password"
              name="password"
              values={password}
              onChange={handleChange}
              placeholder="Password"
              borderColor="white"
            />
          </Spacing>
          {/* <Spacing top="xs" bottom="xs">
            <Select location={location} placeholder={"Where do you live ?"}/>
          </Spacing> */}
          <Spacing top="xs" bottom="xs">
            <AutoSuggest 
            inputProps={{
              placeholder:"Where do you live?",
              autoComplete: "abcd",
              type: "search",
              name: "location",
              value: locations,
              onChange: (event, {newValue, method}) =>{
                console.log("onchange", newValue);
                        setLocations(newValue)
              }
            }} 
            suggestions={suggestions}
            onSuggestionsFetchRequested={async({value})=>{
              if(!value){
                setSuggestions([]);
                return;
              }
              try {
                const { data } = await client.query({
                  query: SEARCH_LOCATIONS,
                  variables: { searchQuery: debounceSearchQuery },
                });
                setSuggestions(data.searchLocations.map(row=>({
                  name: row.name,
                  city: row.city,
                  id:row.id
                })));
                setLoading(false);

                const openSearchResult = debounceSearchQuery !== '';
                setIsOpenSearchResult(openSearchResult);
              } catch (error) {
                setSuggestions([]);
              }
            }}
            onSuggestionsClearRequested={()=>{
              setSuggestions([])
            }}
            onSuggestionSelected={(event, {suggestion,method})=>{
              console.log(suggestion);          
              setLocations(suggestion.id)
            }}
            getSuggestionValue={suggestion => 
              suggestion.name}
            shouldRenderSuggestions={( value, reason)=>{
              return value.trim().length>2;
            }}
            renderSuggestion={
            suggestion => {       
                return (<div>{suggestion.city} / {suggestion.name}</div>);              
            }        
          }
          highlightFirstSuggestion={true}
          theme={theme}

            />
          </Spacing>
          {error && (
            <Spacing bottom="sm" top="sm">
              <Error>{error}</Error>
            </Spacing>
          )}
          <p>If your area is not listed, please send us email support@kachebd.xyz or call: 01683754716</p>
          <Spacing top="sm" />          
          <Button size="large" disabled={loading}>
            Sign up
          </Button>
        </form>
      </Form>
    </Root>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(SignUp);
