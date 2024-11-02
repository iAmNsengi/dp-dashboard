import { config } from "../config";

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path)
    return "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${config.BASE_URL}/${cleanPath}`;
};
