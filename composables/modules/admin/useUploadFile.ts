import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useUploadFile = () => {
  const loading = ref(false);
  const uploadedFileUrl = ref('');
  const { showToast } = useCustomToast();

  const uploadFile = async (file: File) => {
    loading.value = true;
    uploadedFileUrl.value = '';
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      const res = (await admin_api.$_upload_file(formData)) as any;
      console.log(res, 'upload res')
      
      if (res.type !== "ERROR") {
        uploadedFileUrl.value = res.data.data || '';
        
        showToast({
          title: "Success",
          message: "File was uploaded successfully!",
          toastType: "success",
          duration: 3000,
        });
        
        return uploadedFileUrl.value;
      } else {
        showToast({
          title: "Error",
          message: res.message || "Failed to upload file",
          toastType: "error",
          duration: 5000,
        });
        return '';
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "An unexpected error occurred during upload",
        toastType: "error",
        duration: 5000,
      });
      return '';
    } finally {
      loading.value = false;
    }
  };

  return {
    uploadFile,
    loading,
    uploadedFileUrl
  };
};