<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ $t('challenges.title') }}
      </h1>
      <p class="text-xl text-white/80">
        {{ $t('challenges.subtitle') }}
      </p>
    </div>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="activeFilter = filter.id"
        :class="[
          'px-6 py-3 rounded-full font-medium transition-all duration-300',
          activeFilter === filter.id
            ? 'bg-tiktok-pink text-white shadow-lg'
            : 'bg-white/10 text-white hover:bg-white/20'
        ]"
      >
        <i :class="filter.icon" class="mr-2"></i>
        {{ $t(filter.label) }}
      </button>
    </div>

    <!-- Featured Challenge -->
    <div class="card mb-12 overflow-hidden">
      <div class="relative">
        <img
          :src="featuredChallenge.banner"
          :alt="featuredChallenge.name"
          class="w-full h-64 object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-tiktok-pink to-tiktok-blue rounded-full flex items-center justify-center">
              <i class="fas fa-fire text-white text-2xl"></i>
            </div>
            <div>
              <h2 class="text-3xl font-bold">{{ featuredChallenge.name }}</h2>
              <p class="text-white/80">{{ $t('challenges.featuredChallenge') }}</p>
            </div>
          </div>
          <p class="text-lg mb-4">{{ featuredChallenge.description }}</p>
          <div class="flex items-center gap-6 mb-4">
            <span class="text-2xl font-bold">{{ formatNumber(featuredChallenge.participants) }} {{ $t('challenges.participants') }}</span>
            <span class="text-lg">{{ formatNumber(featuredChallenge.views) }} {{ $t('challenges.views') }}</span>
          </div>
          <button class="btn-primary px-8 py-3 text-lg">
            <i class="fas fa-plus mr-2"></i>{{ $t('challenges.joinChallenge') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Challenges Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="challenge in filteredChallenges"
        :key="challenge.id"
        class="card hover:shadow-xl transition-shadow duration-300"
      >
        <div class="relative mb-4">
          <img
            :src="challenge.thumbnail"
            :alt="challenge.name"
            class="w-full h-48 object-cover rounded-lg"
          />
          <div class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
               :class="getDifficultyClass(challenge.difficulty)">
            {{ $t(`challenges.difficulty.${challenge.difficulty}`) }}
          </div>
          <div class="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
            <i class="fas fa-users mr-1"></i>{{ formatNumber(challenge.participants) }}
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <div class="bg-black/70 rounded p-2 text-white text-center">
              <h3 class="font-bold text-lg">{{ challenge.name }}</h3>
            </div>
          </div>
        </div>
        
        <div class="space-y-3">
          <p class="text-gray-600 text-sm line-clamp-2">{{ challenge.description }}</p>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-tiktok-pink font-medium">
              <i class="fas fa-hashtag mr-1"></i>{{ challenge.hashtag }}
            </span>
            <span class="text-gray-500">
              <i class="fas fa-calendar mr-1"></i>{{ challenge.daysLeft }} {{ $t('challenges.daysLeft') }}
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img
                :src="challenge.creator.avatar"
                :alt="challenge.creator.name"
                class="w-8 h-8 rounded-full"
              />
              <span class="text-sm text-gray-600">{{ challenge.creator.name }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <i class="fas fa-eye mr-1"></i>{{ formatNumber(challenge.views) }}
            </div>
          </div>
          
          <div class="flex gap-2">
            <button class="btn-primary flex-1 py-2 text-sm">
              <i class="fas fa-play mr-2"></i>{{ $t('challenges.watchVideos') }}
            </button>
            <button class="btn-secondary px-4 py-2 text-sm">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="text-center mt-12">
      <button class="btn-secondary px-8 py-3">
        <i class="fas fa-spinner mr-2"></i>{{ $t('challenges.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeFilter = ref('trending')

const filters = [
  { id: 'trending', label: 'challenges.filters.trending', icon: 'fas fa-fire' },
  { id: 'new', label: 'challenges.filters.new', icon: 'fas fa-sparkles' },
  { id: 'dance', label: 'challenges.filters.dance', icon: 'fas fa-music' },
  { id: 'comedy', label: 'challenges.filters.comedy', icon: 'fas fa-laugh' },
  { id: 'food', label: 'challenges.filters.food', icon: 'fas fa-utensils' }
]

const featuredChallenge = ref({
  id: 'featured',
  name: '#SilhouetteChallenge',
  description: 'Show your creativity with stunning silhouette shots using creative lighting and poses',
  banner: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop',
  participants: 8900000,
  views: 2400000000,
  hashtag: 'silhouettechallenge'
})

const challenges = ref([
  {
    id: 1,
    name: 'Buss It Challenge',
    description: 'Drop it low when the beat drops! Show your best moves to this viral song',
    thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    hashtag: 'BussItChallenge',
    participants: 12400000,
    views: 890000000,
    difficulty: 'medium',
    category: 'dance',
    daysLeft: 15,
    creator: {
      name: 'DanceQueen',
      avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    }
  },
  {
    id: 2,
    name: 'Cooking Hack Challenge',
    description: 'Share your most mind-blowing kitchen hacks that save time and effort',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    hashtag: 'CookingHacks',
    participants: 5600000,
    views: 450000000,
    difficulty: 'easy',
    category: 'food',
    daysLeft: 8,
    creator: {
      name: 'ChefMaster',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 3,
    name: 'Pet Transformation',
    description: 'Show your pet\'s amazing before and after transformation or makeover',
    thumbnail: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    hashtag: 'PetTransformation',
    participants: 3200000,
    views: 280000000,
    difficulty: 'easy',
    category: 'comedy',
    daysLeft: 22,
    creator: {
      name: 'PetLover',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 4,
    name: 'Invisible Box Challenge',
    description: 'Master the art of stepping over an invisible box - harder than it looks!',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    hashtag: 'InvisibleBox',
    participants: 7800000,
    views: 620000000,
    difficulty: 'hard',
    category: 'trending',
    daysLeft: 5,
    creator: {
      name: 'TrickMaster',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 5,
    name: 'Outfit Transition',
    description: 'Show off your style with smooth outfit transitions that wow your audience',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    hashtag: 'OutfitTransition',
    participants: 9100000,
    views: 750000000,
    difficulty: 'medium',
    category: 'new',
    daysLeft: 12,
    creator: {
      name: 'StyleGuru',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 6,
    name: 'Wholesome Content',
    description: 'Spread positivity with heartwarming and wholesome content that makes people smile',
    thumbnail: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=300&fit=crop',
    hashtag: 'WholesomeContent',
    participants: 4700000,
    views: 320000000,
    difficulty: 'easy',
    category: 'trending',
    daysLeft: 18,
    creator: {
      name: 'GoodVibes',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face'
    }
  }
])

const filteredChallenges = computed(() => {
  if (activeFilter.value === 'trending') {
    return challenges.value.sort((a, b) => b.participants - a.participants)
  } else if (activeFilter.value === 'new') {
    return challenges.value.filter(c => c.category === 'new' || c.daysLeft > 10)
  } else {
    return challenges.value.filter(c => c.category === activeFilter.value)
  }
})

const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500 text-white'
    case 'medium':
      return 'bg-yellow-500 text-white'
    case 'hard':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
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
  // Could fetch challenges data from an API here
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