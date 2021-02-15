import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SearchIcon } from 'components/icons';
import { InputText } from 'components/Form';
const Root = styled.div`
  width: 100%;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.xl};
`;



/**
 * Component for rendering search input
 */
const SelectInput = ({
  onChange,
  onFocus,
  value,
  inputRef,
  backgroundColor,
  placeholder,
  hideIcon,
  children,
  autoFocus,
}) => {
  return (
    <Root>
      <InputText
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        ref={inputRef}
        backgroundColor={backgroundColor}
        type="text"
        placeholder={placeholder}
        hideIcon={hideIcon}
        autoFocus={autoFocus}
      />
      {children}
 
    </Root>
  );
};

SelectInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  value: PropTypes.string.isRequired,
  ref: PropTypes.object,
  backgroundColor: PropTypes.string,
  placeholder: PropTypes.string,
  hideIcon: PropTypes.bool,
  children: PropTypes.node,
  autoFocus: PropTypes.bool,
};

export default SelectInput;
