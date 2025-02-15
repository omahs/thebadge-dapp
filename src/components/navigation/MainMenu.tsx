import { useRouter } from 'next/router'
import React, { useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ClickAwayListener,
  Fade,
  Tooltip,
  styled,
} from '@mui/material'

import { useMainMenuItems } from '@/src/components/navigation/MainMenu.config'
import { MenuItem, MenuItemElement, SubMenuItem } from '@/src/components/navigation/MainMenu.types'
import {
  getMenuItemBackgroundColor,
  getMenuItemHoverBackgroundColor,
} from '@/src/components/navigation/MainMenu.utils'
import { useSectionReferences } from '@/src/providers/referencesProvider'

const MenuContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.default,
  boxShadow: `0px 0px 6px ${theme.palette.mainMenu.boxShadow.main}`,
  borderRadius: '0px 20px 0px 0px',
  padding: '3rem 1rem',
  gap: '2.5rem',
  flexWrap: 'wrap',
}))

const MainMenuContainer = styled(MenuContainer)(({ theme }) => ({
  height: 'fit-content',
  position: 'sticky',
  left: theme.spacing(6),
  top: theme.spacing(12),
  zIndex: 100,
}))

const SubMenuContainer = styled(MenuContainer)<MenuItemElement>(({ type }) => ({
  position: 'relative',
  ...(type === 'small'
    ? {
        left: '3.25rem',
      }
    : {
        left: '4rem',
      }),

  bottom: '3rem',
  padding: '2rem',
  width: '13rem',
  gap: '2rem',
  zIndex: 100,
}))

const MenuItemContainer = styled('div')<MenuItemElement>(({ type }) => ({
  position: 'relative',

  ...(type === 'small'
    ? {
        display: 'flex',
        justifyContent: 'center',
        top: '0.75rem',
        height: '1.5rem',
      }
    : {
        left: '0rem',
        top: '0rem',
        height: '3rem',
      }),
}))

const MenuItemsTopContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '2.5rem',
  marginBottom: '5rem',
  width: '3rem',
}))

const MenuItemsBottomContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  width: '3rem',
}))

const MenuItemBox = styled(Button)(() => ({
  display: 'flex',
  minWidth: 0,
  padding: 0,
  borderRadius: '0.8rem',
}))

const MenuItem = styled('div')<MenuItemElement>(({ disabled, selected, theme, type }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  minWidth: 0,

  ...(type === 'small'
    ? {
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '0.75rem',
        border: `1px solid ${theme.palette.mainMenu.itemBorder.main}`,
      }
    : {
        width: '3rem',
        height: '3rem',
        borderRadius: '1.5rem',
        border: 'none',
      }),

  background: `${getMenuItemBackgroundColor(type)}`,

  '&:hover, &.Mui-focusVisible': {
    background: `${getMenuItemHoverBackgroundColor(type)}`,
  },

  ...(selected
    ? {
        border: `1px solid ${theme.palette.mainMenu.itemBorder.main}`,
      }
    : null),

  ...(disabled
    ? {
        opacity: 0.5,
        cursor: 'default',
      }
    : null),
}))

const SubMenuTitleItem = styled(Button)(({ theme }) => ({
  justifyContent: 'inherit',
  minWidth: 0,
  padding: 0,
  borderRadius: 0,
  cursor: 'pointer',
  fontWeight: 900,
  fontSize: '12px !important',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: `${theme.palette.text.primary}`,
  paddingBottom: '0.5rem',
  borderBottom: `1px solid ${theme.palette.text.primary}`,

  '&:hover, &.Mui-focusVisible': {
    opacity: 0.7,
    borderBottom: '1px solid rgba(0, 0, 0, 0.7)',
    background: 'transparent',
  },
}))

const SubMenuItem = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'inherit',
  minWidth: 0,
  padding: 0,
  borderRadius: 0,
  textAlign: 'start',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '12px !important',
  lineHeight: '14px !important',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  paddingBottom: '0.5rem',

  '&:hover, &.Mui-focusVisible': {
    color: `${theme.palette.text.primary}`,
    background: 'transparent',
  },
}))

export default function MainMenu({ ...restProps }) {
  // const t = useTranslations('mainMenu')
  const router = useRouter()
  const { scrollTo } = useSectionReferences()
  const [selectedElement, setSelectedElement] = useState(-1)
  const { bottomMenuItems, topMenuItems } = useMainMenuItems()

  const navigateTo = async (link: any, openInNewTab?: boolean) => {
    if (link) {
      if (link.current) {
        scrollTo('/', link)
      } else {
        if (openInNewTab) {
          window.open(link)
        } else {
          await router.push(link)
        }
      }
    }
  }

  const onItemClick = async (item: MenuItem | SubMenuItem) => {
    if (item.href) {
      await navigateTo(item.href, item.openLinkInNewTab)

      if (!item.subItems) {
        // close after click if no subItems opening
        setTimeout(() => setSelectedElement(-1), 300)
      }
    }
    if (item.customOnClickBehavior) {
      item.customOnClickBehavior()
    }
  }

  const toggleSelectedElement = (index: number) => {
    if (selectedElement === index) {
      setSelectedElement(-1) // unselect
    } else {
      setSelectedElement(index) // select
    }
  }

  const onClose = () => {
    setSelectedElement(-1) // unselect
  }

  const onMenuItemClick = async (item: MenuItem, index: number) => {
    toggleSelectedElement(index)
    if (!item.subItems || item.subItems.length === 0) {
      await onItemClick(item)
    }
  }

  const renderSubItemWithSubItems = (subItem: SubMenuItem): React.ReactNode => {
    return (
      <Accordion
        sx={{
          color: 'inherit',
          backgroundColor: 'inherit',
          boxShadow: 0,
          minHeight: 0,
          margin: 0,
          backgroundImage: 'none',
          '& .Mui-expanded': {
            margin: '0 !important',
            minHeight: '0 !important',
          },
        }}
      >
        <AccordionSummary
          aria-controls="content"
          disableRipple={true}
          expandIcon={<ExpandMoreIcon htmlColor={'#4f4f4f'} sx={{ width: 16, height: 16 }} />}
          sx={{
            padding: 0,
            minHeight: 0,
            margin: 0,
            '& .MuiAccordionSummary-content, & .Mui-expanded': {
              margin: '0 !important',
              minHeight: '0 !important',
            },
          }}
        >
          {subItem.title}
        </AccordionSummary>
        <AccordionDetails sx={{ minHeight: 0, margin: 0, padding: '1rem 0 0 1rem' }}>
          {subItem.subItems?.map((subItemSubItem, subItemSubItemIndex) => (
            <SubMenuItem
              disableRipple={true}
              key={'subItem-' + subItemSubItem + '-subItemSubItem-' + subItemSubItemIndex}
              onClick={() => onItemClick(subItemSubItem)}
              sx={{
                textTransform: 'none',
              }}
            >
              {subItemSubItem.title}
            </SubMenuItem>
          ))}
        </AccordionDetails>
      </Accordion>
    )
  }

  const renderSubItems = (item: MenuItem, itemIndex: number): React.ReactNode => {
    return (
      <Fade in={selectedElement === itemIndex}>
        <SubMenuContainer type={item.type}>
          <SubMenuTitleItem disableRipple={true} onClick={() => onItemClick(item)}>
            {item.title}
          </SubMenuTitleItem>

          {item.subItems?.map((subItem, subItemIndex) => (
            <SubMenuItem
              disableRipple={true}
              key={'item-' + itemIndex + '-subItem-' + subItemIndex}
              onClick={() => onItemClick(subItem)}
            >
              {subItem.subItems ? renderSubItemWithSubItems(subItem) : subItem.title}
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      </Fade>
    )
  }

  const renderMenuItem = (item: MenuItem, itemIndex: number): React.ReactNode => {
    return (
      (item.validation === undefined || item.validation) && (
        <MenuItemContainer key={'menuItem-' + itemIndex} type={item.type}>
          <Tooltip arrow placement="right" title={item.title}>
            <div>
              <MenuItemBox
                disableRipple={true}
                disabled={!!item.disabled}
                onClick={() => onMenuItemClick(item, itemIndex)}
                sx={{
                  '&.Mui-focusVisible': {
                    background: `${getMenuItemHoverBackgroundColor(item.type)}`,
                  },
                }}
              >
                <MenuItem
                  disabled={!!item.disabled}
                  selected={selectedElement === itemIndex}
                  type={item.type}
                >
                  {item.icon}
                </MenuItem>
              </MenuItemBox>
            </div>
          </Tooltip>
          {item.subItems && selectedElement === itemIndex ? renderSubItems(item, itemIndex) : null}
        </MenuItemContainer>
      )
    )
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <MainMenuContainer {...restProps}>
        <MenuItemsTopContainer>
          {topMenuItems.map((item, index) => renderMenuItem(item, index))}
        </MenuItemsTopContainer>
        <MenuItemsBottomContainer>
          {bottomMenuItems.map((item, index) => renderMenuItem(item, index + topMenuItems.length))}
        </MenuItemsBottomContainer>
      </MainMenuContainer>
    </ClickAwayListener>
  )
}
