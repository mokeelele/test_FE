<template>
  <BaseDialog ref="refModalLogin">
    <section class="login pa-5 mt-5">
      <h1 class="text-center">Login</h1>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="formValues.password"
          label="Password"
          required
        ></v-text-field>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="primary">Login</v-btn>
        </div>
      </v-form>
    </section>
  </BaseDialog>
</template>
<script setup>
import BaseDialog from "@/components/Base/Dialog.vue";
import { reactive } from "@vue/reactivity";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const formValues = reactive({
  email: "bobandrean91@gmail.com",
  password: "12345678",
});

const handleSubmit = async () => {
  authStore.login(formValues).then(async () => {
    await router.push("/admin");
  });
};
</script>