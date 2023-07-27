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
    EVENT_VIEW_PER_PAGE: (siteId) => `events/${siteId}/view-per-page`,
    EVENT_SESSION: (siteId) => `events/${siteId}/total-session`,
    EVENT_SESSION_DURATION: (siteId) => `events/${siteId}/session-avg-time`,
    EVENT_ACTIVE_USERS: (siteId) => `events/${siteId}/active-users`,
    SITE_USERS: (siteId) => `sites/${siteId}/users`,
    DASHBOARD_ITEMS: (siteId, id) => `sites/${siteId}/dashboard-items/${id ? id : ''}`,
    EVENT_DEVICE: (siteId) => `events/${siteId}/viewer-by-os`,
    EVENT_COUNTRY: (siteId) => `events/${siteId}/viewer-by-country`,
    EVENT_HEATMAP_PATHS: (siteId) => `events/${siteId}/heatmap-paths`,
    EVENT_HEATMAP: (siteId) => `events/${siteId}/heatmap`
}

export default ROUTES
