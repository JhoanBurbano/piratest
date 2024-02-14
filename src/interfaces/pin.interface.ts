export interface PixabayImage {
  id: number;
  tags: string;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user: string;
  userImageURL: string;
}

export interface PinUploaded {
  id: string;
  tags: string[];
  img: string;
  userProfile: string;
  userName: string;
  width: number;
  height: number;
  downloads: number;
  likes: number;
  views: number;
  createdAt: Date;
}

export interface PinDetail {
  id: string;
  tags: string[];
  img: string;
  downloads: number;
  likes: number;
  comments: number;
  userName: string;
  userProfile: string;
}

export type PinPreview = Pick<PinDetail, 'id' | 'img'> &
  Pick<PixabayImage, 'views'> & { width: number; height: number };
