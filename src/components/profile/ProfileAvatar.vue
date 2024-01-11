<template>
  <div id="avatar-container">
    <div @click.stop="profileMenu.toggle">
      <img
        id="avatar-img"
        alt="avatar"
        class="rounded-full transition-all border h-full w-full object-cover"
        :class="[ props.tooltip ? 'hover:brightness-90 cursor-pointer' : '']"
        :src="avatar" 
        v-bind="$attrs" 
      />
    </div>
    <ProfileTooltip @update:toggle="profileMenu.update" :isOpen="profileMenu.value" />
  </div>
</template>

<script setup>
import ProfileTooltip from './ProfileTooltip.vue';
import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
  img: {
    type: String,
  },
  showMenu: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: Boolean,
    default: false
  }
})

const avatar = computed(() => new URL(`../../assets/img/profile/${props.img}.png`, import.meta.url).href)
const avatarUrl = ref([])

const profileMenu = reactive({
  value: false,
  toggle() {
    if(props.tooltip) {
      profileMenu.value = !profileMenu.value
    }
  },
  update(value) {
    profileMenu.value = value
  } 
})


const avatarUpload = reactive({
  value: false,
  toggle() {
    avatarUpload.value = !avatarUpload.value
  },
  update(value) {
    avatarUpload.value = value
  }
})

const $attrs = ref({});
</script>
