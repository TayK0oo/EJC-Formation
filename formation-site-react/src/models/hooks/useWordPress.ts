// src/hooks/useWordPress.ts
import { useState, useEffect } from 'react';
import { getWordPressContent } from '../../services/wordpress';

export const useWordPressContent = (contentType: string) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getWordPressContent(contentType);
        setContent(data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType]);

  return { content, loading, error };
};