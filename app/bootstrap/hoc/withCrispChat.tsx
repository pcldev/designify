import type { ComponentClass, FunctionComponent } from 'react'
import Feedback from '~/modules/Feedback'
import InlineLoading from '~/components/loading/InlineLoading'
import { showToast } from '~/utils/toastEvents'
import { useEffect, useRef, useState } from 'react'
import { useLiveChat } from '~/utils/hooks/useLiveChat'
import { authenticatedFetch } from '~/shopify/fns.client'
import { BlockStack, Box, InlineStack, Text } from '@shopify/polaris'

export default function withCrispChat(Component: FunctionComponent | ComponentClass) {
  return function WithCrispChat(props: any) {
    const { t } = props
    const ref = useRef<HTMLElement>(null)

    // Only enable moveable in modal editor
    const [isOnline, setIsOnline] = useState<boolean>()
    const { initCrisp } = useLiveChat()

    useEffect(() => {
      initCrisp()

      // Periodically check for online status
      const timer = setInterval(() => {
        // Query the Crisp HTML element
        const crispElement = document.getElementById('crisp-chatbox')

        setIsOnline(crispElement?.getAttribute('data-availability') === 'online')
      }, 2000)

      return () => clearInterval(timer)
    }, [initCrisp])

    useEffect(() => {
      let timer: any = null

      function updatePosition(e?: Event) {
        const boxRef = ref.current

        if (!boxRef) return

        // Only update position when crisp is online to prevent layout shift
        if (!isOnline) {
          boxRef.style.display = 'none'
          return
        }

        boxRef.style.display = 'block'

        // Delay the execution a little bit to wait for the Crisp bubble to be repositioned if the viewport is resized
        if (e) {
          if (timer) {
            clearTimeout(timer)
          }

          return (timer = setTimeout(updatePosition, 100))
        }

        if (!boxRef) {
          return (timer = setTimeout(updatePosition, 500))
        }

        // Get the Crisp bubble
        const bubble = document.querySelector('#crisp-chatbox > div > a')

        if (!bubble) {
          return (timer = setTimeout(updatePosition, 500))
        }

        const rect = bubble.getBoundingClientRect()
        const diff = (boxRef.offsetHeight - rect.height) / 2

        if (rect.top - diff < 0) {
          return (timer = setTimeout(updatePosition, 500))
        }

        boxRef.style.top = `${rect.top - diff}px`
        boxRef.style.left = `${rect.right + diff - boxRef.offsetWidth}px`
      }

      // Update position of the feedback box
      updatePosition()

      // Listen to window resize event to reposition the feedback box
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('resize', updatePosition)

        if (timer) {
          clearTimeout(timer)
        }
      }
    }, [isOnline])

    return (
      <>
        <Component {...props} />
        <Box
          ref={ref}
          shadow="400"
          zIndex="500"
          width="200px"
          padding="200"
          background="bg"
          position="fixed"
          borderWidth="0165"
          borderRadius="400"
          borderColor="border-tertiary"
          visuallyHidden={isOnline === undefined}
        >
          <BlockStack gap="200">
            <InlineStack gap="100">
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  marginTop: '7px',
                  borderRadius: '3px',
                  display: 'inline-block',
                  backgroundColor: isOnline ? '#45b931' : '#b5b5b5',
                }}
              ></span>
              <Text variant="bodyMd" as="span">
                {isOnline ? t('support-is-online') : t('support-is-offline')}
              </Text>
            </InlineStack>
            <Feedback
              t={t}
              dataSource="/api/feedback"
              LoadingComponent={InlineLoading}
              fetchFunction={authenticatedFetch}
              onError={(message: string) => showToast(message)}
            />
          </BlockStack>
        </Box>
      </>
    )
  }
}
