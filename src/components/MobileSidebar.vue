<template>
  <!-- Mobile Sidebar Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <div
    :class="[
      'fixed top-0 left-0 h-full w-80 bg-gray-900/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 z-50 border-r border-gray-700/50',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-lg blur-md opacity-30"></div>
          <svg class="w-8 h-8 text-tiktok-pink relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
          </svg>
        </div>
        <span class="text-xl font-bold tiktok-gradient-text">TikTok DL</span>
      </div>
      <button
        @click="$emit('close')"
        class="p-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300 text-gray-400 hover:text-white"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="p-6 space-y-4">
      <!-- Main Navigation -->
      <div class="mb-8">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
          {{ $t('nav.main') }}
        </h3>
        <router-link
          v-for="item in mainNavItems"
          :key="item.path"
          :to="item.path"
          @click="$emit('close')"
          :class="[
            'flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300',
            $route.path === item.path
              ? 'bg-gradient-to-r from-tiktok-pink to-tiktok-blue text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
          ]"
        >
          <i :class="item.icon" class="w-5 text-center"></i>
          <span class="font-bold">{{ $t(item.label) }}</span>
          <span v-if="item.badge" class="ml-auto bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            {{ item.badge }}
          </span>
        </router-link>
      </div>

      <!-- Discover Section -->
      <div class="mb-8">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
          {{ $t('nav.discover') }}
        </h3>
        <router-link
          v-for="item in discoverNavItems"
          :key="item.path"
          :to="item.path"
          @click="$emit('close')"
          :class="[
            'flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300',
            $route.path === item.path
              ? 'bg-gradient-to-r from-tiktok-pink to-tiktok-blue text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
          ]"
        >
          <i :class="item.icon" class="w-5 text-center"></i>
          <span class="font-bold">{{ $t(item.label) }}</span>
          <span v-if="item.isNew" class="ml-auto bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            {{ $t('nav.new') }}
          </span>
        </router-link>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
          {{ $t('nav.quickActions') }}
        </h3>
        <div class="space-y-3">
          <button
            v-for="action in quickActions"
            :key="action.id"
            @click="handleQuickAction(action.id)"
            class="flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800/50 w-full text-left"
          >
            <i :class="action.icon" class="w-5 text-center"></i>
            <span class="font-bold">{{ $t(action.label) }}</span>
          </button>
        </div>
      </div>

      <!-- Settings & Support -->
      <div class="pt-6 border-t border-gray-700/50">
        <router-link
          v-for="item in settingsNavItems"
          :key="item.path"
          :to="item.path"
          @click="$emit('close')"
          :class="[
            'flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300',
            $route.path === item.path
              ? 'bg-gradient-to-r from-tiktok-pink to-tiktok-blue text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
          ]"
        >
          <i :class="item.icon" class="w-5 text-center"></i>
          <span class="font-bold">{{ $t(item.label) }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50 bg-gray-900/80">
      <div class="text-center">
        <p class="text-xs text-gray-400 mb-3">{{ $t('app.version') }} 1.0.0</p>
        <div class="flex justify-center gap-6">
          <a href="#" class="text-gray-400 hover:text-tiktok-pink transition-all duration-300 hover:scale-110">
            <i class="fab fa-twitter text-lg"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-tiktok-pink transition-all duration-300 hover:scale-110">
            <i class="fab fa-instagram text-lg"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-tiktok-pink transition-all duration-300 hover:scale-110">
            <i class="fab fa-github text-lg"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const mainNavItems = [
  {
    path: '/',
    icon: 'fas fa-home',
    label: 'nav.home'
  },
  {
    path: '/trends',
    icon: 'fas fa-fire',
    label: 'nav.trends',
    badge: 'Hot'
  }
]

const discoverNavItems = [
  {
    path: '/discover',
    icon: 'fas fa-compass',
    label: 'nav.discover'
  },
  {
    path: '/challenges',
    icon: 'fas fa-trophy',
    label: 'nav.challenges',
    isNew: true
  },
  {
    path: '/live',
    icon: 'fas fa-broadcast-tower',
    label: 'nav.live'
  }
]

const quickActions = [
  {
    id: 'paste-url',
    icon: 'fas fa-clipboard',
    label: 'nav.quickActions.pasteUrl'
  },
  {
    id: 'clear-history',
    icon: 'fas fa-trash-alt',
    label: 'nav.quickActions.clearHistory'
  },
  {
    id: 'share-app',
    icon: 'fas fa-share-alt',
    label: 'nav.quickActions.shareApp'
  }
]

const settingsNavItems = [
  {
    path: '/settings',
    icon: 'fas fa-cog',
    label: 'nav.settings'
  },
  {
    path: '/help',
    icon: 'fas fa-question-circle',
    label: 'nav.help'
  },
  {
    path: '/about',
    icon: 'fas fa-info-circle',
    label: 'nav.about'
  }
]

const handleQuickAction = (actionId: string) => {
  switch (actionId) {
    case 'paste-url':
      navigator.clipboard.readText().then(text => {
        if (text) {
          // Navigate to home and set URL
          router.push('/')
          // You could emit an event here to set the URL in the home component
        }
      }).catch(() => {
        // Handle clipboard access error
        console.log('Clipboard access denied')
      })
      break
    case 'clear-history':
      localStorage.clear()
      break
    case 'share-app':
      if (navigator.share) {
        navigator.share({
          title: 'TikTok Downloader',
          text: 'Download TikTok videos without watermarks!',
          url: window.location.origin
        })
      }
      break
  }
}
</script>