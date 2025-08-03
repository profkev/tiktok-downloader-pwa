<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 right-4 z-50 max-w-sm">
    <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 p-6 relative">
      <!-- Close button -->
      <button
        @click="dismissPrompt"
        class="absolute top-3 right-3 text-gray-400 hover:text-white transition-all duration-300"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex items-start gap-4">
        <!-- App Icon -->
        <div class="w-14 h-14 bg-gradient-to-br from-tiktok-pink to-tiktok-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
          </svg>
        </div>

        <div class="flex-1">
          <h3 class="font-bold text-white mb-2 text-lg">{{ $t('install.title') }}</h3>
          <p class="text-sm text-gray-300 mb-4 leading-relaxed">{{ $t('install.description') }}</p>
          
          <div class="flex gap-3">
            <button
              @click="installApp"
              class="tiktok-button text-sm px-4 py-2"
              :disabled="installing"
            >
              <span v-if="installing" class="loading-spinner mr-2"></span>
              {{ installing ? $t('install.installing') : $t('install.install') }}
            </button>
            <button
              @click="dismissPrompt"
              class="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
            >
              {{ $t('install.later') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Install Banner for mobile -->
  <div v-if="showMobileBanner" class="bg-gradient-to-r from-tiktok-pink to-tiktok-blue text-white p-4 text-center relative shadow-lg">
    <button
      @click="dismissMobileBanner"
      class="absolute top-3 right-3 text-white/80 hover:text-white transition-all duration-300"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <p class="text-sm font-bold">{{ $t('install.mobileBanner') }}</p>
    <button
      @click="showInstallInstructions"
      class="text-xs underline mt-2 hover:text-gray-200 transition-colors duration-300"
    >
      {{ $t('install.howTo') }}
    </button>
  </div>

  <!-- Install Instructions Modal -->
  <div v-if="showInstructions" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 border border-gray-700/50 shadow-2xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-white">{{ $t('install.instructions.title') }}</h3>
        <button @click="showInstructions = false" class="text-gray-400 hover:text-white transition-all duration-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-6 text-sm">
        <div v-if="isIOS">
          <h4 class="font-bold text-white mb-3">{{ $t('install.instructions.ios.title') }}</h4>
          <ol class="list-decimal list-inside space-y-2 text-gray-300">
            <li>{{ $t('install.instructions.ios.step1') }}</li>
            <li>{{ $t('install.instructions.ios.step2') }}</li>
            <li>{{ $t('install.instructions.ios.step3') }}</li>
          </ol>
        </div>
        
        <div v-else>
          <h4 class="font-bold text-white mb-3">{{ $t('install.instructions.android.title') }}</h4>
          <ol class="list-decimal list-inside space-y-2 text-gray-300">
            <li>{{ $t('install.instructions.android.step1') }}</li>
            <li>{{ $t('install.instructions.android.step2') }}</li>
            <li>{{ $t('install.instructions.android.step3') }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { BeforeInstallPromptEvent } from '@/types'

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const showInstallPrompt = ref(false)
const showMobileBanner = ref(false)
const showInstructions = ref(false)
const installing = ref(false)

const isIOS = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
})

const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

// Removed unused canInstall computed property

const installApp = async () => {
  if (!deferredPrompt.value) return

  installing.value = true
  
  try {
    // Show the install prompt
    deferredPrompt.value.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.value.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
      showInstallPrompt.value = false
      localStorage.setItem('pwa-dismissed', 'installed')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    // Clear the deferredPrompt so it can only be used once
    deferredPrompt.value = null
  } catch (error) {
    console.error('Error during installation:', error)
  } finally {
    installing.value = false
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  localStorage.setItem('pwa-dismissed', Date.now().toString())
}

const dismissMobileBanner = () => {
  showMobileBanner.value = false
  localStorage.setItem('mobile-banner-dismissed', Date.now().toString())
}

const showInstallInstructions = () => {
  showInstructions.value = true
  showMobileBanner.value = false
}

const checkInstallPrompt = () => {
  const dismissed = localStorage.getItem('pwa-dismissed')
  const bannerDismissed = localStorage.getItem('mobile-banner-dismissed')
  
  // Don't show if already installed or recently dismissed
  if (dismissed === 'installed') return
  if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return // 7 days
  
  // Check if running in standalone mode (already installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    localStorage.setItem('pwa-dismissed', 'installed')
    return
  }

  // Show install prompt for desktop/Android with deferredPrompt
  if (deferredPrompt.value) {
    showInstallPrompt.value = true
    return
  }

  // Show mobile banner for iOS or if no deferredPrompt
  if (isMobile.value && !bannerDismissed) {
    showMobileBanner.value = true
  }
}

onMounted(() => {
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Save the event so it can be triggered later
    deferredPrompt.value = e
    
    // Check if we should show the install prompt
    setTimeout(checkInstallPrompt, 2000) // Show after 2 seconds
  })

  // Listen for the appinstalled event
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed')
    showInstallPrompt.value = false
    showMobileBanner.value = false
    localStorage.setItem('pwa-dismissed', 'installed')
  })

  // Check on mount for mobile devices
  if (isMobile.value && !deferredPrompt.value) {
    setTimeout(checkInstallPrompt, 3000)
  }
})
</script>