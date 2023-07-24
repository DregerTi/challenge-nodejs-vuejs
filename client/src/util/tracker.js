export default {
    getDeviceType() {
        const ua = navigator.userAgent
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet'
        }
        if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return 'mobile'
        }
        return 'desktop'
    },
    getViewerKey() {
        const key = localStorage.getItem('viewerKey')
        if (key !== null) {
            return JSON.parse(key)
        }
        const viewerKey =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        localStorage.setItem('viewerKey', JSON.stringify(viewerKey))
        return viewerKey
    },
    install(Vue, option) {
        if (!option.APP_ID) {
            throw new Error('APP_ID is required')
        }
        let currentHref = null
        const eventListeners = {}
        const configData = {
            APP_ID: option.APP_ID
        }

        Vue.directive('track', {
            mounted(el, binding) {
                eventListeners[binding.arg] = () => {
                    sendEvent({
                        ...configData,
                        viewerKey: this.getViewerKey(),
                        device: this.getDeviceType(),
                        user_agent: navigator.userAgent,
                        path: window.location.href,
                        type: 'tag',
                        tagKey: binding.arg
                    })
                }
                el.addEventListener('click', eventListeners[binding.arg])
            },
            unmounted(el, binding) {
                el.removeEventListener('click', eventListeners[binding.arg])
                delete eventListeners[binding.arg]
            }
        })

        Vue.mixin({
            created() {
                if (window.location.href !== currentHref) {
                    currentHref = window.location.href
                    sendPageLoadEvent()
                }
            },
            mounted() {
                document.getElementsByTagName('body')[0].addEventListener('click', handleClick)
            },
            unmounted() {
                document.getElementsByTagName('body')[0].removeEventListener('click', handleClick)
            }
        })

        const handleClick = (event) => {
            const { clientX, clientY } = event
            sendEvent({
                ...configData,
                viewerKey: this.getViewerKey(),
                device: this.getDeviceType(),
                user_agent: navigator.userAgent,
                path: window.location.href,
                type: 'click',
                coordinates: { x: clientX, y: clientY }
            })
        }

        const sendPageLoadEvent = () => {
            sendEvent({
                ...configData,
                viewerKey: this.getViewerKey(),
                device: this.getDeviceType(),
                user_agent: navigator.userAgent,
                path: window.location.href,
                type: 'view'
            })
        }
    }
}

const sendEvent = (data) => {
    const apiKey = data.APP_ID
    delete data.APP_ID
    fetch(`http://localhost:3000/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify(data)
    })
}
