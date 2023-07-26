import { createStore } from 'vuex'
import untrackedPage from './modules/untrackedPage'
import tag from '@/store/modules/tag'
import conversionTunnel from '@/store/modules/conversionTunnel'
import eventStore from '@/store/modules/eventStore'
import siteStore from '@/store/modules/siteStore'
import dashboardItemStore from '@/store/modules/dashboardItemStore'

export default createStore({
    modules: {
        untrackedPage,
        tag,
        conversionTunnel,
        eventStore,
        siteStore,
        dashboardItemStore
    }
})
