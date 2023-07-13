<script setup>
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import AuthLayout from '@/components/templates/AuthLayout.vue'
</script>

<template>
    <section>
        <div>
            <h2>Signup</h2>
            <p>Welcome! Are you ready to digitanalyze your website?</p>
        </div>
        <form>
            <div class="flex flex-col gap-8 w-full md:flex-row">
                <Input
                    class="w-full"
                    type="text"
                    placeholder="Firstname"
                    name="Fistname"
                    label="Fistname"
                />
                <Input
                    class="w-full"
                    type="text"
                    placeholder="Lastname"
                    name="Lastname"
                    label="Lastname"
                />
            </div>

            <Input type="text" placeholder="Email" name="email" label="Email" />

            <Input type="pasword" placeholder="Password" name="password" label="Password" />

            <Input
                type="password"
                placeholder="Confirm password"
                name="confirm-password"
                label="Confirm Password"
            />
            <div>
                <p>
                    Already have an account?
                    <span class="a-href">
                        <RouterLink to="login">Login</RouterLink>
                    </span>
                </p>
            </div>
            <Button title="Sign up" />
        </form>
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
