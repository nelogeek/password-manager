<template>
  <div v-if="isVisible" class="notification" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  message: string;
  type: 'success' | 'error';
}>();

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
});
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 16px;
  right: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: white;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeout {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
