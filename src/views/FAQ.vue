<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="flex items-center justify-center gap-4 mb-6">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl blur-lg opacity-40 animate-tiktok-pulse"></div>
          <div class="w-16 h-16 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl relative z-10 flex items-center justify-center">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tiktok-gradient-text">{{ $t('faq.title') }}</h1>
      </div>
      <p class="text-xl text-gray-300 leading-relaxed">
        {{ $t('faq.subtitle') }}
      </p>
    </div>

    <!-- Search Bar -->
    <div class="tiktok-card mb-8">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('faq.searchPlaceholder')"
          class="tiktok-input pr-12"
        />
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- FAQ Categories -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="[
          'tiktok-feature-card text-center transition-all duration-300',
          activeCategory === category.id 
            ? 'ring-2 ring-tiktok-pink bg-gray-800/80' 
            : 'hover:bg-gray-800/60'
        ]"
      >
        <div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
             :class="category.bgColor">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" v-html="category.icon">
          </svg>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">{{ $t(category.name) }}</h3>
        <p class="text-sm text-gray-300">{{ category.count }} {{ $t('faq.questions') }}</p>
      </button>
    </div>

    <!-- FAQ Items -->
    <div class="space-y-4">
      <div
        v-for="(faq, index) in filteredFAQs"
        :key="index"
        class="tiktok-card"
      >
        <button
          @click="toggleFAQ(index)"
          class="w-full text-left flex items-center justify-between p-2"
        >
          <h3 class="text-lg font-bold text-white pr-4">{{ $t(faq.question) }}</h3>
          <div class="flex-shrink-0">
            <svg 
              :class="['w-5 h-5 text-tiktok-pink transition-transform duration-300', openFAQs.includes(index) ? 'rotate-180' : '']"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
        </button>
        
        <div 
          v-show="openFAQs.includes(index)"
          class="mt-4 pt-4 border-t border-gray-700/50"
        >
          <div class="text-gray-300 leading-relaxed space-y-3">
            <p v-for="(paragraph, pIndex) in $t(faq.answer).split('\n')" :key="pIndex">
              {{ paragraph }}
            </p>
          </div>
          <div v-if="faq.tags" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in faq.tags"
              :key="tag"
              class="text-xs bg-tiktok-pink/20 text-tiktok-pink px-2 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="filteredFAQs.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{{ $t('faq.noResults.title') }}</h3>
      <p class="text-gray-300 mb-4">{{ $t('faq.noResults.description') }}</p>
      <button 
        @click="clearSearch"
        class="tiktok-button"
      >
        {{ $t('faq.noResults.clearSearch') }}
      </button>
    </div>

    <!-- Contact Section -->
    <div class="tiktok-card mt-12 text-center">
      <h2 class="text-2xl font-bold text-white mb-4">{{ $t('faq.contact.title') }}</h2>
      <p class="text-gray-300 mb-6">{{ $t('faq.contact.description') }}</p>
      <a href="mailto:support@tthd-videosaver.com" class="tiktok-button inline-flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        {{ $t('faq.contact.email') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeCategory = ref('all')
const openFAQs = ref<number[]>([])

const categories = [
  {
    id: 'all',
    name: 'faq.categories.all',
    icon: '<path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
    bgColor: 'bg-gradient-to-r from-tiktok-pink to-tiktok-blue',
    count: 15
  },
  {
    id: 'downloading',
    name: 'faq.categories.downloading',
    icon: '<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
    bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    count: 8
  },
  {
    id: 'technical',
    name: 'faq.categories.technical',
    icon: '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
    bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    count: 7
  }
]

const faqs = [
  // General/All Category
  { category: 'all', question: 'faq.general.q1', answer: 'faq.general.a1', tags: ['basic', 'free'] },
  { category: 'all', question: 'faq.general.q2', answer: 'faq.general.a2', tags: ['watermark', 'quality'] },
  { category: 'all', question: 'faq.general.q3', answer: 'faq.general.a3', tags: ['legal', 'safe'] },
  { category: 'all', question: 'faq.general.q4', answer: 'faq.general.a4', tags: ['devices', 'compatibility'] },
  { category: 'all', question: 'faq.general.q5', answer: 'faq.general.a5', tags: ['registration', 'account'] },
  
  // Downloading Category
  { category: 'downloading', question: 'faq.downloading.q1', answer: 'faq.downloading.a1', tags: ['steps', 'how-to'] },
  { category: 'downloading', question: 'faq.downloading.q2', answer: 'faq.downloading.a2', tags: ['formats', 'quality'] },
  { category: 'downloading', question: 'faq.downloading.q3', answer: 'faq.downloading.a3', tags: ['mp3', 'audio'] },
  { category: 'downloading', question: 'faq.downloading.q4', answer: 'faq.downloading.a4', tags: ['batch', 'multiple'] },
  { category: 'downloading', question: 'faq.downloading.q5', answer: 'faq.downloading.a5', tags: ['limits', 'restrictions'] },
  { category: 'downloading', question: 'faq.downloading.q6', answer: 'faq.downloading.a6', tags: ['private', 'videos'] },
  { category: 'downloading', question: 'faq.downloading.q7', answer: 'faq.downloading.a7', tags: ['live', 'streams'] },
  { category: 'downloading', question: 'faq.downloading.q8', answer: 'faq.downloading.a8', tags: ['speed', 'slow'] },
  
  // Technical Category
  { category: 'technical', question: 'faq.technical.q1', answer: 'faq.technical.a1', tags: ['error', 'failed'] },
  { category: 'technical', question: 'faq.technical.q2', answer: 'faq.technical.a2', tags: ['browser', 'compatibility'] },
  { category: 'technical', question: 'faq.technical.q3', answer: 'faq.technical.a3', tags: ['mobile', 'phone'] },
  { category: 'technical', question: 'faq.technical.q4', answer: 'faq.technical.a4', tags: ['storage', 'location'] },
  { category: 'technical', question: 'faq.technical.q5', answer: 'faq.technical.a5', tags: ['quality', 'low'] },
  { category: 'technical', question: 'faq.technical.q6', answer: 'faq.technical.a6', tags: ['virus', 'malware'] },
  { category: 'technical', question: 'faq.technical.q7', answer: 'faq.technical.a7', tags: ['blocked', 'region'] }
]

const filteredFAQs = computed(() => {
  let filtered = faqs
  
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === activeCategory.value || faq.category === 'all')
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

const toggleFAQ = (index: number) => {
  const faqIndex = openFAQs.value.indexOf(index)
  if (faqIndex > -1) {
    openFAQs.value.splice(faqIndex, 1)
  } else {
    openFAQs.value.push(index)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
}
</script>