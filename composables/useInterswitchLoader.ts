// composables/useInterswitchLoader.ts
import { ref } from 'vue';

export function useInterswitchLoader() {
  const isScriptLoaded = ref(false);

  const loadScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window.InlineCheckout !== 'undefined') {
        isScriptLoaded.value = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://newwebpay.qa.interswitchng.com/inline-checkout.js';
      script.async = true;
      script.onload = () => {
        isScriptLoaded.value = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Interswitch script failed to load.'));
      document.head.appendChild(script);
    });
  };

  return { isScriptLoaded, loadScript };
}
