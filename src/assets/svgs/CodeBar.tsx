import React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';

type IconProps = {
  color?: string;
} & SvgProps;

export default function CodeBar({ color = '#08875D', ...rest }: IconProps) {
  return (
    <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <Path
        d="M4.85107 6.78125V27.4062M5.88232 6.78125V27.4062M3.81982 6.78125V27.4062M10.0073 6.78125V27.4062M22.3823 6.78125V27.4062M19.2886 6.78125V27.4062M21.3511 6.78125V27.4062M30.6323 6.78125V27.4062M26.5073 6.78125V27.4062M15.1636 6.78125V27.4062"
        stroke="#4397B0"
      />
    </Svg>
  );
}
