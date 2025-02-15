import { HTMLAttributes } from 'react'

import { styled } from '@mui/material'

const Wrapper = styled('svg')`
  .fill {
    fill: ${'#1C1B1F'};
  }
`

export const Home: React.FC<HTMLAttributes<SVGElement>> = ({ className, ...restProps }) => (
  <Wrapper
    className={`home ${className}`}
    fill="none"
    height="20"
    viewBox="0 0 16 18"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      className="fill"
      d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196 17.021 0 16.55 0 16V7C0 6.68333 0.0709998 6.38333 0.213 6.1C0.354333 5.81667 0.55 5.58333 0.8 5.4L6.8 0.9C6.98333 0.766667 7.175 0.666667 7.375 0.6C7.575 0.533333 7.78333 0.5 8 0.5C8.21667 0.5 8.425 0.533333 8.625 0.6C8.825 0.666667 9.01667 0.766667 9.2 0.9L15.2 5.4C15.45 5.58333 15.646 5.81667 15.788 6.1C15.9293 6.38333 16 6.68333 16 7V16C16 16.55 15.8043 17.021 15.413 17.413C15.021 17.8043 14.55 18 14 18H9V12H7V18H2Z"
    />
  </Wrapper>
)
