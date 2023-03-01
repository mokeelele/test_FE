<template>
  <BaseDialog ref="refModalEdit">
    <section class="login pa-5 mt-5">
      <h1 class="text-center">Edit Post</h1>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.name"
          label="Nama"
          required
        ></v-text-field>
        <v-text-field
          v-model="formValues.jenis_kelamin"
          label="Jenis Kelamin"
          required
        ></v-text-field>
        <v-text-field
          required
          v-model="formValues.no_hp"
          label="no_hp"
        ></v-text-field>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="primary" block>Edit</v-btn>
        </div>
      </v-form>
    </section>
  </BaseDialog>
</template>
  <script setup>
import BaseDialog from "@/components/Base/Dialog.vue";
import { reactive, ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formValues = reactive({
  name: "",
  jenis_kelamin: "",
  no_hp: "",
});

const getProfile = computed(() => authStore.getProfile);

const id = ref("");

watch(getProfile, (val) => {
  id.value = val.id;
  formValues.name = val.name;
  formValues.jenis_kelamin = val.jenis_kelamin;
  formValues.no_hp = val.no_hp;
});

const refModalEdit = ref("");

const handleSubmit = () => {
  authStore.updateUser(id.value, formValues).then(() => {
    authStore.fetchUsers();
    refModalEdit.value.close();
  });
};
</script>