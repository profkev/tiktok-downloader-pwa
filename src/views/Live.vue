<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ $t('live.title') }}
      </h1>
      <p class="text-xl text-white/80">
        {{ $t('live.subtitle') }}
      </p>
    </div>

    <!-- Live Stats -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="card text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-broadcast-tower text-white text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">{{ formatNumber(liveStats.currentStreams) }}</h3>
        <p class="text-gray-600">{{ $t('live.stats.currentStreams') }}</p>
      </div>
      <div class="card text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-users text-white text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">{{ formatNumber(liveStats.totalViewers) }}</h3>
        <p class="text-gray-600">{{ $t('live.stats.totalViewers') }}</p>
      </div>
      <div class="card text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-clock text-white text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">{{ liveStats.totalHoursToday }}h</h3>
        <p class="text-gray-600">{{ $t('live.stats.totalHours') }}</p>
      </div>
    </div>

    <!-- Featured Live Stream -->
    <div class="card mb-8 overflow-hidden">
      <div class="relative">
        <img
          :src="featuredStream.thumbnail"
          :alt="featuredStream.title"
          class="w-full h-80 object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <!-- Live Badge -->
        <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
          <div class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          {{ $t('live.live') }}
        </div>
        
        <!-- Viewer Count -->
        <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          <i class="fas fa-eye mr-1"></i>{{ formatNumber(featuredStream.viewers) }}
        </div>
        
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div class="flex items-center gap-4 mb-4">
            <img
              :src="featuredStream.creator.avatar"
              :alt="featuredStream.creator.name"
              class="w-16 h-16 rounded-full border-2 border-white"
            />
            <div>
              <h2 class="text-2xl font-bold">{{ featuredStream.title }}</h2>
              <p class="text-white/80">{{ featuredStream.creator.name }}</p>
              <p class="text-sm text-white/60">{{ $t('live.started') }} {{ featuredStream.startedAgo }}</p>
            </div>
          </div>
          <button class="btn-primary px-8 py-3 text-lg">
            <i class="fas fa-play mr-2"></i>{{ $t('live.watchNow') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="[
          'px-4 py-2 rounded-full font-medium transition-all duration-300',
          activeCategory === category.id
            ? 'bg-tiktok-pink text-white shadow-lg'
            : 'bg-white/10 text-white hover:bg-white/20'
        ]"
      >
        <i :class="category.icon" class="mr-2"></i>
        {{ $t(category.label) }}
      </button>
    </div>

    <!-- Live Streams Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div
        v-for="stream in filteredStreams"
        :key="stream.id"
        class="card hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <div class="relative">
          <img
            :src="stream.thumbnail"
            :alt="stream.title"
            class="w-full h-48 object-cover"
          />
          
          <!-- Live Badge -->
          <div class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
            <div class="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
            {{ $t('live.live') }}
          </div>
          
          <!-- Viewer Count -->
          <div class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {{ formatNumber(stream.viewers) }}
          </div>
          
          <!-- Duration -->
          <div class="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {{ stream.duration }}
          </div>
          
          <!-- Play Overlay -->
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button class="bg-white/90 rounded-full p-3 hover:bg-white transition-colors">
              <i class="fas fa-play text-red-500 text-xl"></i>
            </button>
          </div>
        </div>
        
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ stream.title }}</h3>
          
          <div class="flex items-center gap-3 mb-3">
            <img
              :src="stream.creator.avatar"
              :alt="stream.creator.name"
              class="w-10 h-10 rounded-full"
            />
            <div class="flex-1">
              <p class="font-medium text-gray-800">{{ stream.creator.name }}</p>
              <p class="text-sm text-gray-600">{{ formatNumber(stream.creator.followers) }} followers</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>{{ $t('live.started') }} {{ stream.startedAgo }}</span>
            <span class="flex items-center">
              <i :class="getCategoryIcon(stream.category)" class="mr-1"></i>
              {{ $t(`live.categories.${stream.category}`) }}
            </span>
          </div>
          
          <button class="btn-primary w-full py-2">
            <i class="fas fa-play mr-2"></i>{{ $t('live.join') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="text-center">
      <button class="btn-secondary px-8 py-3">
        <i class="fas fa-sync-alt mr-2"></i>{{ $t('live.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'live.categories.all', icon: 'fas fa-th' },
  { id: 'music', label: 'live.categories.music', icon: 'fas fa-music' },
  { id: 'gaming', label: 'live.categories.gaming', icon: 'fas fa-gamepad' },
  { id: 'dance', label: 'live.categories.dance', icon: 'fas fa-dancer' },
  { id: 'talk', label: 'live.categories.talk', icon: 'fas fa-comments' },
  { id: 'cooking', label: 'live.categories.cooking', icon: 'fas fa-utensils' }
]

const liveStats = ref({
  currentStreams: 245000,
  totalViewers: 8900000,
  totalHoursToday: 1247
})

const featuredStream = ref({
  id: 'featured',
  title: 'Epic Dance Battle - Join the Fun!',
  thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop',
  viewers: 125000,
  startedAgo: '2h ago',
  creator: {
    name: 'DanceKing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    followers: 8900000
  }
})

const liveStreams = ref([
  {
    id: 1,
    title: 'Cooking Challenge: 5-Minute Meals',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    viewers: 45000,
    duration: '1:23:45',
    startedAgo: '1h ago',
    category: 'cooking',
    creator: {
      name: 'ChefMaster',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      followers: 2100000
    }
  },
  {
    id: 2,
    title: 'Gaming Session: New Release First Look',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    viewers: 78000,
    duration: '2:15:20',
    startedAgo: '2h ago',
    category: 'gaming',
    creator: {
      name: 'GamePro',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      followers: 1800000
    }
  },
  {
    id: 3,
    title: 'Morning Chat & Coffee',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    viewers: 23000,
    duration: '0:45:12',
    startedAgo: '45m ago',
    category: 'talk',
    creator: {
      name: 'MorningVibes',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      followers: 950000
    }
  },
  {
    id: 4,
    title: 'Live Music Session - Acoustic Covers',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    viewers: 67000,
    duration: '1:05:30',
    startedAgo: '1h ago',
    category: 'music',
    creator: {
      name: 'AcousticSoul',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face',
      followers: 3200000
    }
  },
  {
    id: 5,
    title: 'Learn This Dance in 10 Minutes',
    thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    viewers: 89000,
    duration: '0:35:45',
    startedAgo: '35m ago',
    category: 'dance',
    creator: {
      name: 'DanceTeacher',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face',
      followers: 1600000
    }
  },
  {
    id: 6,
    title: 'Q&A: Ask Me Anything!',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    viewers: 34000,
    duration: '0:28:15',
    startedAgo: '28m ago',
    category: 'talk',
    creator: {
      name: 'LifeCoach',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      followers: 1200000
    }
  }
])

const filteredStreams = computed(() => {
  if (activeCategory.value === 'all') {
    return liveStreams.value
  }
  return liveStreams.value.filter(stream => stream.category === activeCategory.value)
})

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    music: 'fas fa-music',
    gaming: 'fas fa-gamepad',
    dance: 'fas fa-dancer',
    talk: 'fas fa-comments',
    cooking: 'fas fa-utensils'
  }
  return icons[category] || 'fas fa-video'
}

const formatNumber = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

onMounted(() => {
  // Could fetch live streams data from an API here
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>