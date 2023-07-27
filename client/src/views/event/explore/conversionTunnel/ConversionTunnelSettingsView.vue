<script setup>
import { computed, defineEmits, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/atoms/Button.vue'
import { Switch } from '@headlessui/vue'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', true)
emit('update:updateBtn', true)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', true)
emit('update:descriptionHidden', false)

const store = useStore()
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)
let tags = computed(() => store.state.tag.tags)

let selectedTag = ref('')

onBeforeMount(async () => {
    await store.dispatch('getConversionTunnel')
    await store.dispatch('getTags')

    const myTag = conversionTunnel.value.ConversionTunnelTags.map((tag) => tag)

    selectedTag.value = myTag

    tags = tags.value.map((tag) => {
        const index = myTag.findIndex((myTag) => myTag.tagId === tag.id)
        if (index !== -1) {
            tag.order = myTag[index].order
        }
        return tag
    })
})

const isSelected = (tag) => {
    for (let i = 0; i < selectedTag.value.length; i++) {
        const tagId = selectedTag.value[i].tagId ?? selectedTag.value[i].id
        if (tagId === tag.id) {
            return true
        }
    }
}

const toggleTag = (tag) => {
    const index = selectedTag.value.findIndex((selected) => selected.tagId ?? selected.id === tag.id)
    if (index !== -1) {
        selectedTag.value.splice(index, 1)
    } else {
        selectedTag.value.push(tag)
    }
}

const saveOrder = (tag) => {
    const index = selectedTag.value.findIndex((selected) => selected.tagId ?? selected.id === tag.id)
    if (index !== -1) {
        selectedTag.value[index].order = tag.order
    }
}

const onClick = (tag) => {
    isSelected(tag)
    toggleTag(tag)
    saveOrder(tag)
}

const saveTags = async () => {
    const tags = selectedTag.value.map((tag) => {
        return {
            id: tag.id,
            order: tag.order
        }
    })

    await store.dispatch('updateConversionTunnelTags', tags)
}
</script>

<template>
    <div>
        <form @submit.prevent="saveTags()">
            <div v-for="tag in tags" :key="tag.id">
                <Switch :class="[isSelected(tag) ? 'bg-blue-600' : 'bg-gray-200']"
                    class="relative inline-flex h-6 w-11 items-center rounded-full" @change="toggleTag(tag)"
                    @click="onClick(tag)">
                    <span class="sr-only">{{ tag.name }}</span>
                    <span :class="isSelected(tag) ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </Switch>
                <span class="ml-2">{{ tag.name }}</span>
                <input v-model="tag.order" type="number" min="1" :disabled="!isSelected(tag)" class="ml-2 p-2 rounded-md" />
            </div>
            <Button type="submit" title="Save those tags" />
        </form>
    </div>
</template>

<style scoped lang="scss"></style>
