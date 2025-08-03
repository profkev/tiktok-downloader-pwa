<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 lg:hidden z-30">
    <div class="flex items-center justify-around py-3">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex flex-col items-center justify-center py-2 px-4 transition-all duration-300 rounded-xl',
          $route.path === item.path
            ? 'text-white bg-gradient-to-r from-tiktok-pink to-tiktok-blue shadow-lg'
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
        ]"
      >
        <div class="relative">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="getIconSvg(item.icon)">
          </svg>
          <span
            v-if="item.badge"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
          >
            {{ item.badge }}
          </span>
          <div
            v-if="item.isLive"
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"
          ></div>
        </div>
        <span class="text-xs font-bold">{{ $t(item.label) }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  {
    path: '/',
    icon: 'home',
    label: 'nav.home'
  },
  {
    path: '/trends',
    icon: 'fire',
    label: 'nav.trends',
    badge: '9+'
  },
  {
    path: '/discover',
    icon: 'compass',
    label: 'nav.discover'
  },
  {
    path: '/challenges',
    icon: 'trophy',
    label: 'nav.challenges'
  },
  {
    path: '/live',
    icon: 'broadcast',
    label: 'nav.live',
    isLive: true
  }
]

const getIconSvg = (iconName: string) => {
  const icons = {
    home: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
    fire: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 1.657 0 3 .895 3 2 0 1-1 2-1 2s4 1 4 4c0 2.657-2.686 5.657-6.343 5.657z"></path>',
    compass: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"></path>',
    trophy: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
    broadcast: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.899a9 9 0 010 12.728m-5.656-5.657a3 3 0 010 4.243"></path>'
  }
  return icons[iconName as keyof typeof icons] || icons.home
}
</script>