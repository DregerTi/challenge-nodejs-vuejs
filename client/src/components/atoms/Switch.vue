<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'

const onClick = () => {
    if (!enabled.value) {
        document.documentElement.classList.add('dark-theme')
    } else {
        document.documentElement.classList.remove('dark-theme')
    }
}

const enabled = ref(false)
</script>

<template>
    <div class="switch">
        <Switch
            v-model="enabled"
            v-on:click="onClick"
            :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
            class="relative inline-flex shrink-0 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
            <span class="sr-only">Ui mode</span>
            <span
                aria-hidden="true"
                :class="enabled ? 'translate-x-12' : 'translate-x-0'"
                class="pointer-events-none inline-block transform ring-0"
            />
            <div class="container-icon-mode" >
                <IconSun class="text-transparent"  />
                <IconMoon class="text-transparent" />
            </div>
        </Switch>
    </div>
</template>

<style scoped lang="scss">
.switch {
    & :first-child {
        border-radius: 14px;
        background-color: var(--color-primary);
        cursor: pointer;
        border: none;
        width: 6rem;
        height: 3rem;
        transition: all 0.2s ease-in-out;

        & > span:nth-child(2) {
            z-index: 12;
            border-radius: 8px;
            background-color: var(--color-grey);
            width: 2.1875rem;
            height: 2.1875rem;
            margin: 0.4rem;
            transition: all 0.2s ease-in-out;
        }
    }

    .container-icon-mode {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 7rem;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 0.5rem 0.8rem;

        > svg {
            width: 1.3rem;
            height: 1.3rem;
            transition: all 0.2s ease-in-out;
        }

        > svg:nth-child(2) {
            width: 1.2rem;
            height: 1.2rem;
        }
    }
}
</style>
