<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="flex items-center justify-center gap-4 mb-6">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl blur-lg opacity-40 animate-tiktok-pulse"></div>
          <div class="w-16 h-16 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl relative z-10 flex items-center justify-center">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tiktok-gradient-text">{{ $t('privacy.title') }}</h1>
      </div>
      <p class="text-xl text-gray-300 leading-relaxed">
        {{ $t('privacy.subtitle') }}
      </p>
      <p class="text-sm text-gray-400 mt-4">
        {{ $t('privacy.lastUpdated') }}: {{ lastUpdated }}
      </p>
    </div>

    <!-- Privacy Sections -->
    <div class="space-y-8">
      <!-- Data Collection -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-tiktok-pink mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.dataCollection.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          {{ $t('privacy.dataCollection.description') }}
        </p>
        <ul class="text-gray-300 space-y-3">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-tiktok-pink mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm">{{ $t('privacy.dataCollection.items.urls') }}</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-tiktok-pink mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm">{{ $t('privacy.dataCollection.items.usage') }}</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-tiktok-pink mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm">{{ $t('privacy.dataCollection.items.device') }}</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-tiktok-pink mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm">{{ $t('privacy.dataCollection.items.preferences') }}</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-tiktok-pink mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm">{{ $t('privacy.dataCollection.items.errors') }}</span>
          </li>
        </ul>
      </div>

      <!-- Data Usage -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-tiktok-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.dataUsage.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          {{ $t('privacy.dataUsage.description') }}
        </p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.dataUsage.processing.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataUsage.processing.description') }}</p>
          </div>
          <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.dataUsage.improvement.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataUsage.improvement.description') }}</p>
          </div>
          <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.dataUsage.security.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataUsage.security.description') }}</p>
          </div>
          <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.dataUsage.legal.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataUsage.legal.description') }}</p>
          </div>
        </div>
      </div>

      <!-- Data Storage -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.dataStorage.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          {{ $t('privacy.dataStorage.description') }}
        </p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-green-400 font-semibold text-sm">{{ $t('privacy.dataStorage.security.title') }}</span>
            </div>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataStorage.security.description') }}</p>
          </div>
          <div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              <span class="text-blue-400 font-semibold text-sm">{{ $t('privacy.dataStorage.retention.title') }}</span>
            </div>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataStorage.retention.description') }}</p>
          </div>
          <div class="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
              </svg>
              <span class="text-purple-400 font-semibold text-sm">{{ $t('privacy.dataStorage.location.title') }}</span>
            </div>
            <p class="text-gray-300 text-sm">{{ $t('privacy.dataStorage.location.description') }}</p>
          </div>
        </div>
      </div>

      <!-- Third-Party Services -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v8h12V6z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.thirdParty.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          {{ $t('privacy.thirdParty.description') }}
        </p>
        <div class="space-y-3 mb-4">
          <div class="flex items-start">
            <svg class="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-300 text-sm">{{ $t('privacy.thirdParty.items.apis') }}</span>
          </div>
          <div class="flex items-start">
            <svg class="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-300 text-sm">{{ $t('privacy.thirdParty.items.analytics') }}</span>
          </div>
          <div class="flex items-start">
            <svg class="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-300 text-sm">{{ $t('privacy.thirdParty.items.cdn') }}</span>
          </div>
          <div class="flex items-start">
            <svg class="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-300 text-sm">{{ $t('privacy.thirdParty.items.security') }}</span>
          </div>
          <div class="flex items-start">
            <svg class="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-300 text-sm">{{ $t('privacy.thirdParty.items.hosting') }}</span>
          </div>
        </div>
        <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
          <p class="text-yellow-200 text-sm font-medium">{{ $t('privacy.thirdParty.noSale') }}</p>
        </div>
      </div>

      <!-- User Rights -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.userRights.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-6">
          {{ $t('privacy.userRights.description') }}
        </p>
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.userRights.access.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.userRights.access.description') }}</p>
          </div>
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.userRights.deletion.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.userRights.deletion.description') }}</p>
          </div>
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.userRights.portability.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.userRights.portability.description') }}</p>
          </div>
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.userRights.objection.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.userRights.objection.description') }}</p>
          </div>
        </div>
        <div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
          <p class="text-blue-200 text-sm">{{ $t('privacy.userRights.exercise') }}</p>
        </div>
      </div>

      <!-- Cookies -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.cookies.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          {{ $t('privacy.cookies.description') }}
        </p>
        <div class="space-y-3 mb-4">
          <div class="flex items-start">
            <div class="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <div>
              <span class="text-white font-semibold text-sm">{{ $t('privacy.cookies.essential.title') }}:</span>
              <span class="text-gray-300 ml-1 text-sm">{{ $t('privacy.cookies.essential.description') }}</span>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <div>
              <span class="text-white font-semibold text-sm">{{ $t('privacy.cookies.analytics.title') }}:</span>
              <span class="text-gray-300 ml-1 text-sm">{{ $t('privacy.cookies.analytics.description') }}</span>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <div>
              <span class="text-white font-semibold text-sm">{{ $t('privacy.cookies.functional.title') }}:</span>
              <span class="text-gray-300 ml-1 text-sm">{{ $t('privacy.cookies.functional.description') }}</span>
            </div>
          </div>
        </div>
        <div class="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
          <p class="text-orange-200 text-sm">{{ $t('privacy.cookies.manage') }}</p>
        </div>
      </div>

      <!-- Legal Basis & Compliance -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-indigo-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-3.22l-2.28 2.28a.75.75 0 01-1.06 0L6.22 15H5a2 2 0 01-2-2V5zm5.99-.5a.5.5 0 00-.5.5v.207a6.996 6.996 0 00-.657.343l-.147-.146a.5.5 0 00-.707.707l.146.147a6.996 6.996 0 00-.343.657H6.5a.5.5 0 000 1h.283c.068.236.158.463.268.673l-.147.146a.5.5 0 00.707.707l.147-.146c.21.11.437.2.673.268V8.5a.5.5 0 001 0v-.283a6.996 6.996 0 00.673-.268l.146.147a.5.5 0 00.707-.707L10.83 7.243a6.996 6.996 0 00.268-.673H11.5a.5.5 0 000-1h-.283a6.996 6.996 0 00-.268-.673l.147-.146a.5.5 0 00-.707-.707l-.146.147a6.996 6.996 0 00-.673-.268V4.5a.5.5 0 00-.5-.5zM8 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.legal.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-6">
          {{ $t('privacy.legal.description') }}
        </p>
        <div class="grid md:grid-cols-3 gap-4 mb-4">
          <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.legal.legitimate.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.legal.legitimate.description') }}</p>
          </div>
          <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.legal.consent.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.legal.consent.description') }}</p>
          </div>
          <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
            <h4 class="text-lg font-semibold text-white mb-2">{{ $t('privacy.legal.contract.title') }}</h4>
            <p class="text-gray-300 text-sm">{{ $t('privacy.legal.contract.description') }}</p>
          </div>
        </div>
        <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
          <p class="text-indigo-200 text-sm">{{ $t('privacy.legal.compliance') }}</p>
        </div>
      </div>

      <!-- Children's Privacy -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.minors.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed">
          {{ $t('privacy.minors.description') }}
        </p>
      </div>

      <!-- International Data Transfers -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-cyan-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.international.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed">
          {{ $t('privacy.international.description') }}
        </p>
      </div>

      <!-- Contact Information -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-tiktok-pink mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          {{ $t('privacy.contact.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed mb-6">
          {{ $t('privacy.contact.description') }}
        </p>
        <div class="space-y-4">
          <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-lg font-semibold text-white mb-1">{{ $t('privacy.contact.email.title') }}</h4>
                <p class="text-gray-300">{{ $t('privacy.contact.email.description') }}</p>
              </div>
              <a href="mailto:privacy@tthd-videosaver.com" class="tiktok-button">
                {{ $t('privacy.contact.email.action') }}
              </a>
            </div>
          </div>
          <div class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <p class="text-gray-300 text-sm mb-2">{{ $t('privacy.contact.address') }}</p>
            <p class="text-gray-400 text-sm">{{ $t('privacy.contact.response') }}</p>
          </div>
        </div>
      </div>

      <!-- Changes to Policy -->
      <div class="tiktok-card">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <svg class="w-6 h-6 text-tiktok-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          {{ $t('privacy.changes.title') }}
        </h2>
        <p class="text-gray-300 leading-relaxed">
          {{ $t('privacy.changes.description') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lastUpdated = ref('January 3, 2025')
</script>