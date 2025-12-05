/**
 * Builds a full image URL using the base image URL from environment variables
 * @param imagePath - The relative path or full URL of the image
 * @returns The complete image URL
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  // Get the base image URL from environment variable
  const baseImageUrl = import.meta.env.VITE_REACT_APP_IMAGE_URL;

  if (!baseImageUrl) {
    // If no base URL is configured, return the path as is (might be a relative path)
    return imagePath;
  }

  // Combine base URL and path
  return `${baseImageUrl}scamper/chapter/${imagePath}`;
};
