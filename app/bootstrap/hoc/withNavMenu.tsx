import type { ComponentClass, FunctionComponent } from 'react'
import type { WithTranslationProps } from '~/bootstrap/hoc/withTranslation'
import withCrispChat from './withCrispChat'
import CustomRemixLink from '~/components/CustomRemixLink'
import withTranslation from '~/bootstrap/hoc/withTranslation'
import { useEffect, useMemo } from 'react'
import { onLCP } from 'web-vitals'
import { Outlet } from '@remix-run/react'
import { NavMenu } from '@shopify/app-bridge-react'
import { isNavMenuItemEnabled } from '~/bootstrap/app-config'
import { Transmitter } from 'extensions/tailorkit-src/src/assets/libraries/transmitter'

export default function withNavMenu(
  Component?: FunctionComponent<WithTranslationProps> | ComponentClass<WithTranslationProps>
) {
  return withTranslation(
    withCrispChat(function WithNavMenu(props: any) {
      const { t } = props

      useEffect(() => {
        onLCP((e: any) => {
          Transmitter.trigger('lcp-recorded')
          console.log(e)
        })
      }, [])

      // Define nav menu items.
      const navMenuItems: { [key: string]: string } = useMemo(
        () => ({
          '/dashboard': t('dashboard'),
          '/templates': t('templates'),
          '/libraries': t('library'),
          '/integrations': t('integrations'),
          '/orders': t('orders'),
        }),
        [t]
      )

      // Filter enabled nav menu items.
      const filteredNavMenuItems = useMemo(
        () => Object.keys(navMenuItems).filter(path => isNavMenuItemEnabled(path)),
        [navMenuItems]
      )

      return (
        <>
          <div style={{ display: 'none' }}>
            <NavMenu>
              {filteredNavMenuItems.map(path => (
                <CustomRemixLink key={path} to={path} rel={path === '/dashboard' ? 'home' : undefined}>
                  {navMenuItems[path]}
                </CustomRemixLink>
              ))}
            </NavMenu>
          </div>

          {Component ? <Component {...props} /> : <Outlet />}
        </>
      )
    })
  )
}
