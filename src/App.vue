<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-tiktok-pink">
    <header class="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-white flex items-center gap-2">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
            </svg>
            {{ $t('app.title') }}
          </h1>
          
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-black/20 backdrop-blur-sm border-t border-white/10 py-4">
      <div class="container mx-auto px-4 text-center text-white/70 text-sm">
        {{ $t('app.footer') }}
      </div>
    </footer>

    <!-- Install Prompt -->
    <InstallPrompt />
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import InstallPrompt from '@/components/InstallPrompt.vue'
</script>