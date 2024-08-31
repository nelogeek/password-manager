<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ServicesItem from '@/components/ServicesItem.vue';
import Popup from './Popup.vue';
import { addPassword } from '@/services/passwordService';
import { deletePassword } from '@/services/passwordService';
import { type PasswordEntry } from '@/services/passwordService';

interface DetailItem {
  detailPassword: string;
}

interface ServiceItem {
  title: string;
  detailItem: DetailItem[];
  isNew?: boolean;
}

const arrItems = ref<ServiceItem[]>([
  {
    title: 'Instagram.com',
    detailItem: [
      {
        detailPassword: 'tMG9pPFW6FGB'
      }
    ],
  },
  {
    title: 'VK.com',
    detailItem: [
      {
        detailPassword: 'a1D6nmdHaHna'
      }
    ],
  },
  {
    title: 'Mail.ru',
    detailItem: [
      {
        detailPassword: '4EAMzq9F5mD6'
      }
    ],
  },
  {
    title: 'GitHub.com',
    detailItem: [
      {
        detailPassword: 'tMG9pPFW6FGB'
      }
    ],
  }
]);

const showPopup = ref<boolean>(false);
const newTitle = ref<string>('');
const newDetailPassword = ref<string>('');
const searchQuery = ref<string>('');

const openPopup = (): void => {
  newTitle.value = '';
  newDetailPassword.value = '';
  showPopup.value = true;
};

const saveNewItem = async (title: string, detailPassword: string) => {
  const newPasswordEntry: PasswordEntry = {
    title,
    password: detailPassword,
  };

  const { success, message } = await addPassword(newPasswordEntry);

  if (success) {
    const newItem = {
      title,
      detailItem: [{ detailPassword }],
      isNew: true,
    };

    arrItems.value.unshift(newItem);
    localStorage.setItem('services', JSON.stringify(arrItems.value));
    showPopup.value = false;
    alert(message);
  } else {
    alert(message); 
  }
};

const deleteItem = async (index: number) => {
  const itemToDelete = arrItems.value[index];
  
  const { success, message } = await deletePassword(itemToDelete.title);

  if (success) {
    arrItems.value.splice(index, 1); // удаляем элемент из списка
    localStorage.setItem('services', JSON.stringify(arrItems.value));
    alert(message);
  } else {
    alert(message);
  }
};


const filteredItems = computed(() => {
  return arrItems.value.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const savedItems = localStorage.getItem('services');
if (savedItems) {
  arrItems.value = JSON.parse(savedItems);
}


</script>

<template>
  <section class="ServicesList__section">
    <div class="ServicesList__logicItems">
      <h2 class="ServicesList__itemH2">{{ filteredItems.length }} сайтов и приложений</h2>
      <div class="ServicesList__searchArea">
        <img src="/src/assets/img/magnifier.png" alt="">
        <input type="text" class="ServicesList__search" placeholder="Поиск паролей" v-model="searchQuery">
      </div>
    </div>
    <button class="ServicesList__btn" @click="openPopup">Добавить</button>

    <div v-if="filteredItems.length === 0" class="ServicesList__emptyText">
      Пусто
    </div>

    <TransitionGroup name="list" tag="div" class="ServicesList__itemRendering">
      <ServicesItem v-for="(item, index) in filteredItems" :key="item.title" :item="item" @delete="deleteItem(index)" />
    </TransitionGroup>

    <Popup v-if="showPopup" :title="newTitle" :detailPassword="newDetailPassword" @update="saveNewItem"
      @close="showPopup = false" />
  </section>
</template>



<style lang="scss">
.ServicesList__section {
  border: 1px solid rgb(182, 182, 182);
  border-radius: 10px;
  width: 100%;
  height: max-content;
  padding: 30px;
}

.ServicesList__logicItems {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: 'Google Sans Regular';
  font-weight: 500;
}

.ServicesList__itemH2 {
  font-family: 'Google Sans Regular';
  font-weight: 500;
  font-size: 20px;
}

.ServicesList__searchArea {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
  }
}


.ServicesList__search {
  font-family: 'Google Sans Regular';
  font-weight: 500;
  font-size: 16px;
  padding: 5px 10px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  transition: 0.3s ease-in-out;

  &:focus {
    transition: 0.3s ease-in-out;
    border-bottom: 1px solid #4835c4;
  }
}

.ServicesList__btn {
  font-family: 'Google Sans Regular';
  font-weight: 500;
  font-size: 14px;
  color: aliceblue;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #4835c4;
  transition: 0.3s ease-in-out;
  outline: none;

  &:hover {
    transition: 0.3s ease-in-out;
    background-color: #685cb8;
  }
}

.ServicesList__emptyText {
  text-align: center;
  font-family: 'Google Sans Regular';
  font-weight: 500;
  font-size: 20px;
  color: gray;
  margin-top: 20px;
}


.ServicesList__itemRendering {
  margin-top: 20px;
}


@media screen and (max-width: 580px) {

  .ServicesList__section {
    padding: 20px;
  }

  .ServicesList__itemH2 {
    font-size: 16px;
  }

  .ServicesList__search {
    font-size: 12px;
  }

  .ServicesList__searchArea img {
    width: 15px;
  }

  .ServicesList__logicItems {
    margin-bottom: 15px;
  }

  .ServicesList__itemRendering {
    margin-top: 15px;
  }
}

@media screen and (max-width: 425px) {

  .ServicesList__logicItems {
    display: flex;
    justify-content: center;
    gap: 15px;
    justify-items: center;
    flex-direction: column;
  }
}
</style>