// Define public pages
export const publicPages = ['/', '/auth/login']

// Define navigation menu
export const enabledNavMenuItems: string[] = [
  '/dashboard',
  '/templates',
  '/libraries',
  '/products',
  '/integrations',
  '/orders',
  '/preferences',
]
export const disabledNavMenuItems: string[] = ['']
export const rootPage = enabledNavMenuItems[0]

// Define function to check if a navigation menu is enabled
export function isNavMenuItemEnabled(path: string): boolean {
  if (enabledNavMenuItems.includes(path)) {
    return true
  }

  if (disabledNavMenuItems.includes(path)) {
    return false
  }

  if (enabledNavMenuItems.length > 0 && disabledNavMenuItems.length === 0) {
    return false
  }

  if (disabledNavMenuItems.length > 0 && enabledNavMenuItems.length === 0) {
    return true
  }

  return true
}

// Define whether a print area can be linked to all product variants
export const printAreaCanLinkToAllProductVariants = false
