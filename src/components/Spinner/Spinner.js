import React, { memo } from 'react';

function areEqual(prevProps, nextProps) {
  return prevProps.radius === nextProps.radius;
}
const spinner = (props) => {
  return (
    <svg width={props.width || '300px'} height={props.height || '300px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ background: 'none' }}>
      <circle cx="50" cy="50" fill="none"
        stroke={props.color || '#03ac0e'}
        strokeWidth={props.strokeWidth || '2'}
        r={props.radius || '20'}
        strokeDasharray={`${props.radius * 4} ${props.radius * 1}`}>
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
  );
};

export default memo(spinner, areEqual);