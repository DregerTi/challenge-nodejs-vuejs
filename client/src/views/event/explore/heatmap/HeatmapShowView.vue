<script setup>
import { defineEmits, ref, onMounted } from 'vue'
import h337 from '@mars3d/heatmap.js'

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
emit('update:screenShotBtn', true)

const heatmapCanvas = ref(null)
const canvasWidth = ref(0)
const canvasHeight = ref(0)

// Fonction pour mettre à l'échelle les coordonnées en fonction de la taille du canvas
function scaleCoordinates(data) {
    const scaledData = data.map((point) => {
        // Mise à l'échelle des coordonnées x et y en fonction de la taille du canvas
        const scaledX = ((point.x / 100) * canvasWidth.value).toFixed(0)
        const scaledY = ((point.y / 100) * canvasHeight.value).toFixed(0)

        // Vérification pour s'assurer que les coordonnées ne dépassent pas les limites valides du canvas
        const x = Math.max(0, Math.min(scaledX, canvasWidth.value))
        const y = Math.max(0, Math.min(scaledY, canvasHeight.value))

        return {
            x,
            y,
            value: point.value
        }
    })

    return scaledData
}

onMounted(() => {
    // Obtenez la largeur et la hauteur du canvas après le rendu
    canvasWidth.value = heatmapCanvas.value.offsetWidth
    canvasHeight.value = heatmapCanvas.value.offsetHeight

    console.log(canvasWidth.value)

    const heatmapInstance = h337.create({
        container: heatmapCanvas.value
    })

    const testData = {
        max: 100,
        data: [
            { x: 10, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 },
            { x: 90, y: 20, value: 50 },
            { x: 50, y: 70, value: 60 },
            { x: 30, y: 40, value: 80 }
        ]
    }

    const scaledData = scaleCoordinates(testData.data)

    const scaledTestData = {
        max: testData.max,
        data: scaledData
    }
    console.log(scaledTestData)
    heatmapInstance.setData(scaledTestData)
})
</script>

<template>
    <div>
        <div class="heatmap-canvas" ref="heatmapCanvas"></div>
    </div>
</template>

<style scoped lang="scss">
.heatmap-canvas {
    width: 100%; /* Ajustez la largeur selon vos besoins */
}
</style>
