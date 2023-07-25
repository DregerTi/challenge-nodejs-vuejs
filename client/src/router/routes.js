const ROUTES = {
    LOGIN: () => `login`,
    REGISTER: () => `register`,
    SITE: (id = '') => `sites/${id}`,
    RENEW_API_KEY: (id) => `sites/${id}/renew-api-key`,
    USER_SITE: () => `sites/my-sites`,
    UNTRACKED_PATH: (siteId, untrackPathId = null) =>
        `sites/${siteId}/untrack-paths/${untrackPathId ? untrackPathId : ''}`,
    TAG: (siteId, tagId = null) => `sites/${siteId}/tags/${tagId ? tagId : ''}`,
    CONVERSION_TUNNEL: (siteId, conversionTunnelId = null) =>
        `sites/${siteId}/conversion-tunnels/${conversionTunnelId ? conversionTunnelId : ''}`,
    EVENT_VIEW_PER_PAGE: (siteId) =>
        `events/${siteId}/view-per-page?page=1&startDate=2023-07-10&endDate=2023-07-25`
}

export default ROUTES
