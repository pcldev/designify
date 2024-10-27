import type { ComponentType } from 'react'
import { Fragment } from 'react'

// Define the props that include the `modalActive` prop
interface WithModalActiveProps {
  active: boolean
}

// Higher Order Component
const withModalConditionalRendering = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // eslint-disable-next-line react/display-name
  return (props: P & WithModalActiveProps) => {
    if (!props.active) {
      return <Fragment />
    }
    return <WrappedComponent {...props} />
  }
}

export default withModalConditionalRendering
