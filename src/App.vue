<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Mobile Sidebar -->
    <MobileSidebar 
      :is-open="sidebarOpen" 
      @close="sidebarOpen = false"
    />

    <!-- Main Layout -->
    <div class="flex min-h-screen">
      <!-- Desktop Sidebar -->
      <aside class="hidden lg:block w-64 bg-gray-900/80 backdrop-blur-md border-r border-gray-700/50 fixed h-full z-30">
        <div class="p-6">
          <!-- Logo -->
          <div class="flex items-center gap-3 mb-10">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-lg blur-md opacity-30"></div>
              <svg class="w-8 h-8 text-tiktok-pink relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
              </svg>
            </div>
            <span class="text-xl font-bold tiktok-gradient-text">TikTok DL</span>
          </div>

          <!-- Navigation -->
          <nav class="space-y-3">
            <router-link
              v-for="item in desktopNavItems"
              :key="item.path"
              :to="item.path"
              :class="[
                'flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all duration-300',
                $route.path === item.path
                  ? 'bg-gradient-to-r from-tiktok-pink to-tiktok-blue text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="getIconSvg(item.icon)">
              </svg>
              {{ $t(item.label) }}
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 lg:ml-64">
        <!-- Header -->
        <header class="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-20">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <!-- Mobile Menu Button -->
              <button
                @click="sidebarOpen = true"
                class="lg:hidden p-3 rounded-xl bg-gradient-to-r from-tiktok-pink to-tiktok-blue hover:from-pink-600 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              <!-- Mobile Logo -->
              <div class="flex items-center gap-3 lg:hidden">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-lg blur-md opacity-30"></div>
                  <svg class="w-8 h-8 text-tiktok-pink relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
                  </svg>
                </div>
                <span class="text-xl font-bold tiktok-gradient-text">TikTok DL</span>
              </div>

              <!-- Desktop Page Title -->
              <h1 class="hidden lg:block text-2xl font-bold text-white">
                {{ getPageTitle() }}
              </h1>

              <div class="flex items-center gap-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="pb-20 lg:pb-8">
          <router-view />
        </main>

        <!-- Footer (Desktop Only) -->
        <footer class="hidden lg:block bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 py-6">
          <div class="container mx-auto px-6 text-center text-gray-400 text-sm">
            {{ $t('app.footer') }}
          </div>
        </footer>
      </div>
    </div>

    <!-- Bottom Navigation (Mobile Only) -->
    <BottomNavigation />

    <!-- Install Prompt -->
    <InstallPrompt />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import InstallPrompt from '@/components/InstallPrompt.vue'
import MobileSidebar from '@/components/MobileSidebar.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'

const route = useRoute()
const { t } = useI18n()
const sidebarOpen = ref(false)

const desktopNavItems = [
  { path: '/', label: 'nav.home', icon: 'home' },
  { path: '/trends', label: 'nav.trends', icon: 'fire' },
  { path: '/discover', label: 'nav.discover', icon: 'compass' },
  { path: '/challenges', label: 'nav.challenges', icon: 'trophy' },
  { path: '/live', label: 'nav.live', icon: 'broadcast' }
]

const getIconSvg = (iconName: string) => {
  const icons = {
    home: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
    fire: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.66 2C10.92 1.83 9.2 2.35 7.8 3.42A8.28 8.28 0 004.31 8a7.9 7.9 0 00-.31 2.24c.06 4.46 3.74 8.13 8.2 8.17 4.46-.04 8.14-3.71 8.2-8.17 0-.76-.1-1.52-.31-2.24A8.28 8.28 0 0016.2 3.42 8.46 8.46 0 0012.66 2zm0 14.34c-3.5 0-6.34-2.84-6.34-6.34 0-1.39.45-2.76 1.29-3.91.84-1.15 2.01-2.04 3.35-2.54.18-.07.37.04.44.22.07.18-.04.37-.22.44a5.66 5.66 0 00-2.72 2.06c-.68.93-1.04 2.04-1.04 3.18 0 2.84 2.31 5.15 5.15 5.15s5.15-2.31 5.15-5.15c0-1.14-.36-2.25-1.04-3.18a5.66 5.66 0 00-2.72-2.06c-.18-.07-.29-.26-.22-.44.07-.18.26-.29.44-.22 1.34.5 2.51 1.39 3.35 2.54.84 1.15 1.29 2.52 1.29 3.91 0 3.5-2.84 6.34-6.34 6.34z"></path>',
    compass: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"></path>',
    trophy: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>',
    broadcast: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-3.536-3.536a3 3 0 010-4.243m-7 7L12 21l7-7-7-7-7 7z"></path>'
  }
  return icons[iconName as keyof typeof icons] || icons.home
}

const getPageTitle = () => {
  const titles: Record<string, string> = {
    '/': t('nav.home'),
    '/trends': t('nav.trends'),
    '/discover': t('nav.discover'),
    '/challenges': t('nav.challenges'),
    '/live': t('nav.live')
  }
  return titles[route.path] || t('app.title')
}
</script>