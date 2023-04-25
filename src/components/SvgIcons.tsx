/*************************************************
 * Country Explorer
 * @exports
 * SvgIcons.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const SearchIcon = (color: string) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M16.738 15.658a8.25 8.25 0 1 0-.58.58l4.853 4.853a1.25 1.25 0 1 0 1.768-1.768l-4.853-4.853zM3.5 9.75a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0z"
      />
    </Svg>
  );
};

export const BackIcon = (color: string) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M19.25 11.5H7.664l4.293-4.293a1.25 1.25 0 0 0-1.768-1.768l-6 6a1.25 1.25 0 0 0 0 1.768l6 6a1.25 1.25 0 0 0 1.768-1.768L7.664 12.5h11.586a1.25 1.25 0 0 0 0-2.5z"
      />
    </Svg>
  );
};

export const HeartIcon = (isFavorite: boolean, color: string) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill={isFavorite ? '#FF0000' : color}
        d="M12 21.35l-1.8-1.62C3.9 13.85-.15 8.27.03 4.92 0 2.64 1.71.75 3.99.75c1.5 0 3.12.87 4.01 2.23C9.06 1.62 10.68.75 12 0c1.32.75 2.94 1.62 4.97 2.9 1.02-1.36 2.64-2.23 4.14-2.23 2.28 0 3.99 1.89 3.96 4.27-.18 3.35-4.05 8.93-10.18 14.81L12 21.35z"
      />
    </Svg>
  );
};
