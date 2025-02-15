import React, { ReactElement, ReactNode } from 'react'

import { Button, styled } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

import { DisableOverlay, DisableWrapper } from '@/src/components/helpers/DisableElements'
import { chainsConfig } from '@/src/config/web3'
import ConnectWalletActionError from '@/src/pagePartials/errors/displays/ConnectWalletActionError'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
`

type RequiredConnectionProps = {
  children: ReactElement | ReactNode
  minHeight?: number
  sx?: SxProps<Theme>
}

const PreventActionWithoutConnection: React.FC<RequiredConnectionProps> = ({
  children,
  minHeight,
  ...restProps
}) => {
  const { address, appChainId, isWalletConnected, pushNetwork, walletChainId } = useWeb3Connection()
  const isConnected = isWalletConnected && address
  const isWrongNetwork = isConnected && walletChainId !== appChainId

  if (!isConnected) {
    return (
      <Wrapper style={{ minHeight }} {...restProps}>
        <ConnectWalletActionError />
        <DisableWrapper onClick={(e) => e.stopPropagation()} sx={{ mt: 2 }}>
          {children}
          <DisableOverlay />
        </DisableWrapper>
      </Wrapper>
    )
  }

  if (isWrongNetwork) {
    return (
      <Wrapper style={{ minHeight }} {...restProps}>
        <Button onClick={() => pushNetwork({ chainId: chainsConfig[appChainId].chainIdHex })}>
          Switch to {chainsConfig[appChainId].name}
        </Button>
        <DisableWrapper onClick={(e) => e.stopPropagation()} sx={{ mt: 2 }}>
          {children}
          <DisableOverlay />
        </DisableWrapper>
      </Wrapper>
    )
  }

  return <>{children}</>
}

export { PreventActionWithoutConnection }
