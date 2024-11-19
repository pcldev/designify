import { Text } from '@shopify/polaris'
import { isRouteErrorResponse, useRouteError } from '@remix-run/react'

export function ErrorBoundary(props?: { error: Error }) {
  const error = useRouteError() || props?.error

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Text as="h1" variant="headingLg">
          {error.status} {error.statusText}
        </Text>
        <Text as="p" variant="headingMd">
          {error.data}
        </Text>
      </div>
    )
  }

  if (error instanceof Error) {
    return (
      <div>
        <Text as="h1" variant="headingLg">
          Error
        </Text>
        <Text as="p" variant="headingMd">
          {error.message}
        </Text>
        <Text as="p" variant="headingMd">
          The stack trace is:
        </Text>
        <pre>{error.stack}</pre>
      </div>
    )
  }

  return (
    <Text as="h1" variant="headingLg">
      Unknown Error
    </Text>
  )
}
