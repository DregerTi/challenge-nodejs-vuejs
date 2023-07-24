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
        `sites/${siteId}/conversion-tunnels/${conversionTunnelId ? conversionTunnelId : ''}`
}

export default ROUTES
