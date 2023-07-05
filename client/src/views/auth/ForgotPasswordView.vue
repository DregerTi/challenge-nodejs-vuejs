<script setup>
import Button from "@/components/atoms/Button.vue";
import Input from "@/components/atoms/Input.vue";
import AuthLayout from "@/components/organisms/AuthLayout.vue";
</script>

<template>
  <section>
    <div>
      <h2>Forgot password</h2>
      <p>It's look that you have a problem</p>
    </div>
    <form>
      <Input type="text" placeholder="example@email.com" name="email" label="Email" />
      <div>
        <p>
          Don't have an account?
          <span class="a-href">
            <RouterLink to="signup">Sign up</RouterLink>
          </span>
        </p>
        <p>
          Already have an account?
          <span class="a-href">
            <RouterLink to="login">Login</RouterLink>
          </span>
        </p>
      </div>
      <Button title="Send" />
    </form>
  </section>
</template>

<style lang="scss">
</style>
