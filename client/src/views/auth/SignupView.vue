<script setup>
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import { reactive, ref } from 'vue'
import AuthProvider from '@/contexts/AuthProvider.vue'
import { register } from '@/services/securityService'
import { useRouter } from 'vue-router'

const defaultValue = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const formData = reactive({ ...defaultValue })
const errors = ref({})
const router = useRouter()
async function handleSubmit() {
    try {
        await register(formData)
        Object.assign(formData, defaultValue)
        errors.value = {}
        router.push({ name: 'login' })
    } catch (error) {
        errors.value = error
    }
}
</script>

<template>
    <section>
        <AuthProvider #default="{ user, login }">
            <div>
                <h2>Signup</h2>
                <p>Welcome! Are you ready to digitanalyze your website?</p>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-8 w-full md:flex-row">
                    <Input
                        :error="errors.firstname"
                        class="w-full"
                        type="text"
                        placeholder="Firstname"
                        name="Fistname"
                        label="Fistname"
                        v-model:value="formData.firstname"
                    />
                    <Input
                        :error="errors.lastname"
                        class="w-full"
                        type="text"
                        placeholder="Lastname"
                        name="Lastname"
                        label="Lastname"
                        v-model:value="formData.lastname"
                    />
                </div>

                <Input
                    :error="errors.email"
                    type="text"
                    placeholder="Email"
                    name="email"
                    label="Email"
                    v-model:value="formData.email"
                />

                <Input
                    :error="errors.password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    label="Password"
                    v-model:value="formData.password"
                />

                <Input
                    :error="errors.confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    name="confirm-password"
                    label="Confirm Password"
                    v-model:value="formData.confirmPassword"
                />
                <div>
                    <p>
                        Already have an account?
                        <span class="a-href">
                            <RouterLink to="login">Login</RouterLink>
                        </span>
                    </p>
                </div>
                <Button type="submit" title="Sign up" />
            </form>
        </AuthProvider>
    </section>
</template>

<style lang="scss">
.body {
    position: initial;
}

.auth-container > :last-child {
    gap: 2rem;
}
</style>
