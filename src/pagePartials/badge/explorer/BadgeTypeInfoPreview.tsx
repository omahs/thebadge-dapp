import { useRouter } from 'next/navigation'
import React from 'react'

import { Box, Divider, Stack, Typography } from '@mui/material'
import { formatUnits } from 'ethers/lib/utils'
import { useTranslation } from 'next-export-i18n'
import { ButtonV2, colors } from 'thebadge-ui-library'

import SafeSuspense from '@/src/components/helpers/SafeSuspense'
import { getNetworkConfig } from '@/src/config/web3'
import useS3Metadata from '@/src/hooks/useS3Metadata'
import CreatorInfoSmallPreview from '@/src/pagePartials/badge/explorer/CreatorInfoSmallPreview'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { BadgeTypeMetadata } from '@/types/badges/BadgeMetadata'
import { BadgeType } from '@/types/generated/subgraph'

export default function BadgeTypeInfoPreview({ badgeType }: { badgeType: BadgeType }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { appChainId } = useWeb3Connection()
  const networkConfig = getNetworkConfig(appChainId)

  const resBadgeTypeMetadata = useS3Metadata<{ content: BadgeTypeMetadata }>(
    badgeType.metadataURL || '',
  )
  const badgeMetadata = resBadgeTypeMetadata.data?.content

  return (
    <Stack gap={4}>
      {/* Badge Type info */}
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography fontWeight="normal" variant="dAppTitle1">
            {t('explorer.preview.badge.name')}
          </Typography>
          <Typography variant="dAppTitle2">{badgeMetadata?.name}</Typography>
          <Divider color={colors.white} />
        </Stack>
        <Stack gap={1}>
          <Typography fontWeight="normal" variant="dAppTitle1">
            {t('explorer.preview.badge.description')}
          </Typography>
          <Typography variant="dAppTitle2">{badgeMetadata?.description}</Typography>
          <Divider color={colors.white} />
        </Stack>
      </Stack>

      {/* Mint info */}
      <Stack gap={1}>
        <Typography fontWeight="bold" variant="dAppTitle2">
          {t('explorer.preview.badge.mintCost')}
          <Typography component="span" sx={{ ml: 1 }} variant="dAppTitle2">
            {formatUnits(badgeType.mintCost, 18)} {networkConfig.token}
          </Typography>
        </Typography>

        <Typography fontWeight="bold" variant="dAppTitle2">
          {t('explorer.preview.badge.totalMinted')}
          <Typography component="span" sx={{ ml: 1 }} variant="dAppTitle2">
            {badgeType.badgesMintedAmount}
          </Typography>
        </Typography>
        <Divider color={colors.white} />
      </Stack>

      <Box display="flex" flex="1" justifyContent="space-between">
        <ButtonV2
          backgroundColor={colors.transparent}
          onClick={() => router.push(`/badge/${badgeType.id}`)}
          variant="outlined"
        >
          {t('explorer.preview.badge.showOthers')}
        </ButtonV2>

        <ButtonV2
          backgroundColor={colors.blue}
          onClick={() => router.push(`/badge/mint/${badgeType.id}`)}
          sx={{ ml: 'auto' }}
          variant="contained"
        >
          {t('explorer.preview.badge.mint')}
        </ButtonV2>
      </Box>

      {/* Creator info */}
      <SafeSuspense>
        <CreatorInfoSmallPreview creator={badgeType.creator} />
      </SafeSuspense>
    </Stack>
  )
}