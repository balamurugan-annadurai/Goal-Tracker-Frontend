// EyeIcon.tsx
import React from 'react';

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6c6.56 0 10-4.834 10-5.6c0-.768-3.44-5.6-10-5.6m0 9.907c-2.455 0-4.445-1.928-4.445-4.307S7.545 5.691 10 5.691s4.444 1.93 4.444 4.309s-1.989 4.307-4.444 4.307M10 10c-.407-.447.663-2.154 0-2.154c-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154s2.223-.965 2.223-2.154c0-.547-1.877.379-2.223 0" />
    </svg>
  );
};

export default EyeIcon;
