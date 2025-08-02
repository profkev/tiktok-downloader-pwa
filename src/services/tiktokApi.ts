import axios from 'axios'
import type { TikTokVideo, VideoQuality } from '@/types'

export class TikTokApi {
  private static readonly API_ENDPOINTS = {
    // Using popular free TikTok downloader APIs
    rapidapi: 'https://tiktok-scraper7.p.rapidapi.com/',
    alternative: 'https://tikwm.com/api/',
    backup: 'https://ssstik.io/abc'
  }

  static async getVideoInfo(url: string): Promise<TikTokVideo> {
    try {
      // Try TikWM API first (free and reliable)
      const response = await this.fetchFromTikWM(url)
      return response
    } catch (error) {
      console.error('TikWM API failed:', error)
      throw new Error('Failed to fetch video information. Please check the URL and try again.')
    }
  }

  private static async fetchFromTikWM(url: string): Promise<TikTokVideo> {
    const response = await axios.post(this.API_ENDPOINTS.alternative, {
      url: url,
      hd: 1
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (response.data.code !== 0) {
      throw new Error(response.data.msg || 'Failed to fetch video data')
    }

    const data = response.data.data
    const qualities: VideoQuality[] = []

    // Add video qualities
    if (data.hdplay) {
      qualities.push({
        quality: 'HD',
        url: data.hdplay,
        format: 'mp4'
      })
    }

    if (data.play) {
      qualities.push({
        quality: 'SD',
        url: data.play,
        format: 'mp4'
      })
    }

    // Add audio quality
    if (data.music) {
      qualities.push({
        quality: 'Audio',
        url: data.music,
        format: 'mp3'
      })
    }

    return {
      id: data.id || Date.now().toString(),
      title: data.title || 'TikTok Video',
      author: data.author?.nickname || 'Unknown',
      duration: data.duration || 0,
      thumbnail: data.cover || data.origin_cover || '',
      videoUrl: data.hdplay || data.play || '',
      audioUrl: data.music || '',
      qualities
    }
  }

  // Note: RapidAPI method available but not used in current implementation
  // Can be enabled by adding API key and calling this method as fallback
}