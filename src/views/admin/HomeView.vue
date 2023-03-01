<template>
  <!-- Modal Post Edit -->
  <ModalPostEdit ref="refModalPostEdit"></ModalPostEdit>
  <!-- End Modal Post Edit -->

  <!-- Modal Post Add -->
  <ModalPostAdd ref="refModalPostAdd"></ModalPostAdd>
  <!-- End Modal Post Add -->

  <!-- Modal Post Comment -->
  <!-- End Modal Post Comment -->

  <v-card>
    <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
      <v-tab value="one">Absensi</v-tab>
      <v-tab value="two">Karyawan</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Jam Check In</th>
                <th class="text-left">Foto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getAttendance" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.clock_in }}</td>
                <td><v-img cover height="250" :src="item.photo"></v-img></td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
        <v-window-item value="two">
          <v-btn @click="handleAddPost" block class="my-5" color="success"
            >Tambah Karyawan</v-btn
          >
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getUsers" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td class="d-flex align-center gap-3">
                  <v-icon
                    color="warning"
                    style="cursor: pointer"
                    @click="handlePostEdit(item.id)"
                    >mdi-pencil</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ModalPostEdit from "@/components/Modal/PostEdit.vue";
import ModalPostAdd from "@/components/Modal/PostAdd.vue";
import { useAttendanceStore } from "@/stores/attendance";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";

const attendanceStore = useAttendanceStore();
const authStore = useAuthStore();
const route = useRoute();

const tab = ref("");

const getAttendance = computed(() => attendanceStore.getAttendance);
const getUsers = computed(() => authStore.getUsers);
const isUser = computed(() => authStore.getIsUser);

const refModalPostEdit = ref("");
const handlePostEdit = (id) => {
  refModalPostEdit.value.$refs.refModalEdit.open();
  authStore.fetchProfile(id);
};

const refModalPostAdd = ref("");
const handleAddPost = () => {
  refModalPostAdd.value.$refs.refModalAdd.open();
};

onMounted(() => {
  attendanceStore.fetchAttendance();
});

onMounted(() => {
  authStore.fetchUsers();
});
</script>