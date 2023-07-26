export default {
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
    getUserOs() {
        const userAgent = window.navigator.userAgent
        const platform = window.navigator.platform
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
        const iosPlatforms = ['iPhone', 'iPad', 'iPod']
        let os = null
        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS'
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS'
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows'
        } else if (/Android/.test(userAgent)) {
            os = 'Android'
        } else if (/Linux/.test(platform)) {
            os = 'Linux'
        }
        return os
    },
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
                const viewerKey = () => {
                    const key = localStorage.getItem('viewerKey')
                    if (key !== null) {
                        return JSON.parse(key)
                    }
                    const viewerKey =
                        Math.random().toString(36).substring(2, 15) +
                        Math.random().toString(36).substring(2, 15)
                    localStorage.setItem('viewerKey', JSON.stringify(viewerKey))
                    return viewerKey
                }
                const device = () => {
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
                }
                const system = () => {
                    const userAgent = window.navigator.userAgent
                    const platform = window.navigator.platform
                    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
                    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
                    const iosPlatforms = ['iPhone', 'iPad', 'iPod']
                    let os = null
                    if (macosPlatforms.indexOf(platform) !== -1) {
                        os = 'Mac OS'
                    } else if (iosPlatforms.indexOf(platform) !== -1) {
                        os = 'iOS'
                    } else if (windowsPlatforms.indexOf(platform) !== -1) {
                        os = 'Windows'
                    } else if (/Android/.test(userAgent)) {
                        os = 'Android'
                    } else if (/Linux/.test(platform)) {
                        os = 'Linux'
                    }
                    return os
                }

                eventListeners[binding.arg] = () => {
                    sendEvent({
                        ...configData,
                        viewerKey: viewerKey(),
                        device: device(),
                        system: system(),
                        user_agent: navigator.userAgent,
                        path: window.location.href,
                        type: 'tag',
                        tagKey: binding.value
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
            let { clientX, clientY } = event
            const width = window.innerWidth
            let size = 'other'
            if (width < 700) {
                size = 'sm'
                clientX = ((clientX / 100) * 600).toFixed(0)
            } else if (width < 868) {
                size = 'md'
                clientX = ((clientX / 100) * 768).toFixed(0)
            } else {
                clientX = ((clientX / 100) * 992).toFixed(0)
                size = 'lg'
            }
            sendEvent({
                ...configData,
                viewerKey: this.getViewerKey(),
                device: this.getDeviceType(),
                system: this.getUserOs(),
                user_agent: navigator.userAgent,
                path: window.location.href,
                type: 'click',
                viewPort: size,
                coordinates: { x: clientX, y: clientY }
            })
        }

        const sendPageLoadEvent = () => {
            sendEvent({
                ...configData,
                viewerKey: this.getViewerKey(),
                device: this.getDeviceType(),
                system: this.getUserOs(),
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
