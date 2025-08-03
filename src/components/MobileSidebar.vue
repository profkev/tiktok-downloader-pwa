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
          <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-xl blur-md opacity-30"></div>
          <div class="w-10 h-10 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-xl relative z-10 flex items-center justify-center">
            <!-- Download arrow with progress -->
            <div class="relative">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4h3V8h2v4h3l-4 4z"/>
              </svg>
              <!-- Download progress indicator -->
              <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full flex items-center justify-center">
                <div class="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <!-- "NEW" badge -->
          <div class="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold px-1 py-0.5 rounded-full">
            NEW
          </div>
          <!-- "HD" badge -->
          <div class="absolute -bottom-1 -left-1 bg-green-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
            HD
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-bold tiktok-gradient-text">TT HD Video Saver</span>
          <span class="text-xs text-gray-300">No Watermark</span>
        </div>
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

const router = useRouter()

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
    path: '/about',
    icon: 'fas fa-info-circle',
    label: 'nav.about'
  },
  {
    path: '/privacy',
    icon: 'fas fa-shield-alt',
    label: 'nav.privacy'
  },
  {
    path: '/faq',
    icon: 'fas fa-question-circle',
    label: 'nav.faq'
  },
  {
    path: '/help',
    icon: 'fas fa-question-circle',
    label: 'nav.help'
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