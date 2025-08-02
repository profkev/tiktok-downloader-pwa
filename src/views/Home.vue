<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
        {{ $t('download.title') }}
      </h1>
      <p class="text-xl text-white/80 mb-8">
        {{ $t('app.subtitle') }}
      </p>
    </div>

    <!-- URL Input Section -->
    <div class="card mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('download.title') }}</h2>
      
      <div class="flex gap-4 mb-4">
        <input
          v-model="url"
          @keyup.enter="fetchVideo"
          type="text"
          :placeholder="$t('download.urlPlaceholder')"
          class="input-field flex-1"
          :disabled="loading"
        />
        <button
          @click="fetchVideo"
          :disabled="!url || loading"
          class="btn-primary px-8"
        >
          <span v-if="loading" class="loading-spinner mr-2"></span>
          {{ loading ? $t('download.loading') : $t('download.getVideo') }}
        </button>
      </div>

      <p class="text-sm text-gray-600">
        {{ $t('download.supportedFormats') }}
      </p>

      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {{ error }}
      </div>
    </div>

    <!-- Video Information -->
    <div v-if="videoInfo" class="card mb-8">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Thumbnail -->
        <div class="md:w-1/3">
          <img
            :src="videoInfo.thumbnail"
            :alt="videoInfo.title"
            class="w-full rounded-lg shadow-md"
            @error="onImageError"
          />
        </div>

        <!-- Video Details -->
        <div class="md:w-2/3">
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ videoInfo.title }}</h3>
          <p class="text-gray-600 mb-4">
            <span class="font-semibold">{{ $t('video.by') }}</span> {{ videoInfo.author }}
          </p>
          <p class="text-gray-600 mb-6">
            <span class="font-semibold">{{ $t('video.duration') }}</span> {{ formatDuration(videoInfo.duration) }}
          </p>

          <!-- Download Options -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-800">{{ $t('download.downloadOptions') }}</h4>
            
            <div class="grid gap-3">
              <div
                v-for="quality in videoInfo.qualities"
                :key="`${quality.quality}-${quality.format}`"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-tiktok-pink transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg flex items-center justify-center"
                       :class="quality.format === 'mp3' ? 'bg-tiktok-blue/20' : 'bg-tiktok-pink/20'">
                    <svg v-if="quality.format === 'mp3'" class="w-6 h-6 text-tiktok-dark" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    <svg v-else class="w-6 h-6 text-tiktok-pink" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                  </div>
                  
                  <div>
                    <p class="font-semibold">
                      {{ quality.format === 'mp3' ? $t('video.audio') : $t('video.video') }} - {{ quality.quality }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ quality.format.toUpperCase() }} {{ $t('video.format') }}
                      <span v-if="quality.size"> • {{ formatFileSize(quality.size) }}</span>
                    </p>
                  </div>
                </div>

                <button
                  @click="downloadQuality(quality)"
                  :disabled="downloadProgress.get(`${quality.quality}-${quality.format}`)?.status === 'downloading'"
                  :class="quality.format === 'mp3' ? 'btn-secondary' : 'btn-primary'"
                  class="px-6 py-2"
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

    <!-- Download Progress -->
    <div v-if="Array.from(downloadProgress.values()).some(p => p.status === 'downloading')" class="card">
      <h4 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('download.progress') }}</h4>
      <div class="space-y-3">
        <div
          v-for="[key, progress] in downloadProgress"
          :key="key"
          v-show="progress.status === 'downloading'"
          class="bg-gray-50 rounded-lg p-4"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium">{{ key }}</span>
            <span class="text-sm text-gray-600">{{ progress.percentage }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-tiktok-pink h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progress.percentage}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="grid md:grid-cols-3 gap-6 mt-12">
      <div class="text-center text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">{{ $t('features.noWatermarks.title') }}</h3>
        <p class="text-white/80">{{ $t('features.noWatermarks.description') }}</p>
      </div>

      <div class="text-center text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.5 12.5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-7 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm13.5 0c0 6.08-4.93 11-11 11-1.66 0-3.24-.37-4.65-1.02l-3.1 1.01 1.01-3.1c-.65-1.41-1.02-2.99-1.02-4.65 0-6.08 4.92-11 11-11s11 4.92 11 11z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">{{ $t('features.hdQuality.title') }}</h3>
        <p class="text-white/80">{{ $t('features.hdQuality.description') }}</p>
      </div>

      <div class="text-center text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">{{ $t('features.freeFast.title') }}</h3>
        <p class="text-white/80">{{ $t('features.freeFast.description') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
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