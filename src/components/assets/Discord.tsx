import { HTMLAttributes } from 'react'

import { styled } from '@mui/material'

const Wrapper = styled('svg')`
  .fill {
    fill: ${'#1C1B1F'};
  }
  .stroke {
    stroke: ${'#1C1B1F'};
  }
`

export const Discord: React.FC<HTMLAttributes<SVGElement>> = ({ className, ...restProps }) => (
  <Wrapper
    className={`home ${className}`}
    fill="none"
    height="19"
    viewBox="0 0 25 19"
    width="25"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      className="fill stroke"
      d="M10.3153 2.29696C11.8153 1.99767 13.3153 1.99767 14.8153 2.29696C14.9153 1.99767 15.0153 1.69837 15.1153 1.49883C15.2153 1.19953 15.4153 1.09977 15.7153 1.09977C17.4153 1.2993 19.0153 1.69837 20.5153 2.59626C21.1153 2.99533 21.5153 3.49416 21.8153 4.09276C22.8153 6.18786 23.5153 8.48249 23.9153 10.7771C24.1153 11.9743 24.2153 13.2713 24.3153 14.4685C24.3153 14.668 24.2153 14.8675 24.1153 15.0671C23.4153 16.1645 22.3153 16.8629 21.1153 17.3617C20.2153 17.7608 19.2153 17.9603 18.2153 18.1598C17.8153 18.2596 17.4153 18.1598 17.2153 17.7608C16.9153 17.3617 16.6153 16.9626 16.3153 16.5636C16.2153 16.4638 16.1153 16.364 15.9153 16.364C13.7153 16.8629 11.6153 16.8629 9.41531 16.364C9.21531 16.364 9.11531 16.364 9.01531 16.5636C8.71531 17.0624 8.41531 17.4615 8.01531 17.8605C7.81531 18.1598 7.61531 18.2596 7.31531 18.1598C5.51531 17.9603 3.81531 17.3617 2.31531 16.2643C2.21531 16.1645 2.01531 16.0647 1.91531 15.8652C1.31531 15.2666 0.915314 14.668 1.01531 13.7701C1.21531 10.5776 2.01531 7.58459 3.11531 4.69136C3.71531 3.29463 4.61531 2.4965 6.01531 1.8979C7.11531 1.49883 8.21531 1.19953 9.41531 1C9.81531 1 9.91531 1 10.1153 1.39907C10.2153 1.79813 10.2153 1.99767 10.3153 2.29696ZM8.11531 16.0647C7.81531 15.965 7.61531 15.8652 7.51531 15.7654C6.61531 15.4661 5.81531 15.0671 5.11531 14.4685C4.81531 14.2689 4.81531 13.9696 5.01531 13.6704C5.21531 13.4708 5.51531 13.4708 5.81531 13.6704C6.01531 13.7701 6.11531 13.8699 6.31531 13.9696C7.21531 14.5682 8.21531 14.9673 9.21531 15.1668C10.1153 15.3664 11.0153 15.5659 11.9153 15.5659C13.4153 15.6657 14.9153 15.5659 16.4153 15.1668C17.6153 14.8675 18.7153 14.3687 19.7153 13.6704C20.0153 13.4708 20.3153 13.4708 20.5153 13.6704C20.7153 13.8699 20.6153 14.2689 20.4153 14.3687C19.8153 14.7678 19.2153 15.0671 18.6153 15.3664C18.2153 15.5659 17.8153 15.6657 17.4153 15.8652C17.6153 16.1645 17.9153 16.4638 18.1153 16.7631C18.2153 16.8629 18.3153 16.9626 18.4153 16.8629C19.6153 16.6633 20.7153 16.364 21.7153 15.7654C22.2153 15.4661 22.7153 14.9673 23.1153 14.5682C23.2153 14.4685 23.3153 14.1692 23.3153 13.9696C23.3153 12.3734 23.0153 10.7771 22.6153 9.18086C22.2153 7.48482 21.7153 5.88856 20.9153 4.39206C20.6153 3.79346 20.2153 3.3944 19.7153 3.0951C18.6153 2.4965 17.5153 2.1972 16.3153 1.99767C16.1153 1.99767 16.0153 1.99767 16.0153 2.29696C16.1153 2.29696 16.3153 2.39673 16.4153 2.39673C17.4153 2.89556 18.5153 3.29463 19.5153 3.89323C19.8153 4.09276 19.9153 4.39206 19.7153 4.5916C19.5153 4.79113 19.3153 4.89089 19.0153 4.69136C18.7153 4.49183 18.5153 4.39206 18.2153 4.19253C16.0153 3.19486 13.7153 2.7958 11.3153 3.0951C9.51531 3.3944 7.81531 3.79346 6.31531 4.79113C6.01531 4.99066 5.71531 4.89089 5.51531 4.5916C5.41531 4.39206 5.51531 4.09276 5.81531 3.89323C6.81531 3.29463 7.91531 2.89556 9.11531 2.59626C9.21531 2.59626 9.21531 2.4965 9.31531 2.4965C9.31531 2.39673 9.21531 2.29696 9.21531 2.1972C8.31531 2.29696 7.51531 2.4965 6.71531 2.7958C5.51531 3.19486 4.61531 3.79346 4.11531 5.09043C2.91531 7.98366 2.21531 10.9767 2.01531 14.0694C2.01531 14.4685 2.11531 14.7678 2.41531 15.0671C3.71531 16.364 5.31531 16.9626 7.11531 17.1622C7.21531 17.1622 7.31531 17.1622 7.31531 17.0624C7.61531 16.7631 7.81531 16.364 8.11531 16.0647Z"
      strokeMiterlimit="10"
      strokeWidth="0.4"
    />
    <path
      className="fill stroke"
      d="M18.2154 10.6774C18.1154 11.4755 17.9154 12.1739 17.3154 12.6727C16.3154 13.4709 14.9154 13.2713 14.2154 12.2737C13.5154 11.3758 13.5154 9.97904 14.2154 9.08115C14.7154 8.48255 15.4154 8.08348 16.2154 8.18325C17.1154 8.28301 17.7154 8.78185 18.0154 9.67975C18.1154 9.97905 18.1154 10.2783 18.2154 10.6774ZM14.6154 10.6774C14.7154 10.9767 14.8154 11.276 14.9154 11.5753C15.4154 12.4732 16.4154 12.4732 16.9154 11.5753C17.2154 10.9767 17.2154 10.3781 16.9154 9.77951C16.4154 8.98138 15.3154 8.98138 14.9154 9.77951C14.7154 10.0788 14.7154 10.3781 14.6154 10.6774Z"
      strokeMiterlimit="10"
      strokeWidth="0.4"
    />
    <path
      className="fill stroke"
      d="M7.01562 10.7774C7.01562 9.68002 7.41563 8.88188 8.31563 8.48282C9.21563 7.88422 10.3156 8.08375 11.0156 8.88188C11.9156 9.87955 11.8156 11.4758 10.9156 12.3737C10.3156 12.9723 9.61563 13.2716 8.81563 13.0721C7.91563 12.8725 7.41563 12.1742 7.11563 11.376C7.11563 11.1765 7.11563 10.8772 7.01562 10.7774ZM10.6156 10.6777C10.6156 10.6777 10.6156 10.5779 10.6156 10.6777C10.5156 10.2786 10.5156 9.97932 10.3156 9.68002C9.81563 8.98165 8.91563 8.98165 8.41563 9.68002C8.01563 10.2786 8.01563 11.1765 8.41563 11.6753C8.91563 12.2739 9.61562 12.2739 10.2156 11.7751C10.5156 11.4758 10.6156 11.0767 10.6156 10.6777Z"
      strokeMiterlimit="10"
      strokeWidth="0.4"
    />
  </Wrapper>
)