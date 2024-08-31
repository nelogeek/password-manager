<script setup lang="ts">
import ServicesList from '@/components/ServicesList.vue';
import ServicesHeader from '@/components/ServicesHeader.vue';

</script>


<template>
  <div class="PasswordManager__section">
    <ServicesHeader />
    <ServicesList />
  </div>
</template>


<style lang="scss">

.PasswordManager__section {
  padding: 0 30px;
}


@media screen and (max-width: 580px) 
{
  .PasswordManager__section {
  padding: 0 15px;
}
}

</style>
