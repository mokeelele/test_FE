<template>
  <v-row v-if="!getIsUser">
    <v-col md="5" class="justify-center">
      <v-card>
        <h1 align="center" class="mb-5">Login</h1>
        <v-form v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field v-model="formValues.email" label="Email" required>
          </v-text-field>
          <v-text-field
            v-model="formValues.password"
            label="password"
            :type="'password'"
            required
          >
          </v-text-field>
          <div class="d-flex justify-center">
            <v-btn type="submit" color="success" class="mb-2">Login</v-btn>
          </div>
          <a href="/login">Login as Admin</a>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col md="5" class="justify-center">
      <v-card>
        <h1 align="center" class="mb-5">Daily Check In</h1>
        <v-form v-model="valid" @submit.prevent="handleCheckIn">
          <v-file-input
            v-model="formCheckIn.image"
            @change="handleChangePhoto($event)"
            label="Foto"
          ></v-file-input>
          <div class="d-flex justify-center">
            <v-btn type="submit" color="success" class="mb-2">Check In</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAttendanceStore } from "@/stores/attendance";

const attendanceStore = useAttendanceStore();
const authStore = useAuthStore();
const router = useRouter();

const getIsUser = computed(() => {
  return authStore.getIsUser;
});

const formValues = reactive({
  email: "gustimichaeltest@gmail.com",
  password: "123456",
});

const formCheckIn = reactive({
  image: "",
});

const handleSubmit = async () => {
  authStore.login(formValues).then(async () => {
    await router.push("/");
  });
};

const handleCheckIn = () => {
  attendanceStore.createAttendance(formValues).then(() => {
    attendanceStore.fetchAttendance();
  });
};
</script>