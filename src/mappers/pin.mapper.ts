import { PinDetail, PinPreview, PinUploaded, PixabayImage } from '../interfaces/pin.interface';

export function PixabayToPinDetail({
  webformatURL: img,
  user: userName,
  userImageURL: userProfile,
  tags,
  id,
  ...commonData
}: PixabayImage): PinDetail {
  return {
    ...commonData,
    id: id.toString(),
    img,
    tags: tags.split(', '),
    userName,
    userProfile,
  };
}

export function PixabayArrayToPinPreviewArray(data: Array<PixabayImage>): Array<PinPreview> {
  return data.map(PixabayToPinPreview);
}

export function PixabayToPinPreview({
  id,
  webformatURL: img,
  views,
  webformatHeight: height,
  webformatWidth: width,
}: PixabayImage): PinPreview {
  return {
    id: id.toString(),
    img,
    views,
    height,
    width,
  };
}

export function PinUploadedToPinPreview({
  height,
  width,
  img,
  id,
  views,
}: PinUploaded): PinPreview {
  return {
    height,
    width,
    img,
    id,
    views,
  };
}

export function PinUploadedToPinDetail({
  img,
  id,
  likes,
  downloads,
  userName,
  userProfile,
  tags,
}: PinUploaded): PinDetail {
  return {
    img,
    id,
    likes,
    comments: 0,
    downloads,
    tags,
    userName,
    userProfile,
  };
}

export function PinUploadedArrayToPinPreviewArray(data: PinUploaded[]): PinPreview[] {
  return data.map(PinUploadedToPinPreview);
}
