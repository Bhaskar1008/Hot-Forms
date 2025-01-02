interface CurlOptions {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export const generateCurlCommand = ({ url, method, headers = {}, body }: CurlOptions): string => {
  const parts = [`curl -X ${method} '${url}'`];

  // Add headers
  Object.entries(headers).forEach(([key, value]) => {
    parts.push(`-H '${key}: ${value}'`);
  });

  // Add body if present
  if (body) {
    parts.push(`-d '${body}'`);
  }

  return parts.join(' \\\n  ');
};
