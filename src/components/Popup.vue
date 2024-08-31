<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted, onUnmounted, watch } from 'vue';
import PasswordGenerator from '@/components/PasswordGenerator.vue';

const props = defineProps<{
  title: string;
  detailPassword: string;
}>();

const emits = defineEmits<{
  (e: 'update', title: string, detailPassword: string): void;
  (e: 'close'): void;
}>();

const title = ref<string>(props.title);
const detailPassword = ref<string>(props.detailPassword);
const isHidden = ref<boolean>(false);
const isPasswordVisible = ref<boolean>(false);
const isPasswordGenerated = ref<boolean>(!!detailPassword.value);
const showShakeAnimation = ref<boolean>(false);

watch([title, detailPassword], () => {
  isPasswordVisible.value = false;
  isPasswordGenerated.value = !!detailPassword.value;
});

const togglePasswordVisibility = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const generatePassword = (password: string): void => {
  detailPassword.value = password;
  isPasswordGenerated.value = true;
};



const closePopup = (): void => {
  isHidden.value = true;
  setTimeout(() => {
    emits('close');
  }, 380);
};

const saveChanges = (): void => {
  if (!title.value || !detailPassword.value) {
    // Если хотя бы одно поле не заполнено, сбросим и снова включим анимацию shake
    showShakeAnimation.value = false;
    setTimeout(() => {
      showShakeAnimation.value = true;
    }, 0); // Небольшая задержка для сброса анимации
  } else {
    // Если все поля заполнены, выполнить логику сохранения
    isHidden.value = true;
    showShakeAnimation.value = false;
    setTimeout(() => {
      emits('update', title.value, detailPassword.value);
    }, 380);
    closePopup();
  }
};


// const resetShakeAnimation = () => {
//   showShakeAnimation.value = false;
// };

// Удаление класса shake после завершения анимации
// const onAnimationEnd = () => {
//   resetShakeAnimation();
// };

var scrollWidth: number = 0;

onMounted(() => {
  scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollWidth}px`;
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      isHidden.value = true;
      setTimeout(() => {
        emits('close');
      }, 380);
    }
  });
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = `0px`;
});
</script>

<template>
  <section class="Popup__overlay" @click.self="closePopup()">
    <div class="Popup__BtnCloseArea">
      <button class="Popup__BtnClose" @click="closePopup()">
        <img class="Popup__BtnCloseImg" src="/src/assets/img/cross.png" alt="">
      </button>
    </div>
    <!-- @animationend="onAnimationEnd" -->
    <div class="Popup__contentArea" :class="{ Popup__error: showShakeAnimation }">
      <div class="Popup__content" :class="{ Popup__itemHidden: isHidden }">
        <h2 class="">Детали</h2>
        <label for="title">Сервис:</label>
        <input type="text" v-model="title" placeholder="Title" />

        <label for="password">Пароль:</label>
        <div class="Popup__passwordField">
          <input :type="isPasswordVisible ? 'text' : 'password'" v-model="detailPassword" placeholder="Password"
            class="Popup__passwordInput" maxlength="12" />

          <PasswordGenerator v-if="!isPasswordGenerated" @generate="generatePassword" />

          <button v-if="isPasswordGenerated" @click="togglePasswordVisibility" class="Popup__toggleBtn">
            {{ isPasswordVisible ? 'Скрыть' : 'Показать' }}
          </button>
        </div>
        <div class="Popup__areaBtn">
          <button class="Popup__saveBtn" @click="saveChanges">Сохранить</button>
          <button class="Popup__closeBtn" @click="closePopup()">Закрыть</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.Popup__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.Popup__BtnCloseArea {
  position: absolute;
  top: 17px;
  right: 16px;
  cursor: pointer;
}

.Popup__BtnClose {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #c7c7c7;
  opacity: 0.75;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgb(165, 165, 165);
  }
}

.Popup__BtnCloseImg {
  width: 40px;
}

.Popup__contentArea {
  color: gray;
}

.Popup__content {
  font-family: 'Google Sans Regular';
  font-weight: 400;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: slidein 0.4s;
}

.Popup__error {
  animation: shake 0.8s cubic-bezier(.36, .07, .19, .97) both;
}


.Popup__itemHidden {
  animation: slideout 0.4s;
}

.Popup__content h2 {
  margin: 0 0 15px;
  font-family: 'Google Sans Regular';
  font-weight: 400;
  color: black;
}

.Popup__content label {
  font-size: 12px;
}

.Popup__content input {
  font-family: 'Google Sans Regular';
  font-weight: 400;
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
}

.Popup__passwordField {
  position: relative;
  display: flex;
  align-items: center;
}

.Popup__passwordInput {
  position: relative;
  flex: 1;
}

.Popup__toggleBtn {
  position: absolute;
  right: 0;
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

.Popup__saveBtn {
  font-family: 'Google Sans Regular';
  font-weight: 400;
  font-size: 14px;
  padding: 10px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #4835c4;
  color: aliceblue;
  transition: 0.3s ease-in-out;

  &:hover {
    transition: 0.3s ease-in-out;
    background-color: #685cb8;
  }
}

.Popup__closeBtn {
  font-family: 'Google Sans Regular';
  font-weight: 400;
  font-size: 14px;
  padding: 10px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #6c757d;
  color: aliceblue;
  transition: 0.3s ease-in-out;

  &:hover {
    transition: 0.3s ease-in-out;
    background-color: #959ea6;
  }
}

</style>
