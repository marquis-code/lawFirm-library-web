// composables/useDeleteAccount.ts
import { ref } from 'vue';
import { auth_api } from '@/api_factory/modules/auth';
import { useUser } from '@/composables/auth/user';
import { useInitiateDeleteAccount } from '@/composables/modules/settings/useInitiateDeleteAccount';
import { useRouter } from 'vue-router';

const router = useRouter();

export const useDeleteAccount = () => {
  const currentStep = ref<number>(1);
  const { user } = useUser();
  const isLoading = ref<boolean>(false);
  const userEmail = ref<string>('');
  const deleteReason = ref<string>('');
  const isEmailValid = ref<boolean>(false);
  const { initiateDeleteAccount, loading, payload, setPayload } = useInitiateDeleteAccount();

  const validateEmail = (email: string) => {
    return user.value.email === email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (email: string) => {
    userEmail.value = email;
    isEmailValid.value = validateEmail(email);

    // Update payload value with the email
    payload.value.email = email;
  };

  const submitDeletion = async () => {
    isLoading.value = true;
    try {
      const res = await auth_api.$_delete_account({
        email: userEmail.value,
        reason: deleteReason.value,
      });

      if (res.type !== 'ERROR') {
        router.push('/delete-account-success');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    currentStep,
    isLoading,
    userEmail,
    deleteReason,
    isEmailValid,
    handleEmailChange,
    submitDeletion,
    initiateDeleteAccount,
    loading,
  };
};
