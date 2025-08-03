<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="flex items-center justify-center gap-4 mb-6">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl blur-lg opacity-40 animate-tiktok-pulse"></div>
          <div class="w-16 h-16 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl relative z-10 flex items-center justify-center">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tiktok-gradient-text">{{ $t('about.title') }}</h1>
      </div>
      <p class="text-xl text-gray-300 leading-relaxed">
        {{ $t('about.subtitle') }}
      </p>
    </div>

    <!-- Mission Section -->
    <div class="tiktok-card mb-12">
      <h2 class="text-3xl font-bold text-white mb-6">{{ $t('about.mission.title') }}</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">
        {{ $t('about.mission.description') }}
      </p>
      <p class="text-gray-300 leading-relaxed">
        {{ $t('about.mission.commitment') }}
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div class="tiktok-feature-card">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">{{ $t('about.features.quality.title') }}</h3>
        </div>
        <p class="text-gray-300">{{ $t('about.features.quality.description') }}</p>
      </div>

      <div class="tiktok-feature-card">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-tiktok-blue to-tiktok-pink rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">{{ $t('about.features.speed.title') }}</h3>
        </div>
        <p class="text-gray-300">{{ $t('about.features.speed.description') }}</p>
      </div>

      <div class="tiktok-feature-card">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">{{ $t('about.features.security.title') }}</h3>
        </div>
        <p class="text-gray-300">{{ $t('about.features.security.description') }}</p>
      </div>

      <div class="tiktok-feature-card">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">{{ $t('about.features.free.title') }}</h3>
        </div>
        <p class="text-gray-300">{{ $t('about.features.free.description') }}</p>
      </div>
    </div>

    <!-- Technology Section -->
    <div class="tiktok-card mb-12">
      <h2 class="text-3xl font-bold text-white mb-6">{{ $t('about.technology.title') }}</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">
        {{ $t('about.technology.description') }}
      </p>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">{{ $t('about.technology.modern.title') }}</h4>
          <p class="text-gray-300 text-sm">{{ $t('about.technology.modern.description') }}</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">{{ $t('about.technology.optimized.title') }}</h4>
          <p class="text-gray-300 text-sm">{{ $t('about.technology.optimized.description') }}</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">{{ $t('about.technology.secure.title') }}</h4>
          <p class="text-gray-300 text-sm">{{ $t('about.technology.secure.description') }}</p>
        </div>
      </div>
    </div>

    <!-- Support Section -->
    <div class="tiktok-card mb-12">
      <h2 class="text-3xl font-bold text-white mb-6">{{ $t('about.support.title') }}</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">
        {{ $t('about.support.description') }}
      </p>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h4 class="text-lg font-bold text-white mb-3">{{ $t('about.support.formats.title') }}</h4>
          <ul class="text-gray-300 space-y-2">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-tiktok-pink mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ $t('about.support.formats.tiktok') }}
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-tiktok-pink mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ $t('about.support.formats.mp4') }}
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-tiktok-pink mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ $t('about.support.formats.mp3') }}
            </li>
          </ul>
        </div>
        <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h4 class="text-lg font-bold text-white mb-3">{{ $t('about.support.platforms.title') }}</h4>
          <ul class="text-gray-300 space-y-2">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-tiktok-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ $t('about.support.platforms.web') }}
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-tiktok-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ $t('about.support.platforms.mobile') }}
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-tiktok-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ $t('about.support.platforms.desktop') }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="tiktok-card text-center">
      <h2 class="text-3xl font-bold text-white mb-6">{{ $t('about.contact.title') }}</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-8">
        {{ $t('about.contact.description') }}
      </p>
      <div class="flex justify-center gap-6">
        <a href="mailto:support@example.com" class="tiktok-button inline-flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          {{ $t('about.contact.email') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for About page
</script>