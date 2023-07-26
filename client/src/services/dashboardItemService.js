import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

export const createDashboardItem = async function createDashboardItem(_dashboardItem) {
    try {
        const response = await requester(
            ROUTES.DASHBOARD_ITEMS(router.currentRoute.value.params.site),
            'POST',
            {
                ..._dashboardItem
            },
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getDashboardItems = async function getDashboardItems() {
    try {
        const response = await requester(
            ROUTES.DASHBOARD_ITEMS(router.currentRoute.value.params.site),
            'GET',
            {},
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const deleteDashboardItem = async function deleteDashboardItem(id) {
    try {
        const response = await requester(
            ROUTES.DASHBOARD_ITEMS(router.currentRoute.value.params.site, id),
            'DELETE',
            {},
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const updateDashboardItem = async function updateDashboardItem(_dashboardItem) {
    try {
        const response = await requester(
            ROUTES.DASHBOARD_ITEMS(router.currentRoute.value.params.site, _dashboardItem.id),
            'PATCH',
            {
                ..._dashboardItem
            },
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}
