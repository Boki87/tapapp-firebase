import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState, useEffect } from 'react'
import { storage } from './firebase';
import { v4 as uuid } from 'uuid';


export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export function useUploadImages() {


  const [uploading, setUploading] = useState(false)
  const [storageRefs, setStorageRefs] = useState([])
  const [urls, setUrls] = useState([])
  const [files, setFiles] = useState([])

  async function uploadImages(images, dest) {
    setUploading(true)
    const refs = []
    const imagesArray = Array.from(images)
    for (let i = 0; i < imagesArray.length; i++) {
      let image = imagesArray[i]
      const uid = uuid()
      let ext = "." + image.name.split(".").pop();
      const imageRef = ref(storage, `${dest}/${uid}${ext}`)
      const uploadRes = await uploadBytes(imageRef, image)
      let uploadUrl = await getDownloadURL(imageRef)
      refs.push({
        ref: imageRef,
        url: uploadUrl
      })
      setUrls(() => refs.map(r => r.url))
    }

    setStorageRefs(refs)
    setUploading(false)
    return refs.map(r => r.url)
  }


  return {
    uploadImages,
    storageRefs,
    urls,
    uploading
  }
}