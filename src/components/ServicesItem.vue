<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Popup from './Popup.vue';
import { deletePassword } from '@/services/passwordService';

interface DetailItem {
  detailPassword: string;
}

interface Item {
  title: string;
  detailItem: DetailItem[];
}

const props = defineProps<{ item: Item }>();

const emits = defineEmits(['delete']);


const showPopup = ref<boolean>(false);

const openPopup = (): void => {
  showPopup.value = true;
};

const updateDetails = (title: string, password: string) => {
  props.item.title = title;
  props.item.detailItem[0].detailPassword = password;
  showPopup.value = false;
};

const closePopup = (): void => {
  showPopup.value = false;
};

const handleDelete = (event: Event) => {
  event.stopPropagation(); 
  emits('delete');
};

</script>

<template>
  <div class="ServicesItem__area" @click="openPopup">

    <div class="ServicesItem__areaItems">
      <div class="ServicesItem__title">
        {{ item.title }}
      </div>
      <div class="ServicesItem__trash" @click="handleDelete">
        <img src="/src/assets/img/trash.png" alt="">
      </div>
    </div>

    <Popup
      v-if="showPopup"
      :title="item.title"
      :detailPassword="item.detailItem[0].detailPassword"
      @update="updateDetails"
      @close="closePopup"
    />
  </div>
</template>





<style lang="scss">
.ServicesItem__area {
  font-family: 'Google Sans Regular';
  font-weight: 400;
  color: gray;
  padding: 25px 0 25px;
  position: relative;

  transition: 0.3s ease-in-out;

  &:hover {
    transition: 0.3s ease-in-out;
    background-color: #ededed;
  }

  &:after {
    position: absolute;
    content: '';
    box-shadow: 0 1px gray;
    height: 1px;
    width: 100%;
    bottom: 0;
  }
}

.ServicesItem__areaItems {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  img {
    width: 15px;
    margin-right: 15px;
  }
}


.ServicesItem__title {
  padding-left: 15px;
  cursor: pointer;
  font-size: 16px;
}

.ServicesItem__trash {
  cursor: pointer;
  align-items: center;
  display: flex;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


@media screen and (max-width: 580px) {
   
  .ServicesItem__area {
    padding: 20px 0 20px
  }

  .ServicesItem__title {
    font-size: 14px;
  }
}
</style>