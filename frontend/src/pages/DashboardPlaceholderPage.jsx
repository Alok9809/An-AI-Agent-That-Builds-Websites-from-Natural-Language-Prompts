import React from 'react'
import { DashboardPage } from './DashboardPage'

/**
 * Backward compatibility alias for DashboardPlaceholderPage.
 * Redirects all legacy references directly to the fully-featured DashboardPage.
 */
export const DashboardPlaceholderPage = (props) => {
  return <DashboardPage {...props} />
}

export default DashboardPlaceholderPage
