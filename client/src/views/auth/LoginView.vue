<script setup>
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import { login, register } from '@/services/securityService'
import { reactive, ref } from 'vue'
import AuthProvider from '@/contexts/AuthProvider.vue'
import { useRouter } from 'vue-router'

const defaultValue = {
    email: '',
    password: ''
}
const formData = reactive({ ...defaultValue })
const errors = ref({})
const router = useRouter()

async function handleSubmit() {
    try {
        await login(formData.email, formData.password)
        Object.assign(formData, defaultValue)
        errors.value = {}
        router.push({ name: 'analytics' })
    } catch (error) {
        errors.value = error
    }
}
</script>

<template>
    <section>
        <AuthProvider #default="{ user, login }">
            <div>
                <h2>Login</h2>
                <p>Welcome back!</p>
            </div>
            <form @submit.prevent="handleSubmit">
                <Input
                    :error="errors.email"
                    type="text"
                    placeholder="example@email.com"
                    name="email"
                    label="Email"
                    v-model:value="formData.email"
                />

                <Input
                    :error="errors.password"
                    type="password"
                    placeholder="Must have 6 characters minimum"
                    name="password"
                    label="Password"
                    v-model:value="formData.password"
                />
                <div>
                    <span class="a-href">
                        <RouterLink to="forgot-password">Forgot password?</RouterLink>
                    </span>
                    <p>
                        Don't have an account?
                        <span class="a-href">
                            <RouterLink to="signup">Sign up</RouterLink>
                        </span>
                    </p>
                </div>
                <Button type="submit" title="Login" />
            </form>
        </AuthProvider>
    </section>
</template>

<style lang="scss">
.auth-container > :last-child {
    gap: 7rem;
}
</style>
