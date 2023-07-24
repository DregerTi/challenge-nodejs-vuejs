<script setup>
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import { reactive } from 'vue'
import AuthProvider from '@/contexts/AuthProvider.vue'

const formData = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirmation: ''
})
</script>

<template>
    <section>
        <AuthProvider #default="{ user, register, errors }">
            <div>
                <h2>Signup</h2>
                <p>Welcome! Are you ready to digitanalyze your website?</p>
            </div>
            <form @submit.prevent="register(formData)">
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
                    :error="errors.passwordConfirmation"
                    type="password"
                    placeholder="Confirm password"
                    name="confirm-password"
                    label="Confirm Password"
                    v-model:value="formData.passwordConfirmation"
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
