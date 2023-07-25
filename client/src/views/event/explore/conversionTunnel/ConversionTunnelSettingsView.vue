<script setup>
import { computed, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/atoms/Button.vue'
import router from '@/router'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/vue'

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
const tags = computed(() => store.state.tag.tags)

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan'
]
const selectedPerson = ref(people[0])
const query = ref('')

const filteredPeople = computed(() =>
    query.value === ''
        ? people
        : people.filter((person) => {
              return person.toLowerCase().includes(query.value.toLowerCase())
          })
)
</script>

<template>
    <h2>
        {{ conversionTunnel?.name }}
    </h2>
    <Combobox v-model="selectedPerson">
        <ComboboxInput @change="query = $event.target.value" />
        <ComboboxOptions>
            <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person">
                {{ person }}
            </ComboboxOption>
        </ComboboxOptions>
    </Combobox>

    <div v-for="tag in tags" :key="tag.id">
        <RouterLink
            :to="{
                name: 'tag',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: tag.id
                }
            }"
        >
            <Button class="w-full mt-14 mb-8" variant="light-grey" :title="tag.name" />
        </RouterLink>
    </div>
</template>

<style scoped lang="scss"></style>
