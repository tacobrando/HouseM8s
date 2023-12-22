<template>
  <teleport to="body">
    <transition :name="animationClass">
      <div v-if="visible" class="fixed inset-0 z-[60] flex items-center justify-center p-4 text-black" @click.self="handleOutsideClick">
        <div class="modal-dialog relative dark:bg-default dark:text-white bg-white shadow-lg rounded-md overflow-hidden"
            :class="fullscreen ? 'w-full h-full' : 'w-[90%]  sm:w-5/6 md:w-2/3 lg:w-1/3'"
            role="dialog"
            aria-modal="true">
          <slot />
          <button
            v-if="!hideBtn"
            @click="initiateCloseModal" 
            class="
              absolute 
              flex 
              items-center 
              justify-center 
              top-2 right-2
              hover:bg-gray-300 
              rounded-full 
              text-2xl
              transition-colors
            "
          >
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-6 m-1" />
          </button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="visible" class="fixed inset-0 dark:bg-opacity-30 bg-opacity-30 bg-black dark:bg-white z-50" />
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  fullscreen: Boolean,
  animation: String,
  btnPosition: String,
  hideBtn: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'update:isOpen']);

const visible = ref(props.isOpen);
const animationClass = ref(props.animation || 'modal');
const customStyle = ref('');

watch(() => props.isOpen, (newVal) => {
  visible.value = newVal;
  if (newVal) {
    customStyle.value = props.fullscreen ? 'width: 100vw; height: 100vh;' : '';
  }
}, { immediate: true });

const handleOutsideClick = () => {
  if (props.isOpen && !props.disableOutsideClick) {
    emit('update:isOpen', false);
  }
};

const initiateCloseModal = () => {
  emit('update:isOpen', false);
};

onMounted(() => {
  nextTick(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  });
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
