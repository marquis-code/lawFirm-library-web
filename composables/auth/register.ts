import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

import { useRouter, useNuxtApp } from "#imports";
const credential = {
  fullName: ref(""),
  email: ref(""),
  password: ref(""),
  confirmPassword: ref(""),
  agreement: ref(false)
};

export const use_auth_register = () => {
  const loading = ref(false);
  const router = useRouter();

  const register = async () => {
    loading.value = true;
    const nameParts = credential.fullName.value.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const sessionPayload = {
      firstName: firstName,
      lastName: lastName || firstName,
      email: credential.email.value,
      password: credential.password.value,
    }

    try {
      const res = await auth_api.$_verify_email({
        email: credential.email.value
      }) as any;

      loading.value = false;

      if (res.type !== "ERROR") {
        console.log(res, 'here')
        sessionStorage.setItem('auth-payload', JSON.stringify(sessionPayload))
        router.push(`/verify-email?email=${credential.email.value}&referrer=signup`);
      } else {
        showToast({
          title: "Error",
          message: res.data.error,
          toastType: "error",
          duration: 3000
        });
      }
    } catch (error) {
      loading.value = false;
      showToast({
        title: "Error",
        message: 'Registration failed. Please try again',
        toastType: "error",
        duration: 3000
      });
    }
  };

  // Computed properties for validation
const passwordMismatch = computed(() => {
  return credential.password.value !== credential.confirmPassword.value;
});

const populateObj = (data: any) => {
   credential.fullName.value = data.fullName
   credential.email.value = data.email
   credential.password.value = data.password
   credential.confirmPassword.value = data.confirmPassword
   credential.agreement.value = data.agreement
}

const isFormDisabled = computed(() => {
  return (
    loading.value ||
    !credential.agreement.value ||
    !credential.fullName.value ||
    !credential.password.value ||
    credential.password.value.length <= 6 ||  // Password length must be greater than 6 characters
    !credential.confirmPassword.value ||
    passwordMismatch.value
  );
});


  return { credential, register, loading, isFormDisabled, passwordMismatch, populateObj };
};
