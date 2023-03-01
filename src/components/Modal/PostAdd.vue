<template>
  <BaseDialog ref="refModalAdd">
    <section class="login pa-5 mt-5">
      <h1 class="text-center">Tambah Karyawan</h1>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.name"
          label="name"
          required
        ></v-text-field>
        <v-text-field
          v-model="formValues.email"
          label="email"
          required
        ></v-text-field>
        <v-text-field
          required
          v-model="formValues.password"
          label="password"
          :type="'password'"
        ></v-text-field>
        <v-text-field
          required
          v-model="formValues.jenis_kelamin"
          label="jenis_kelamin"
        ></v-text-field>
        <v-text-field
          required
          v-model="formValues.no_hp"
          label="no_hp"
        ></v-text-field>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="success" block>Add</v-btn>
        </div>
      </v-form>
    </section>
  </BaseDialog>
</template>
  <script setup>
import BaseDialog from "@/components/Base/Dialog.vue";
import { reactive, ref } from "@vue/reactivity";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formValues = reactive({
  name: "",
  email: "",
  password: "",
  jenis_kelamin: "",
  no_hp: "",
});

const refModalAdd = ref("");

const handleSubmit = () => {
  authStore.createUser(formValues).then(() => {
    authStore.fetchUsers();
    refModalAdd.value.close();
    console.log("berhasil");
  });
};
</script>