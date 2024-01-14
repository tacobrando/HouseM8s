<template>
  <div id="install-prompt" class="w-full flex">
    <span class="mr-2">
      <img class="w-20 h-20" :src="Icon" alt="HouseM8s">
    </span>
    <span class="flex flex-col justify-center">
      <p>Do you want to install this app?</p>
      <button class="bg-green-500 p-2 rounded-md w-fit" @click="install">
        Install
      </button>
    </span>
  </div>
</template>

<script setup>
import Icon from '@/assets/icons/HouseM8s-icon.png'
import { usePwa } from '@/composables/pwa'

const pwa = usePwa()

function install() {
  pwa.installApp()
}

</script>