const ROUTES = {
    LOGIN: () => `login`,
    REGISTER: () => `register`,
    SITE: (id = '') => `sites/${id}`,
    RENEW_API_KEY: (id) => `sites/${id}/renew-api-key`,
    USER_SITE: () => `sites/my-sites`,
    UNTRACKED_PATH: (siteId, untrackPathId = null) =>
        `site/${siteId}/untracked-paths/${untrackPathId ? untrackPathId : ''}`
}

export default ROUTES
