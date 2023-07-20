<script setup>
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import { reactive } from 'vue'
import AuthProvider from '@/contexts/AuthProvider.vue'

const formData = reactive({
    email: '',
    password: ''
})
</script>

<template>
    <section>
        <AuthProvider #default="{ user, login, errors }">
            <div>
                <h2>Login</h2>
                <p>Welcome back!</p>
            </div>
            <form @submit.prevent="login(formData.email, formData.password)">
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
