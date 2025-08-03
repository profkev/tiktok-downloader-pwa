<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Download Section - Main Functionality -->
    <div class="max-w-2xl mx-auto mb-16">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-full blur-lg opacity-40 animate-tiktok-pulse"></div>
            <svg class="w-16 h-16 text-tiktok-pink relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z"/>
            </svg>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold tiktok-gradient-text">{{ $t('app.title') }}</h1>
        </div>
        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          {{ $t('app.subtitle') }}
        </p>
      </div>
      
      <div class="tiktok-card">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-3">{{ $t('download.title') }}</h2>
          <p class="text-gray-300">{{ $t('download.supportedFormats') }}</p>
        </div>
        
        <div class="space-y-6">
          <div class="relative">
            <input
              v-model="url"
              @keyup.enter="fetchVideo"
              type="text"
              :placeholder="$t('download.urlPlaceholder')"
              class="tiktok-input pr-32"
              :disabled="loading"
            />
            <button
              @click="fetchVideo"
              :disabled="!url || loading"
              class="absolute right-2 top-2 tiktok-button text-sm"
            >
              <span v-if="loading" class="loading-spinner mr-2"></span>
              {{ loading ? $t('download.loading') : $t('download.getVideo') }}
            </button>
          </div>

          <div v-if="error" class="p-4 bg-red-900/50 border-l-4 border-red-400 rounded-xl backdrop-blur-sm">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-red-200 font-medium">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section with Slider -->
    <div class="relative mb-16 overflow-hidden rounded-3xl">
      <div class="relative h-96 md:h-[500px]">
        <!-- Slider Images -->
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          :class="['absolute inset-0 transition-all duration-1000 ease-in-out', currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105']"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-blue-900/40"></div>
          <img 
            :src="slide.image" 
            :alt="slide.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          
          <!-- Content Overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center max-w-4xl px-6">
              <h2 class="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">{{ slide.title }}</h2>
              <p class="text-lg md:text-xl text-white/90 mb-6 leading-relaxed drop-shadow">{{ slide.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- Navigation Dots -->
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          <button
            v-for="(_, index) in heroSlides"
            :key="index"
            @click="currentSlide = index"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              currentSlide === index 
                ? 'bg-tiktok-pink scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            ]"
          ></button>
        </div>
        
        <!-- Navigation Arrows -->
        <button 
          @click="prevSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- How It Works Section -->
    <div class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">{{ $t('howItWorks.title') }}</h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">{{ $t('howItWorks.subtitle') }}</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="(step, index) in howItWorksSteps" 
          :key="index"
          class="text-center group"
        >
          <div class="relative mb-6">
            <div class="w-20 h-20 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl font-bold text-white">{{ index + 1 }}</span>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-tiktok-blue rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" v-html="step.icon">
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">{{ step.title }}</h3>
          <p class="text-gray-300 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- Video Information -->
    <div v-if="videoInfo" class="max-w-4xl mx-auto mb-12">
      <div class="tiktok-card">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Thumbnail -->
          <div>
            <div class="relative rounded-2xl overflow-hidden bg-gray-800 border border-gray-700">
              <img
                :src="videoInfo.thumbnail"
                :alt="videoInfo.title"
                class="w-full aspect-video object-cover"
                @error="onImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>

          <!-- Video Details -->
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-white mb-3 leading-tight">{{ videoInfo.title }}</h3>
              <div class="flex items-center gap-6 text-gray-300 text-sm">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-tiktok-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  {{ videoInfo.author }}
                </span>
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-tiktok-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  {{ formatDuration(videoInfo.duration) }}
                </span>
              </div>
            </div>

            <!-- Download Options -->
            <div>
              <h4 class="text-xl font-bold text-white mb-4">{{ $t('download.downloadOptions') }}</h4>
              
              <div class="space-y-4">
                <div
                  v-for="quality in videoInfo.qualities"
                  :key="`${quality.quality}-${quality.format}`"
                  class="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-tiktok-pink/30"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                         :class="quality.format === 'mp3' ? 'bg-tiktok-blue/20 text-tiktok-blue border border-tiktok-blue/30' : 'bg-tiktok-pink/20 text-tiktok-pink border border-tiktok-pink/30'">
                      <svg v-if="quality.format === 'mp3'" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                      <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                      </svg>
                    </div>
                    
                    <div>
                      <p class="font-bold text-white">
                        {{ quality.format === 'mp3' ? $t('video.audio') : $t('video.video') }} - {{ quality.quality }}
                      </p>
                      <p class="text-sm text-gray-400">
                        {{ quality.format.toUpperCase() }} {{ $t('video.format') }}
                        <span v-if="quality.size"> • {{ formatFileSize(quality.size) }}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    @click="downloadQuality(quality)"
                    :disabled="downloadProgress.get(`${quality.quality}-${quality.format}`)?.status === 'downloading'"
                    :class="quality.format === 'mp3' ? 'btn-outline' : 'tiktok-button'"
                  >
                    <span v-if="downloadProgress.get(`${quality.quality}-${quality.format}`)?.status === 'downloading'" 
                          class="loading-spinner mr-2"></span>
                    {{ getDownloadButtonText(quality) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Download Progress -->
    <div v-if="Array.from(downloadProgress.values()).some(p => p.status === 'downloading')" class="max-w-2xl mx-auto mb-12">
      <div class="tiktok-card">
        <h4 class="text-xl font-bold text-white mb-6">{{ $t('download.progress') }}</h4>
        <div class="space-y-4">
          <div
            v-for="[key, progress] in downloadProgress"
            :key="key"
            v-show="progress.status === 'downloading'"
            class="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
          >
            <div class="flex justify-between items-center mb-3">
              <span class="font-bold text-white">{{ key }}</span>
              <span class="text-sm text-gray-300">{{ progress.percentage }}%</span>
            </div>
            <div class="tiktok-progress">
              <div
                class="tiktok-progress-bar"
                :style="{ width: `${progress.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8">
        <div class="tiktok-feature-card text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">{{ $t('features.noWatermarks.title') }}</h3>
          <p class="text-gray-300 leading-relaxed">{{ $t('features.noWatermarks.description') }}</p>
        </div>

        <div class="tiktok-feature-card text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-tiktok-blue to-tiktok-pink rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5 12.5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-7 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm13.5 0c0 6.08-4.93 11-11 11-1.66 0-3.24-.37-4.65-1.02l-3.1 1.01 1.01-3.1c-.65-1.41-1.02-2.99-1.02-4.65 0-6.08 4.92-11 11-11s11 4.92 11 11z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">{{ $t('features.hdQuality.title') }}</h3>
          <p class="text-gray-300 leading-relaxed">{{ $t('features.hdQuality.description') }}</p>
        </div>

        <div class="tiktok-feature-card text-center">
          <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">{{ $t('features.freeFast.title') }}</h3>
          <p class="text-gray-300 leading-relaxed">{{ $t('features.freeFast.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { TikTokParser } from '@/services/tiktokParser'
import { TikTokApi } from '@/services/tiktokApi'
import { DownloadService } from '@/services/downloadService'
import type { TikTokVideo, VideoQuality, DownloadProgress } from '@/types'

const { t } = useI18n()

const url = ref('')
const loading = ref(false)
const error = ref('')
const videoInfo = ref<TikTokVideo | null>(null)
const downloadProgress = reactive(new Map<string, DownloadProgress>())

// Hero Slider
const currentSlide = ref(0)
let slideInterval: NodeJS.Timeout | null = null

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1920&h=1080&fit=crop&q=80',
    title: 'Download TikTok Videos in HD Quality',
    description: 'Get your favorite TikTok videos without watermarks in the highest quality available.'
  },
  {
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1920&h=1080&fit=crop&q=80',
    title: 'Fast & Secure Downloads',
    description: 'Our advanced technology ensures lightning-fast downloads while keeping your data safe and secure.'
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&q=80',
    title: 'Multiple Formats Available',
    description: 'Choose from various video qualities and formats, including MP4 for videos and MP3 for audio-only downloads.'
  }
]

const howItWorksSteps = [
  {
    title: 'Copy TikTok URL',
    description: 'Copy the link of any TikTok video you want to download from the TikTok app or website.',
    icon: '<path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>'
  },
  {
    title: 'Paste & Process',
    description: 'Paste the URL in our input field and click the download button. We\'ll process the video instantly.',
    icon: '<path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>'
  },
  {
    title: 'Download & Enjoy',
    description: 'Choose your preferred quality and format, then download the video to your device in seconds.',
    icon: '<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>'
  }
]

// Slider functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? heroSlides.length - 1 : currentSlide.value - 1
}

const startSlideshow = () => {
  slideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopSlideshow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}


// Lifecycle
onMounted(() => {
  startSlideshow()
})

onUnmounted(() => {
  stopSlideshow()
})

const fetchVideo = async () => {
  if (!url.value.trim()) return

  loading.value = true
  error.value = ''
  videoInfo.value = null

  try {
    const { isValid, normalizedUrl } = TikTokParser.validateAndParse(url.value)
    
    if (!isValid) {
      throw new Error(t('errors.invalidUrl'))
    }

    const video = await TikTokApi.getVideoInfo(normalizedUrl)
    videoInfo.value = video
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('errors.fetchFailed')
  } finally {
    loading.value = false
  }
}

const downloadQuality = async (quality: VideoQuality) => {
  if (!videoInfo.value) return

  const key = `${quality.quality}-${quality.format}`
  
  try {
    downloadProgress.set(key, {
      percentage: 0,
      loaded: 0,
      total: 0,
      status: 'downloading'
    })

    await DownloadService.downloadVideo(
      quality,
      videoInfo.value.title,
      videoInfo.value.author,
      (progress) => {
        downloadProgress.set(key, progress)
      }
    )
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('errors.downloadError')
    downloadProgress.delete(key)
  }
}

const getDownloadButtonText = (quality: VideoQuality): string => {
  const key = `${quality.quality}-${quality.format}`
  const progress = downloadProgress.get(key)
  
  if (progress?.status === 'downloading') {
    return `${progress.percentage}%`
  }
  
  return t('download.download')
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatFileSize = (bytes: number): string => {
  return DownloadService.formatFileSize(bytes)
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>