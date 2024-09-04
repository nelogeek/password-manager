<script setup lang="ts">
import { ref, watch } from 'vue';

const emits = defineEmits<{
  (e: 'generate', password: string): void;
}>();


const passwordGenerated = ref<boolean>(false);
const length = ref<number>(12);
const useLowerCase = ref<boolean>(false);
const useUpperCase = ref<boolean>(false);
const useRandomCase = ref<boolean>(false);
const useNumbers = ref<boolean>(false);
const useSymbols = ref<boolean>(false);
const customCharset = ref<any>(null);

watch(customCharset, (newVal) => {
  if (newVal !== null && newVal !== '') {
    useLowerCase.value = false;
    useUpperCase.value = false;
    useRandomCase.value = false;
    useNumbers.value = false;
    useSymbols.value = false;
  }
});

const generatePassword = (): void => {
  if (!useLowerCase.value && !useUpperCase.value && !useRandomCase.value && !useNumbers.value && !useSymbols.value && !customCharset.value) {
    return;
  }

  let charset = "";
  if (customCharset.value) {
    charset = customCharset.value;
  } else {
    if (useLowerCase.value) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase.value) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useRandomCase.value) charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers.value) charset += "0123456789";
    if (useSymbols.value) charset += "!@#$%^&*()";
  }

  let password = '';
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  emits('generate', password);
  passwordGenerated.value = true;
};

</script>


<template>
  <div class="PasswordGenerator__area">
    <div class="PasswordGenerator__settings">
      <label class="PasswordGenerator__use">
        <input type="checkbox" v-model="useLowerCase" :disabled="customCharset" />
        Нижний регистр
      </label>
      <label class="PasswordGenerator__use">
        <input type="checkbox" v-model="useUpperCase" :disabled="customCharset" />
        Верхний регистр
      </label>
      <label class="PasswordGenerator__use">
        <input type="checkbox" v-model="useRandomCase" :disabled="customCharset" />
        Случайный
      </label>
      <label class="PasswordGenerator__use">
        <input type="checkbox" v-model="useNumbers" :disabled="customCharset" />
        Цифры
      </label>
      <label class="PasswordGenerator__use">
        <input type="checkbox" v-model="useSymbols" :disabled="customCharset" />
        Спецсимволы
      </label>
    </div>

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

.PasswordGenerator__settings {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.PasswordGenerator__use {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  gap: 5px;
  margin-bottom: 10px;
}

.PasswordGenerator__input {
  font-family: "Google Sans Regular";
  font-weight: 400;
  padding: 5px 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
}


.PasswordGenerator__settings input[type="checkbox"]:disabled {
  opacity: 0.5;
}
</style>
