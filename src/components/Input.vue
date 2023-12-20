<template>
  <form @submit.prevent="addItem" class="input-container">
  <div class="flex" v-bind="$attrs">
    <input 
      @submit="addItem"
      v-model="itemRef.item" 
      class="p-2 rounded-l-md rounded-r-none border-l-2 border-t-2 border-b-2 outline-none bg-white text-black w-full"
      :type="props.type" 
      :name="props.name" 
      :placeholder="props.placeholder"
      :maxlength="props.maxlength"
    >
    <input v-if="props.priceSelect" 
      v-model="itemRef.price"
      :class="{ 'border-red-400': props.priceSelect && !isPriceValid }"
      type="text"
      step="0.01" 
      placeholder="0.00"
      min="0" 
      max="9999" 
      name="price"
      maxlength="7"
      class="w-16 bg-white text-black border-2 pl-1"
    >
    <button 
      :disabled="!isFormValid"
      :class="{
        'bg-blue-500': isFormValid, 
        'bg-gray-300': !isFormValid
      }" 
      class="p-2 rounded-r-md transition-colors flex items-center"
      @click="addItem"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="h-5 w-5" />
    </button>
  </div>
  </form>
</template>
<script setup>
import { reactive, ref, computed } from 'vue';
import { useUserStore } from '@/composables/user';

const props = defineProps({
  placeholder: String,
  maxlength: {
    type: String,
    default: '50'
  },
  name: String,
  type: String,
  priceSelect: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits();
const userStore = useUserStore();

const itemRef = reactive({
  user: {
    userId: userStore.userInfo.id,
    name: userStore.userInfo.username
  },
  item: '',
  price: ''
});

const isPriceValid = computed(() => {
  if (!props.priceSelect || itemRef.price === '') return true;
  const regex = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
  return regex.test(itemRef.price);
});


const isFormValid = computed(() => {
  return itemRef.item.length > 0 && isPriceValid.value;
});

function resetRef() {
  itemRef.item = '';
  itemRef.price = ''
}

function addItem() {
  if (isFormValid.value) {
    emit('add', { ...itemRef, price: props.priceSelect ? Number(itemRef.price).toFixed(2) : undefined });
    resetRef();
  }
}
</script>
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}
</style>