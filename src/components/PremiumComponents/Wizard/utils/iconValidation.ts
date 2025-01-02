import { IconValidation } from '../types';

export const validateIcon = async (
  file: File,
  validation: IconValidation
): Promise<{ isValid: boolean; error?: string }> => {
  // Check file size
  if (file.size > validation.maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${validation.maxSize / 1024}KB`
    };
  }

  // Check file type
  if (!validation.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be one of: ${validation.allowedTypes.join(', ')}`
    };
  }

  // Check dimensions
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      if (
        img.width !== validation.dimensions.width ||
        img.height !== validation.dimensions.height
      ) {
        resolve({
          isValid: false,
          error: `Image dimensions must be ${validation.dimensions.width}x${validation.dimensions.height}px`
        });
      }
      resolve({ isValid: true });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        isValid: false,
        error: 'Invalid image file'
      });
    };

    img.src = url;
  });
};
