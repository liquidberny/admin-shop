<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>
  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <button
      rel="noopener noreferrer"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
      @click="openModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>Nuevo producto</span>
    </button>
    
  </div>
  <NewProductModal :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
  </NewProductModal>
  <div v-if="!products" class="text-center h-[500px]">
    <h1 class="text-xl">Cargando productos</h1>
    <p>Espere por favor</p>
  </div>
  <product-list v-else :products="products" />
  <button-pagination
    :has-more-data="!!products && products.length < 10"
    :is-first-page="page === 1"
    :page="page"
  />
</template>

<script lang="ts" setup>
import { getProductsAction } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ProductList from '../../products/components/ProductList.vue';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import NewProductModal from '@/modules/products/components/NewProductModal.vue';

import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const queryClient = useQueryClient();

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};


const submitHandler = ()=>{
  //here you do whatever
}
const { data: products = [] } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
});

watch(
  () => route.query.page,
  newPage => {
    page.value = Number(newPage || 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
);

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>