import { createStore } from 'vuex'
import untrackedPage from './modules/untrackedPage'
import tag from '@/store/modules/tag'
import conversionTunnel from '@/store/modules/conversionTunnel'

export default createStore({
    modules: {
        untrackedPage,
        tag,
        conversionTunnel
    }
})
