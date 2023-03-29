import Link from 'next/link'
import React, { useState } from 'react'

import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-export-i18n'

import { NoResultsAnimated } from '@/src/components/assets/NoResults'
import FilteredList, { ListFilter } from '@/src/components/helpers/FilteredList'
import { withPageGenericSuspense } from '@/src/components/helpers/SafeSuspense'
import MiniBadgeTypeMetadata from '@/src/pagePartials/badge/MiniBadgeTypeMetadata'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { SubgraphName, getSubgraphSdkByNetwork } from '@/src/subgraph/subgraph'
import { NextPageWithLayout } from '@/types/next'

const StyledBadgeContainer = styled(Box)(() => ({
  position: 'relative',
  transition: 'all 2s',
  overflow: 'hidden',
  '& #mint-btn': {
    transition: 'all .75s cubic-bezier(0.83, 0, 0.17, 1)',
    position: 'absolute',
    bottom: '-33px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  '&:hover': {
    '& #mint-btn': {
      bottom: '3px',
    },
  },
}))

const ExploreBadgeTypes: NextPageWithLayout = () => {
  const { t } = useTranslation()
  const { appChainId } = useWeb3Connection()
  const [items, setItems] = useState<React.ReactNode[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const gql = getSubgraphSdkByNetwork(appChainId, SubgraphName.TheBadge)

  const filters: Array<ListFilter> = [
    {
      title: 'Minted',
      color: 'blue',
    },
    {
      title: 'In Review',
      color: 'green',
    },
    {
      title: 'Approved',
      color: 'darkGreen',
    },
    {
      title: 'Challenged',
      color: 'pink',
    },
  ]

  const search = async (
    selectedFilters: Array<ListFilter>,
    selectedCategory: string,
    textSearch?: string,
  ) => {
    setLoading(true)

    // TODO filter badges using filters, category, text
    const badgeTypes = await gql.badgeTypes()
    const badges = badgeTypes.badgeTypes || []

    const badgeLayouts = badges.map((bt) => {
      return (
        <StyledBadgeContainer key={bt.id} maxWidth={'250px'}>
          <MiniBadgeTypeMetadata disableAnimations metadata={bt.metadataURL} />
          <Button color={'blue'} id="mint-btn" sx={{ borderRadius: '8px' }} variant="contained">
            <Link href={`/badge/mint/${bt.id}`}>{t('explorer.button')}</Link>
          </Button>
          {/*
          <div>mintCost: {formatUnits(bt.mintCost, 18)} + Kleros deposit</div>
          <div>ValidFor: {bt.validFor / 60 / 60 / 24} </div>
          <div>paused: {bt.paused ? 'Yes' : 'No'}</div>
          <div>Controller: {bt.controllerName}</div>
          <div>
            <span>Challenge period duration: </span>
            <GetBadgeTypeChallengePeriodDuration tcrList={bt.klerosBadge?.klerosTCRList} /> days
          </div>


           TODO ADD Creator/Emitter Metadata
          <div>Metadata: {bt.emitter.metadata}</div>
           This is broken because the metadata is not linked on IPFS.
           <CreatorDetails metadata={bt.emitter.metadata} />
          */}
        </StyledBadgeContainer>
      )
    })

    setTimeout(() => {
      setLoading(false)
      setItems(badgeLayouts)
    }, 2000)
  }

  return (
    <>
      <FilteredList
        categories={['Category 1', 'Category 2', 'Category 3']}
        filters={filters}
        loading={loading}
        search={search}
        title={t('explorer.title')}
      >
        {items.length > 0 ? (
          items
        ) : (
          <Stack>
            <Typography variant="body3">{t('explorer.noBadgesFound')}</Typography>
            <NoResultsAnimated />
          </Stack>
        )}
      </FilteredList>
    </>
  )
}

export default withPageGenericSuspense(ExploreBadgeTypes)
