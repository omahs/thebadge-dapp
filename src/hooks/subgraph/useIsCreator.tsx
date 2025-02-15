import useSWR, { SWRResponse } from 'swr'

import useSubgraph from '@/src/hooks/subgraph/useSubgraph'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'

export default function useIsCreator(address?: string): SWRResponse<boolean> {
  const gql = useSubgraph()
  const { address: connectedAddress, appChainId } = useWeb3Connection()
  return useSWR(
    address || connectedAddress ? [`isCreator:${address || connectedAddress}`, appChainId] : null,
    async () => {
      const userById = await gql.userById({ id: address || connectedAddress || '' })
      return !!userById.user?.isCreator
    },
  )
}
