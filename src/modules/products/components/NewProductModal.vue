<script lang="ts" setup>
import { defineEmits, ref, reactive } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useToast } from 'vue-toastification';

const toast = useToast();
const nameInputRef = ref<HTMLInputElement | null>(null);
const priceInputRef = ref<HTMLInputElement | null>(null);
const categoryInputRef = ref<HTMLInputElement | null>(null);
const descriptionInputRef = ref<HTMLInputElement | null>(null);

const myForm = reactive({
  name: '',
  price: 0,
  category: '',
  description: '',
});

interface Props {
  isOpen: boolean;
}
defineProps<Props>();

const emit = defineEmits(['modal-close']);

const target = ref(null);
onClickOutside(target, () => emit('modal-close'));
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header"> Nuevo producto </slot>
        </div>
        <div class="modal-body">
          
            <div class="mb-4">
              <label for="name" class="block text-gray-600">Nombre</label>
              <input
                v-model="myForm.name"
                ref="nameInputRef"
                type="text"
                id="name"
                name="name"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
    
            <div class="mb-4">
              <label for="price" class="block text-gray-600">Percio</label>
              <input
                v-model="myForm.price"
                ref="priceInputRef"
                type="number"
                id="price"
                name="price"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
            <div class="mb-4">
              <label for="category" class="block text-gray-600">Categoria</label>
              <input
                v-model="myForm.category"
                ref="categoryInputRef"
                type="text"
                id="category"
                name="category"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
            <div class="mb-4">
              <label for="description" class="block text-gray-600">Descripcion</label>
              <input
                v-model="myForm.description"
                ref="descriptionInputRef"
                type="text"
                id="description"
                name="description"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Submit</button>
            </div>
          </slot>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
