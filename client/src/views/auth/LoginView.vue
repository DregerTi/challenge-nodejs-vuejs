<script setup>
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
</script>

<template>
    <section>
        <div>
            <h2>Login</h2>
            <p>Welcome back!</p>
        </div>
        <form>
            <Input type="text" placeholder="example@email.com" name="email" label="Email" />

            <Input
                type="password"
                placeholder="Must have 6 characters minimum"
                name="password"
                label="Password"
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
            <Button title="Login" />
        </form>
    </section>
</template>

<style lang="scss">
.auth-container > :last-child {
    gap: 7rem;
}
</style>
