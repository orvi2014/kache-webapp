import React from 'react';
import theme from 'theme';

/**
 * Home icon
 *
 * @param {string} width
 * @param {string} color
 */
export const AlertIcon = ({ width, color }) => {
  const DEFAULT_WIDTH = '18';
  const DEFAULT_COLOR = theme.colors.text.secondary;

  return (
    <svg
      width={width || DEFAULT_WIDTH}
      fill={theme.colors[color] || DEFAULT_COLOR}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
     <path d="M42,29.4995117c0-8.8200073-7.1799927-16-16-16s-16,7.1799927-16,16V47.5H5v2h42v-2h-5V29.4995117z"/>

<polygon class="st0" points="16,3 3,10 3,13 29,13 29,10 "/>
<rect x="5" y="13" class="st0" width="4" height="10"/>
<circle class="st0" cx="24" cy="24" r="7"/>
<line class="st0" x1="24" y1="21" x2="24" y2="27"/>
<line class="st0" x1="21" y1="24" x2="27" y2="24"/>
<polyline class="st0" points="19.1,29 1,29 1,26 17.3,26 "/>
<polyline class="st0" points="17.3,26 3,26 3,23 17.1,23 "/>
<polyline class="st0" points="23,17.1 23,13 27,13 27,17.7 "/>
<polyline class="st0" points="17.1,23 14,23 14,13 18,13 18,20.4 "/>

    </svg>
  );
};
