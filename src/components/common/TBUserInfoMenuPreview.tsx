import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, IconButton, Menu, MenuProps, Stack, Typography, alpha, styled } from '@mui/material'
import { ButtonV2, IconDiscord, colors } from '@thebadge/ui-library'
import { useTranslation } from 'next-export-i18n'

import TBUserAvatar from '@/src/components/common/TBUserAvatar'
import { Address } from '@/src/components/helpers/Address'
import { truncateStringInTheMiddle } from '@/src/utils/strings'
import { CreatorMetadata } from '@/types/badges/Creator'

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1',
  justifyContent: 'space-between',
  border: `1px solid ${colors.purple}`,
  filter: 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.3))',
  borderRadius: theme.spacing(1, 1, 0, 0),
  padding: theme.spacing(0.1, 2, 0.1, 2),
}))

type OwnerDisplayProps = MenuProps & { width?: number }
const OwnerDisplay = styled(Menu)<OwnerDisplayProps>(({ theme, width }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#000',
    backgroundImage: 'none',
    boxShadow: `0px 0px 4px ${alpha(colors.purple, 0.6)}`,
    padding: theme.spacing(1, 2, 1, 2),
    borderRadius: theme.spacing(0, 0, 1, 1),
    width: `${width}px`,
    maxWidth: `${width}px`,
  },
}))

export default function TBUserInfoExpandablePreview({
  color,
  isVerified,
  label,
  metadata,
  userAddress,
}: {
  color: string
  userAddress: string
  metadata?: CreatorMetadata
  label?: string
  isVerified?: boolean
}) {
  const router = useRouter()
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>()
  const open = Boolean(anchorEl)
  const handleClick = () => {
    if (wrapperRef?.current) setAnchorEl(wrapperRef.current)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleViewProfileClick() {
    window.open(`${router.basePath}/profile/${userAddress}`, '_ blank')
  }

  return (
    <>
      <Wrapper ref={wrapperRef}>
        <Box alignItems="center" display="flex" gap={1}>
          {label && <Typography variant="dAppTitle5">{label}</Typography>}
          <Address address={userAddress} showCopyButton={false} showExternalLink={false} />
        </Box>

        <IconButton onClick={handleClick} size="small">
          {!open ? <AddRoundedIcon sx={{ color }} /> : <RemoveRoundedIcon sx={{ color }} />}
        </IconButton>
      </Wrapper>
      <OwnerDisplay
        anchorEl={anchorEl}
        color={color}
        onClose={handleClose}
        open={open}
        width={wrapperRef.current?.getBoundingClientRect().width}
      >
        <Box display="flex" flex="1" gap={2}>
          <TBUserAvatar
            address={userAddress}
            isVerified={isVerified}
            src={metadata?.logo?.s3Url}
            sx={{ border: '1px solid white' }}
          />
          <Stack gap={1}>
            <Typography variant="dAppHeadline2">
              {metadata?.name || truncateStringInTheMiddle(userAddress, 8, 6)}
            </Typography>
            <Stack flex="1" justifyContent="space-evenly">
              {metadata?.email && (
                <Typography variant="dAppTitle2">
                  <EmailOutlinedIcon sx={{ mr: 1 }} />
                  {metadata?.email}
                </Typography>
              )}
              {metadata?.twitter && (
                <Typography variant="dAppTitle2">
                  <TwitterIcon sx={{ mr: 1 }} />
                  {metadata?.twitter}
                </Typography>
              )}
              {metadata?.discord && (
                <Typography variant="dAppTitle2">
                  <IconDiscord sx={{ mr: 1 }} />
                  {metadata?.discord}
                </Typography>
              )}
            </Stack>
            <ButtonV2
              backgroundColor={colors.transparent}
              fontColor={colors.purple}
              onClick={handleViewProfileClick}
              sx={{
                borderRadius: 2,
                mt: 2,
              }}
              variant="outlined"
            >
              <Typography fontSize="12px !important">
                {t('badge.viewBadge.owner.profile')}
              </Typography>
            </ButtonV2>
          </Stack>
        </Box>
      </OwnerDisplay>
    </>
  )
}
