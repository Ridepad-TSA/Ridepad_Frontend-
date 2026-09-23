'use client';

import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';

const COMPRESSION = { maxSizeMB: 1, maxWidthOrHeight: 1600, useWebWorker: true };
const MAX_RETRIES = 3;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let nextId = 0;

/**
 * Compresses images, requests a signed URL per file and uploads with progress.
 * Assumes POST /uploads/sign -> { uploadUrl, fileUrl, headers? } and a PUT upload.
 *
 * const { upload, files, isUploading, reset } = useUpload({ purpose: 'car_photo' });
 * const results = await upload(fileList); // [{ name, url } | { name, error }]
 */
export default function useUpload({ purpose } = {}) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const controllers = useRef(new Set());

  const patch = useCallback((id, changes) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...changes } : f)));
  }, []);

  const uploadOne = useCallback(
    async (entry) => {
      patch(entry.id, { status: 'compressing' });
      const file = entry.file.type.startsWith('image/')
        ? await imageCompression(entry.file, COMPRESSION)
        : entry.file;

      let lastError;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
        if (attempt > 0) await wait(500 * 2 ** (attempt - 1));
        const controller = new AbortController();
        controllers.current.add(controller);
        try {
          patch(entry.id, { status: 'uploading', progress: 0, attempts: attempt + 1 });

          // Fresh signed URL each attempt in case the previous one expired.
          const { data: signed } = await api.post(
            '/uploads/sign',
            { fileName: entry.file.name, contentType: file.type, size: file.size, purpose },
            { signal: controller.signal },
          );

          // Plain axios: the signed URL must not receive our bearer token.
          await axios.put(signed.uploadUrl, file, {
            headers: { 'Content-Type': file.type, ...signed.headers },
            signal: controller.signal,
            onUploadProgress: (e) => {
              if (e.total) patch(entry.id, { progress: Math.round((e.loaded / e.total) * 100) });
            },
          });

          patch(entry.id, { status: 'done', progress: 100, url: signed.fileUrl, error: null });
          return { name: entry.file.name, url: signed.fileUrl };
        } catch (error) {
          lastError = error;
          if (controller.signal.aborted) break;
        } finally {
          controllers.current.delete(controller);
        }
      }

      const message = lastError?.message || 'Upload failed.';
      patch(entry.id, { status: 'error', error: message });
      return { name: entry.file.name, error: message };
    },
    [patch, purpose],
  );

  const upload = useCallback(
    async (fileList) => {
      const entries = Array.from(fileList ?? []).map((file) => ({
        id: `upload-${(nextId += 1)}`,
        file,
        name: file.name,
        status: 'queued',
        progress: 0,
        attempts: 0,
        url: null,
        error: null,
      }));
      if (!entries.length) return [];

      setFiles((prev) => [...prev, ...entries]);
      setIsUploading(true);
      try {
        return await Promise.all(
          entries.map((entry) =>
            uploadOne(entry).catch((error) => {
              // Compression failures land here; uploads handle their own errors.
              const message = error?.message || 'Could not process this file.';
              patch(entry.id, { status: 'error', error: message });
              return { name: entry.file.name, error: message };
            }),
          ),
        );
      } finally {
        setIsUploading(false);
      }
    },
    [uploadOne, patch],
  );

  const cancel = useCallback(() => {
    controllers.current.forEach((c) => c.abort());
    controllers.current.clear();
  }, []);

  const reset = useCallback(() => {
    cancel();
    setFiles([]);
  }, [cancel]);

  return { upload, files, isUploading, cancel, reset };
}
