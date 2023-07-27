<script setup>
import { defineEmits, ref, onMounted, computed, onUnmounted, watch } from 'vue'
import h337 from '@mars3d/heatmap.js'
import { useStore } from 'vuex'
import router from '@/router'
import Button from '@/components/atoms/Button.vue'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore',
    'update:screenShotBtn'
])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', true)
emit('update:descriptionHidden', false)
emit('update:screenShotBtn', false)

const heatmapCanvas = ref(null)
const canvasWidth = ref(0)
const canvasHeight = ref(0)

function scaleCoordinates(data) {
    if (!data || data[0] === undefined) return []
    const scaledData = data[0].results.map((point) => {
        const scaledX = canvasWidth.value * (((point.x / 922) * 100) / 100)
        const scaledY = point.y
        const x = Math.max(0, Math.min(scaledX, canvasWidth.value))
        const y = scaledY

        return {
            x,
            y,
            value: point.value
        }
    })
    return scaledData
}

const store = useStore()
const heatmap = computed(() => store.state.eventStore.heatmap)
const rangeDate = computed(() => store.state.eventStore.rangeDate)
const heatmapInstance = ref(null)

onMounted(() => {
    store.dispatch(
        'getHeatmap',
        router.currentRoute.value.params.id,
        router.currentRoute.value.params.size
    )

    canvasWidth.value = heatmapCanvas.value.offsetWidth
    canvasHeight.value = heatmapCanvas.value.offsetHeight

    heatmapInstance.value = h337.create({
        container: heatmapCanvas.value
    })

    const scaledData = scaleCoordinates(store.state.eventStore.heatmap)

    const scaledTestData = {
        data: scaledData
    }

    heatmapInstance.value.setData(scaledTestData)
})

watch(heatmap, () => {
    canvasWidth.value = heatmapCanvas.value.offsetWidth
    canvasHeight.value = heatmapCanvas.value.offsetHeight

    const scaledData = scaleCoordinates(store.state.eventStore.heatmap)

    const scaledTestData = {
        data: scaledData
    }
    heatmapInstance.value.repaint()
    heatmapInstance.value.setData(scaledTestData)
})

watch(
    () => router.currentRoute.value.params,
    () => {
        store.dispatch('closeEventSourceHeatmapPaths')
        store.dispatch('getHeatmapPaths')
        store.dispatch(
            'getHeatmap',
            router.currentRoute.value.params.id,
            router.currentRoute.value.params.size
        )
    }
)

watch(rangeDate, () => {
    store.dispatch('closeEventSourceHeatmapPaths')
    store.dispatch('getHeatmapPaths')
    store.dispatch(
        'getHeatmap',
        router.currentRoute.value.params.id,
        router.currentRoute.value.params.size
    )
})

onUnmounted(() => {
    store.dispatch('closeEventSourceHeatmap')
})
</script>

<template>
    <div>
        {{ router.currentRoute.value.params.size }}
        <nav class="heatmap-nav">
            <RouterLink
                :to="{ name: 'heatmap', params: { id: $route.params.id, size: 'sm' } }"
                class="w-full"
            >
                <Button
                    title="Mobile"
                    icon="Smartphone"
                    class="w-full"
                    :variant="
                        router.currentRoute.value.params.size === 'sm'
                            ? 'button--dark-grey'
                            : 'light-grey'
                    "
                />
            </RouterLink>
            <RouterLink
                :to="{ name: 'heatmap', params: { id: $route.params.id, size: 'md' } }"
                class="w-full"
            >
                <Button
                    title="Tablet"
                    icon="Tablet"
                    class="w-full"
                    :variant="
                        router.currentRoute.value.params.size == 'md'
                            ? 'button--dark-grey'
                            : 'light-grey'
                    "
                />
            </RouterLink>
            <RouterLink
                :to="{ name: 'heatmap', params: { id: $route.params.id, size: 'lg' } }"
                class="w-full"
            >
                <Button
                    title="Desktop"
                    icon="Laptop"
                    class="w-full"
                    :variant="
                        router.currentRoute.value.params.size == 'lg'
                            ? 'button--dark-grey'
                            : 'light-grey'
                    "
                />
            </RouterLink>
        </nav>
        <div>
            <div class="heatmap-canvas" ref="heatmapCanvas"></div>
            <iframe
                src="https://www.laroutedutrone.fr/presentation"
                frameborder="0"
                style="width: 100%; height: 3000px"
            ></iframe>
        </div>
    </div>
</template>

<style scoped lang="scss">
.heatmap-canvas {
    width: 100%;
    height: 3000px;
}
.heatmap-nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    margin-top: 2rem;
    background-color: var(--color-light-grey);
    border-radius: 10px;
}
</style>
