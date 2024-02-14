// src/services/GalleryService.ts
import axios from 'axios';
import { PinUploaded, PixabayImage } from '../interfaces/pin.interface';
import { PinSize } from '../enums/pin.enum';
import { uploadFile } from '../utils/firebase.config';
import { PATHS_STORAGE } from '../enums/firebase.enum';
import pinRepository from '../repositories/pin.repository';

const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

class GalleryService {
  private static BASE_URL = 'https://pixabay.com/api/';
  public PER_PAGE = 20;

  async searchImagesByTag(tag: string, page: number): Promise<PixabayImage[]> {
    try {
      const response = await axios.get(this.buildUrl(''), {
        params: {
          key: PIXABAY_API_KEY,
          q: tag,
          per_page: this.PER_PAGE,
          page,
          now: new Date(),
        },
      });

      return response.data.hits;
    } catch (error) {
      console.error('Error al buscar imágenes por tag en Pixabay:', error);
      return [];
    }
  }

  async getImages(page: number): Promise<PixabayImage[]> {
    try {
      const response = await axios.get(this.buildUrl(''), {
        params: {
          key: PIXABAY_API_KEY,
          per_page: this.PER_PAGE,
          page,
          now: new Date(),
        },
      });

      return response.data.hits;
    } catch (error) {
      console.error('Error al obtener imágenes de Pixabay:', error);
      return [];
    }
  }

  async getImageDetails(imageId: string): Promise<PixabayImage | null> {
    try {
      const response = await axios.get(this.buildUrl(``), {
        params: {
          key: PIXABAY_API_KEY,
          id: imageId,
        },
      });

      return response.data.hits[0] || null;
    } catch (error) {
      console.error('Error al obtener detalles de la imagen de Pixabay:', error);
      return null;
    }
  }

  async createNewPin(file: File, data: Omit<PinUploaded, 'id' | 'img'>) {
    const img = await uploadFile(file, PATHS_STORAGE.PINS);
    const pin: Omit<PinUploaded, 'id'> = {
      img,
      ...data,
    };
    await pinRepository.createDocument(pin);
  }
  getImageSize(width: number, height: number): PinSize {
    const aspectRatio = width / height;
    const smallThreshold = 1.5;
    const mediumThreshold = 0.8;
    if (aspectRatio > smallThreshold) {
      return PinSize.SMALL;
    } else if (aspectRatio > mediumThreshold) {
      return PinSize.MEDIUM;
    } else {
      return PinSize.LARGE;
    }
  }

  private buildUrl(endpoint: string): string {
    return `${GalleryService.BASE_URL}${endpoint}`;
  }
}

export default new GalleryService();
