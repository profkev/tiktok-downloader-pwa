<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white hover:bg-gray-700/50 hover:border-tiktok-pink/50 transition-all duration-300"
    >
      <span class="text-lg">{{ currentLocale.flag }}</span>
      <span class="hidden sm:block font-bold">{{ currentLocale.name }}</span>
      <svg 
        class="w-4 h-4 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-3 w-48 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 z-50 max-h-64 overflow-y-auto"
      >
        <div class="py-2">
          <button
            v-for="locale in SUPPORTED_LOCALES"
            :key="locale.code"
            @click="selectLanguage(locale.code)"
            class="w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-all duration-300 flex items-center gap-3 rounded-xl mx-2"
            :class="{ 'bg-gradient-to-r from-tiktok-pink to-tiktok-blue text-white shadow-lg': locale.code === currentLocale.code, 'text-gray-300 hover:text-white': locale.code !== currentLocale.code }"
          >
            <span class="text-lg">{{ locale.flag }}</span>
            <span class="font-bold">{{ locale.name }}</span>
            <svg
              v-if="locale.code === currentLocale.code"
              class="w-4 h-4 ml-auto text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- Backdrop to close dropdown when clicking outside -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, setLocale } from '@/i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => {
  return SUPPORTED_LOCALES.find(l => l.code === locale.value) || SUPPORTED_LOCALES[0]
})

const selectLanguage = (code: string) => {
  setLocale(code)
  isOpen.value = false
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>