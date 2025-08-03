<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ $t('discover.title') }}
      </h1>
      <p class="text-xl text-white/80">
        {{ $t('discover.subtitle') }}
      </p>
    </div>

    <!-- Search Bar -->
    <div class="card mb-8">
      <div class="flex gap-4">
        <input
          v-model="searchQuery"
          @keyup.enter="search"
          type="text"
          :placeholder="$t('discover.searchPlaceholder')"
          class="input-field flex-1"
        />
        <button @click="search" class="btn-primary px-6">
          <i class="fas fa-search mr-2"></i>{{ $t('discover.search') }}
        </button>
      </div>
    </div>

    <!-- Categories -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div
        v-for="category in categories"
        :key="category.id"
        @click="exploreCategory(category.id)"
        class="card cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
               :class="category.gradient">
            <i :class="category.icon" class="text-white text-2xl"></i>
          </div>
          <h3 class="font-bold text-lg mb-2">{{ $t(category.name) }}</h3>
          <p class="text-gray-600 text-sm mb-3">{{ $t(category.description) }}</p>
          <div class="flex justify-center items-center text-tiktok-pink text-sm font-medium">
            {{ formatNumber(category.videos) }} {{ $t('discover.videos') }}
            <i class="fas fa-arrow-right ml-2"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Content -->
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-white mb-6 text-center">{{ $t('discover.featured') }}</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in featuredContent"
          :key="item.id"
          class="card hover:shadow-xl transition-shadow duration-300"
        >
          <div class="relative mb-4">
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div class="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button class="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                <i class="fas fa-play text-tiktok-pink text-xl"></i>
              </button>
            </div>
            <div class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {{ item.duration }}s
            </div>
          </div>
          <h3 class="font-bold text-lg mb-2">{{ item.title }}</h3>
          <div class="flex items-center gap-2 mb-3">
            <img :src="item.creator.avatar" :alt="item.creator.name" class="w-8 h-8 rounded-full" />
            <span class="text-gray-600">{{ item.creator.name }}</span>
          </div>
          <div class="flex justify-between items-center text-sm text-gray-500">
            <span><i class="fas fa-heart mr-1"></i>{{ formatNumber(item.likes) }}</span>
            <span><i class="fas fa-share mr-1"></i>{{ formatNumber(item.shares) }}</span>
            <span><i class="fas fa-eye mr-1"></i>{{ formatNumber(item.views) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Topics -->
    <div>
      <h2 class="text-3xl font-bold text-white mb-6 text-center">{{ $t('discover.trendingTopics') }}</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="topic in trendingTopics"
          :key="topic.id"
          class="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-white">#{{ topic.name }}</h3>
            <span class="text-xs text-white/70">{{ topic.trend }}</span>
          </div>
          <p class="text-white/80 text-sm mb-2">{{ formatNumber(topic.posts) }} posts</p>
          <div class="flex items-center text-xs text-white/60">
            <i class="fas fa-fire mr-1"></i>
            {{ $t('discover.trending') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchQuery = ref('')

const categories = ref([
  {
    id: 'entertainment',
    name: 'discover.categories.entertainment',
    description: 'discover.categories.entertainmentDesc',
    icon: 'fas fa-star',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
    videos: 1200000000
  },
  {
    id: 'education',
    name: 'discover.categories.education',
    description: 'discover.categories.educationDesc',
    icon: 'fas fa-graduation-cap',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    videos: 450000000
  },
  {
    id: 'sports',
    name: 'discover.categories.sports',
    description: 'discover.categories.sportsDesc',
    icon: 'fas fa-football-ball',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
    videos: 780000000
  },
  {
    id: 'lifestyle',
    name: 'discover.categories.lifestyle',
    description: 'discover.categories.lifestyleDesc',
    icon: 'fas fa-home',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
    videos: 920000000
  },
  {
    id: 'technology',
    name: 'discover.categories.technology',
    description: 'discover.categories.technologyDesc',
    icon: 'fas fa-microchip',
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    videos: 340000000
  },
  {
    id: 'food',
    name: 'discover.categories.food',
    description: 'discover.categories.foodDesc',
    icon: 'fas fa-utensils',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    videos: 650000000
  },
  {
    id: 'travel',
    name: 'discover.categories.travel',
    description: 'discover.categories.travelDesc',
    icon: 'fas fa-plane',
    gradient: 'bg-gradient-to-br from-teal-500 to-green-500',
    videos: 420000000
  },
  {
    id: 'art',
    name: 'discover.categories.art',
    description: 'discover.categories.artDesc',
    icon: 'fas fa-palette',
    gradient: 'bg-gradient-to-br from-rose-500 to-pink-500',
    videos: 380000000
  }
])

const featuredContent = ref([
  {
    id: 1,
    title: 'Amazing Dance Challenge',
    thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    duration: 15,
    creator: {
      name: 'DanceQueen',
      avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    likes: 2400000,
    shares: 450000,
    views: 12000000
  },
  {
    id: 2,
    title: 'Cooking Hack That Will Blow Your Mind',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    duration: 30,
    creator: {
      name: 'ChefMaster',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    },
    likes: 1800000,
    shares: 320000,
    views: 8500000
  },
  {
    id: 3,
    title: 'DIY Room Transformation',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    duration: 45,
    creator: {
      name: 'HomeDesigner',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    },
    likes: 1200000,
    shares: 280000,
    views: 6200000
  },
  {
    id: 4,
    title: 'Mind-Blowing Magic Trick',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    duration: 20,
    creator: {
      name: 'MagicMike',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    },
    likes: 3200000,
    shares: 680000,
    views: 15800000
  },
  {
    id: 5,
    title: 'Pet Training Tips',
    thumbnail: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    duration: 25,
    creator: {
      name: 'PetTrainer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face'
    },
    likes: 980000,
    shares: 150000,
    views: 4200000
  },
  {
    id: 6,
    title: 'Fitness Motivation',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    duration: 35,
    creator: {
      name: 'FitGuru',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face'
    },
    likes: 1500000,
    shares: 250000,
    views: 7800000
  }
])

const trendingTopics = ref([
  { id: 1, name: 'BookTok', posts: 12400000, trend: '+15%' },
  { id: 2, name: 'PlantTok', posts: 8900000, trend: '+23%' },
  { id: 3, name: 'CleanTok', posts: 15600000, trend: '+8%' },
  { id: 4, name: 'StudyTok', posts: 6700000, trend: '+31%' },
  { id: 5, name: 'PetTok', posts: 22100000, trend: '+12%' },
  { id: 6, name: 'FoodTok', posts: 18800000, trend: '+19%' },
  { id: 7, name: 'DIYTok', posts: 9200000, trend: '+27%' },
  { id: 8, name: 'SkincareRoutine', posts: 11500000, trend: '+22%' }
])

const search = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Implement search functionality
  }
}

const exploreCategory = (categoryId: string) => {
  console.log('Exploring category:', categoryId)
  // Navigate to category page
}

const formatNumber = (count: number): string => {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1) + 'B'
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

onMounted(() => {
  // Could fetch discover data from an API here
})
</script>