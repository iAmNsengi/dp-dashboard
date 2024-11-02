import React, { useState } from "react";
import { getImageUrl } from "../../utils/imageUrl";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  fallback = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
  alt = "",
  className = "",
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallback : getImageUrl(src)}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};
