<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ $t('trends.title') }}
      </h1>
      <p class="text-xl text-white/80">
        {{ $t('trends.subtitle') }}
      </p>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-6 py-3 rounded-full font-medium transition-all duration-300',
          activeTab === tab.id
            ? 'bg-tiktok-pink text-white shadow-lg'
            : 'bg-white/10 text-white hover:bg-white/20'
        ]"
      >
        <i :class="tab.icon" class="mr-2"></i>
        {{ $t(tab.label) }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Popular Users Tab -->
      <div v-if="activeTab === 'users'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="user in popularUsers"
          :key="user.id"
          class="card hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center gap-4 mb-4">
            <img
              :src="user.avatar"
              :alt="user.username"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div class="flex-1">
              <h3 class="font-bold text-lg">{{ user.displayName }}</h3>
              <p class="text-gray-600">@{{ user.username }}</p>
              <p class="text-sm text-tiktok-pink font-medium">{{ formatFollowers(user.followers) }} followers</p>
            </div>
          </div>
          <p class="text-gray-700 mb-4">{{ user.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">{{ user.videos }} videos</span>
            <button class="btn-primary px-4 py-2 text-sm">
              {{ $t('trends.viewProfile') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Popular Sounds Tab -->
      <div v-if="activeTab === 'sounds'" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="sound in popularSounds"
          :key="sound.id"
          class="card hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-tiktok-pink to-tiktok-blue rounded-full flex items-center justify-center">
              <i class="fas fa-music text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg">{{ sound.title }}</h3>
              <p class="text-gray-600">{{ sound.artist }}</p>
              <p class="text-sm text-tiktok-pink font-medium">{{ formatNumber(sound.uses) }} videos</p>
            </div>
          </div>
          <div class="flex items-center gap-2 mb-4">
            <div class="flex-1 bg-gray-200 rounded-full h-2">
              <div class="bg-tiktok-pink h-2 rounded-full" :style="{ width: '60%' }"></div>
            </div>
            <span class="text-sm text-gray-500">0:{{ sound.duration }}s</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">{{ sound.genre }}</span>
            <button class="btn-secondary px-4 py-2 text-sm">
              <i class="fas fa-play mr-2"></i>{{ $t('trends.useSound') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Popular Hashtags Tab -->
      <div v-if="activeTab === 'hashtags'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="hashtag in popularHashtags"
          :key="hashtag.id"
          class="card hover:shadow-xl transition-shadow duration-300"
        >
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-tiktok-pink to-tiktok-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl font-bold">#</span>
            </div>
            <h3 class="font-bold text-xl mb-2">{{ hashtag.name }}</h3>
            <p class="text-tiktok-pink font-medium mb-2">{{ formatNumber(hashtag.views) }} views</p>
            <p class="text-gray-600 text-sm mb-4">{{ hashtag.description }}</p>
            <div class="flex justify-center gap-2 mb-4">
              <span
                v-for="tag in hashtag.relatedTags"
                :key="tag"
                class="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                #{{ tag }}
              </span>
            </div>
            <button class="btn-primary px-4 py-2 text-sm w-full">
              {{ $t('trends.exploreHashtag') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref('users')

const tabs = [
  { id: 'users', label: 'trends.tabs.users', icon: 'fas fa-users' },
  { id: 'sounds', label: 'trends.tabs.sounds', icon: 'fas fa-music' },
  { id: 'hashtags', label: 'trends.tabs.hashtags', icon: 'fas fa-hashtag' }
]

const popularUsers = ref([
  {
    id: 1,
    username: 'charlidamelio',
    displayName: 'Charli D\'Amelio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    followers: 151000000,
    videos: 2847,
    description: 'hi :) 19 years old, dancing and having fun!'
  },
  {
    id: 2,
    username: 'addisonre',
    displayName: 'Addison Rae',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    followers: 88500000,
    videos: 1456,
    description: 'actress, dancer, entrepreneur'
  },
  {
    id: 3,
    username: 'zachking',
    displayName: 'Zach King',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    followers: 70200000,
    videos: 967,
    description: 'Final Cut King 👑 Filmmaker & Illusionist'
  },
  {
    id: 4,
    username: 'bellapoarch',
    displayName: 'Bella Poarch',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    followers: 92100000,
    videos: 234,
    description: 'Build a Bitch singer 🎵'
  },
  {
    id: 5,
    username: 'willsmith',
    displayName: 'Will Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    followers: 72800000,
    videos: 145,
    description: 'Actor, Producer, Musician'
  },
  {
    id: 6,
    username: 'dixiedamelio',
    displayName: 'Dixie D\'Amelio',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
    followers: 57300000,
    videos: 892,
    description: 'singer 🎤'
  }
])

const popularSounds = ref([
  {
    id: 1,
    title: 'Monkeys Spinning Monkeys',
    artist: 'Kevin MacLeod',
    uses: 15400000,
    duration: 15,
    genre: 'Comedy'
  },
  {
    id: 2,
    title: 'Oh No',
    artist: 'Capone',
    uses: 12800000,
    duration: 12,
    genre: 'Meme'
  },
  {
    id: 3,
    title: 'Buss It',
    artist: 'Erica Banks',
    uses: 8900000,
    duration: 20,
    genre: 'Hip Hop'
  },
  {
    id: 4,
    title: 'Driver License',
    artist: 'Olivia Rodrigo',
    uses: 7200000,
    duration: 25,
    genre: 'Pop'
  },
  {
    id: 5,
    title: 'Levitating',
    artist: 'Dua Lipa',
    uses: 9600000,
    duration: 18,
    genre: 'Pop'
  },
  {
    id: 6,
    title: 'Heat Waves',
    artist: 'Glass Animals',
    uses: 6800000,
    duration: 22,
    genre: 'Indie'
  }
])

const popularHashtags = ref([
  {
    id: 1,
    name: 'fyp',
    views: 26800000000000,
    description: 'For You Page - The heart of TikTok discovery',
    relatedTags: ['viral', 'trending', 'foryou']
  },
  {
    id: 2,
    name: 'viral',
    views: 18200000000000,
    description: 'Content that\'s spreading like wildfire',
    relatedTags: ['trending', 'fyp', 'famous']
  },
  {
    id: 3,
    name: 'challenge',
    views: 12400000000000,
    description: 'Join the latest challenges and trends',
    relatedTags: ['dance', 'trend', 'viral']
  },
  {
    id: 4,
    name: 'comedy',
    views: 8900000000000,
    description: 'Laugh out loud with the funniest content',
    relatedTags: ['funny', 'meme', 'lol']
  },
  {
    id: 5,
    name: 'dance',
    views: 15600000000000,
    description: 'Show off your moves and learn new dances',
    relatedTags: ['choreography', 'music', 'moves']
  },
  {
    id: 6,
    name: 'fashion',
    views: 7300000000000,
    description: 'Latest fashion trends and style inspiration',
    relatedTags: ['style', 'outfit', 'ootd']
  }
])

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

const formatNumber = (count: number): string => {
  if (count >= 1000000000000) {
    return (count / 1000000000000).toFixed(1) + 'T'
  } else if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1) + 'B'
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

onMounted(() => {
  // Could fetch real trending data from an API here
})
</script>