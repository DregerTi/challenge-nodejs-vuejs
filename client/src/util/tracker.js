export default {
    install(Vue, option) {
        if (!option.APP_ID) {
            throw new Error('APP_ID is required')
        }
        let currentHref = null
        const eventListeners = {}
        const configData = {
            APP_ID: option.APP_ID,
            id_visitor: 'visitor',
            id_session: 'session'
        }

        Vue.directive('track', {
            mounted(el, binding) {
                eventListeners[binding.arg] = () => {
                    sendEvent({
                        ...configData,
                        user_agent: navigator.userAgent,
                        url: window.location.href,
                        event: 'tag',
                        tag: binding.arg
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
                user_agent: navigator.userAgent,
                url: window.location.href,
                event: 'click',
                coordinates: { x: clientX, y: clientY }
            })
        }

        const sendPageLoadEvent = () => {
            sendEvent({
                ...configData,
                user_agent: navigator.userAgent,
                url: window.location.href,
                event: 'view'
            })
        }
    }
}

const sendEvent = (data) => {
    fetch(`http://localhost:3000/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
