<script setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import SiteProvider from '@/contexts/SiteProvider.vue'
import { EventSourcePolyfill } from 'event-source-polyfill';
import * as tokenStorage from "@/services/tokenStorage";

const token = await tokenStorage.getToken()
const eventSource = new EventSourcePolyfill(
  'http://localhost:3000/events/1/total-session?startDate=2023-07-23&endDate=2023-07-25',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
const listener = function (event) {
  console.log(event);
};
eventSource.addEventListener("open", listener);
eventSource.addEventListener("message", listener);
eventSource.addEventListener("error", listener);
// Écoute des événements SSE

</script>

<template>
    <div>
        <SiteProvider #default="{ refreshApiKey, apiKey }">
            <h2>Web site API key</h2>
            <div class="mt-12 mb-12 flex gap-4 items-end">
                <Input
                    class="grow"
                    label="API key"
                    type="text"
                    placeholder="API key"
                    name="name"
                    :value="apiKey"
                />
                <Button icon="Autorenew" class="h-fit mb-2.5" @click="refreshApiKey" />
            </div>
        </SiteProvider>
    </div>
</template>

<style scoped lang="scss"></style>
