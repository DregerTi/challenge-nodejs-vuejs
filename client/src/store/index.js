import { createStore } from 'vuex'
import untrackedPage from './modules/untrackedPage'
import tag from '@/store/modules/tag'
import conversionTunnel from '@/store/modules/conversionTunnel'
import eventStore from '@/store/modules/eventStore'

export default createStore({
    modules: {
        untrackedPage,
        tag,
        conversionTunnel,
        eventStore
    }
})
