import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, keyframes, useTheme } from '@mui/material'
import { A11y, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import SafeSuspense from '@/src/components/helpers/SafeSuspense'
import BadgeTypeMetadata from '@/src/pagePartials/badge/BadgeTypeMetadata'
import { badgesExampleList } from '@/src/pagePartials/home/SectionBoxes'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { SubgraphName, getSubgraphSdkByNetwork } from '@/src/subgraph/subgraph'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const growEffect = keyframes`
  0% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
`

const now = Math.floor(Date.now() / 1000)
export default function NearToExpireList() {
  const theme = useTheme()
  const router = useRouter()

  const { appChainId } = useWeb3Connection()
  const gql = getSubgraphSdkByNetwork(appChainId, SubgraphName.TheBadge)
  const badgesInReview = gql.useBadgesInReview({ date: now })

  const badgesList = useMemo(() => {
    const badges = badgesInReview.data?.badges.map((badgeInReview) => {
      return (
        <Box
          key={badgeInReview.id}
          onClick={() =>
            router.push(`/badge/${badgeInReview.badgeType.id}/${badgeInReview.receiver.id}`)
          }
          sx={{ height: '100%', display: 'flex' }}
        >
          <SafeSuspense>
            <BadgeTypeMetadata metadata={badgeInReview?.badgeType.metadataURL} size="small" />
          </SafeSuspense>
        </Box>
      )
    })
    // TODO Remove badgesExampleList when we have more volumen to complete the list
    if (!badges) return badgesExampleList
    if (badges.length >= 5) {
      return badges
    }
    return [...badges, ...badgesExampleList]
  }, [badgesInReview.data?.badges, router])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
      <ArrowBackIosIcon
        className={'badges-swiper-expire-button-prev'}
        sx={{
          mr: '1rem',
          height: '35px',
          width: '35px',
          animation: `${growEffect} 1s infinite alternate ${theme.transitions.easing.easeInOut}`,
        }}
      />
      <Swiper
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: '.badges-swiper-expire-button-next',
          prevEl: '.badges-swiper-expire-button-prev',
        }}
        pagination={{ clickable: true }}
        slidesPerView={3}
        spaceBetween={8}
      >
        {badgesList.map((badge, index) => (
          <SwiperSlide
            key={'swiper-badge-' + index}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box sx={{ scale: '0.75' }}>{badge}</Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <ArrowForwardIosIcon
        className={'badges-swiper-expire-button-next'}
        sx={{
          ml: '1rem',
          height: '35px',
          width: '35px',
          animation: `${growEffect} 1s infinite alternate ${theme.transitions.easing.easeInOut}`,
        }}
      />
    </Box>
  )
}