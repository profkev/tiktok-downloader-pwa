export interface TikTokVideo {
  id: string
  title: string
  author: string
  duration: number
  thumbnail: string
  videoUrl: string
  audioUrl?: string
  qualities: VideoQuality[]
}

export interface VideoQuality {
  quality: string
  url: string
  size?: number
  format: 'mp4' | 'mp3'
}

export interface DownloadOptions {
  quality: string
  format: 'video' | 'audio'
}

export interface DownloadProgress {
  percentage: number
  loaded: number
  total: number
  status: 'pending' | 'downloading' | 'completed' | 'error'
}

// PWA types
declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent
    'appinstalled': Event
  }
}

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}