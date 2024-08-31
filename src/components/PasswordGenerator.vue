<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits<{
  (e: 'generate', password: string): void;
}>();


const passwordGenerated = ref<boolean>(false);

const generatePassword = (): void => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  emits('generate', password);
  passwordGenerated.value = true;
};  
</script>


<template>
  <div class="PasswordGenerator__area">
    <button v-if="!passwordGenerated" @click="generatePassword" class="PasswordGenerator__generateBtn">
      Генерировать
    </button>
  </div>
</template>


<style lang="scss">

.PasswordGenerator__generateBtn {
  position: absolute;
  right: 0;
  top: 8px;
  margin-left: 8px;
  font-family: 'Google Sans Regular';
  font-weight: 500;
  font-size: 12px;
  padding: 13.2px 16px;
  border: 1px solid #ddd;
  border-radius: 0px 8px 8px 0px;
  outline: none;
  cursor: pointer;
  background-color: white;
  color: gray;
  transition: 0.3s ease-in-out;

  &:hover {
    transition: 0.3s ease-in-out;
    background-color: lightgray;
  }
}
</style>
