<template>
    <div class="min-h-screen  p-4 md:p-8">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Card -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <!-- Header with background -->
          <div class="bg-gradient-to-r from-green-700 to-green-900 h-32 relative">
            <!-- Avatar -->
            <div class="absolute -bottom-16 left-6 md:left-8">
              <div v-if="adminProfileObj?.avatar" class="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img :src="adminProfileObj.avatar" alt="Profile Avatar" class="h-full w-full object-cover" />
              </div>
              <div v-else class="h-32 w-32 rounded-full border-4 border-white bg-green-100 flex items-center justify-center shadow-lg">
                <span class="text-4xl font-bold text-green-700">
                  {{ getInitials(adminProfileObj?.firstname, adminProfileObj?.lastname) }}
                </span>
              </div>
            </div>
          </div>
  
          <!-- Profile Content -->
          <div class="pt-20 px-6 pb-6 md:px-8 md:pb-8">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 class="text-2xl font-bold text-gray-800">
                  {{ adminProfileObj?.firstname }} {{ adminProfileObj?.lastname }}
                </h1>
                <p class="text-gray-600">{{ adminProfileObj?.email }}</p>
              </div>
              <button 
                @click="openPasswordModal" 
                class="mt-4 md:mt-0 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                <LockIcon class="h-4 w-4 mr-2" />
                Update Password
              </button>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <!-- Profile Details -->
              <div class="space-y-4">
                <div class="border-b pb-2">
                  <h2 class="text-lg font-semibold text-gray-700 mb-4">Profile Information</h2>
                  
                  <div class="space-y-3">
                    <div>
                      <p class="text-sm text-gray-500">Full Name</p>
                      <p class="font-medium text-gray-800">{{ adminProfileObj?.firstname }} {{ adminProfileObj?.lastname }}</p>
                    </div>
                    
                    <div>
                      <p class="text-sm text-gray-500">Email Address</p>
                      <p class="font-medium text-gray-800">{{ adminProfileObj?.email }}</p>
                    </div>
                    
                    <div v-if="adminProfileObj?.phone">
                      <p class="text-sm text-gray-500">Phone Number</p>
                      <p class="font-medium text-gray-800">{{ adminProfileObj?.phone }}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 class="text-lg font-semibold text-gray-700 mb-4">Account Information</h2>
                  
                  <div class="space-y-3">
                    <div>
                      <p class="text-sm text-gray-500">Account Status</p>
                      <div class="flex items-center">
                        <span 
                          class="inline-block h-2 w-2 rounded-full mr-2" 
                          :class="adminProfileObj?.status === '0' ? 'bg-green-500' : 'bg-gray-400'"
                        ></span>
                        <p class="font-medium text-gray-800">
                          {{ adminProfileObj?.status === '0' ? 'Active' : 'Inactive' }}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p class="text-sm text-gray-500">Account Created</p>
                      <p class="font-medium text-gray-800">{{ formatDate(adminProfileObj?.createdAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Activity or Additional Info Section -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">Account Security</h2>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="bg-green-100 p-2 rounded-full mr-3">
                      <ShieldCheckIcon class="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800">Password Protection</h3>
                      <p class="text-sm text-gray-600">Your account is protected with a password. We recommend changing it regularly.</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="bg-green-100 p-2 rounded-full mr-3">
                      <AlertTriangleIcon class="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800">Security Tips</h3>
                      <p class="text-sm text-gray-600">Use a strong password and never share your login credentials with others.</p>
                    </div>
                  </div>
                  
                  <button 
                    @click="openPasswordModal" 
                    class="w-full mt-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
                  >
                    <LockIcon class="h-4 w-4 mr-2" />
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Password Update Modal -->
      <Transition name="modal">
        <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop with blur effect -->
          <div 
            class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
            @click="closePasswordModal"
          ></div>
  
          <!-- Modal Content -->
          <div 
            class="bg-white rounded-lg shadow-xl w-full max-w-md z-10 relative transform transition-all duration-300 ease-out"
            :class="{ 'scale-100 opacity-100': showPasswordModal, 'scale-95 opacity-0': !showPasswordModal }"
          >
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-medium text-gray-800">Update Password</h2>
                <button 
                  @click="closePasswordModal" 
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <XIcon class="h-6 w-6" />
                </button>
              </div>
  
              <form @submit.prevent="handlePasswordUpdate" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div class="relative">
                    <input 
                      v-model="passwordForm.current_password" 
                      :type="showCurrentPassword ? 'text' : 'password'" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      required
                    />
                    <button 
                      type="button" 
                      @click="showCurrentPassword = !showCurrentPassword" 
                      class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <EyeIcon v-if="!showCurrentPassword" class="h-5 w-5" />
                      <EyeOffIcon v-else class="h-5 w-5" />
                    </button>
                  </div>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div class="relative">
                    <input 
                      v-model="passwordForm.new_password" 
                      :type="showNewPassword ? 'text' : 'password'" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      required
                    />
                    <button 
                      type="button" 
                      @click="showNewPassword = !showNewPassword" 
                      class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <EyeIcon v-if="!showNewPassword" class="h-5 w-5" />
                      <EyeOffIcon v-else class="h-5 w-5" />
                    </button>
                  </div>
                  <p v-if="errors.samePassword" class="mt-1 text-sm text-red-600">
                    New password cannot be the same as current password
                  </p>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div class="relative">
                    <input 
                      v-model="passwordForm.confirm_password" 
                      :type="showConfirmPassword ? 'text' : 'password'" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      required
                    />
                    <button 
                      type="button" 
                      @click="showConfirmPassword = !showConfirmPassword" 
                      class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                      <EyeOffIcon v-else class="h-5 w-5" />
                    </button>
                  </div>
                  <p v-if="errors.passwordMatch" class="mt-1 text-sm text-red-600">
                    Passwords do not match
                  </p>
                </div>
  
                <div class="flex justify-end space-x-3 pt-4 border-t">
                  <button 
                    type="button" 
                    @click="closePasswordModal" 
                    class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    class="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors flex items-center"
                    :disabled="updating || !isFormValid"
                  >
                    <LoaderIcon v-if="updating" class="animate-spin h-4 w-4 mr-2" />
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useUpdatePassword } from '@/composables/modules/admin/settings/useUpdatePassword';
  import { useFetchProfile } from '@/composables/modules/admin/settings/useFetchProfile';
  import { 
    LockIcon, 
    XIcon, 
    EyeIcon, 
    EyeOffIcon, 
    ShieldCheckIcon, 
    AlertTriangleIcon,
    LoaderIcon
  } from 'lucide-vue-next';
  
  // Fetch profile data
  const { adminProfileObj, loading } = useFetchProfile();
  const { updatePassowrd, loading: updating, payload } = useUpdatePassword();
  
  // Password modal state
  const showPasswordModal = ref(false);
  const showCurrentPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);
  
  // Password form with validation
  const passwordForm = ref({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  // Form validation errors
  const errors = ref({
    samePassword: false,
    passwordMatch: false
  });
  
  // Check if form is valid
  const isFormValid = computed(() => {
    return (
      passwordForm.value.current_password.length > 0 &&
      passwordForm.value.new_password.length > 0 &&
      passwordForm.value.confirm_password.length > 0 &&
      !errors.value.samePassword &&
      !errors.value.passwordMatch
    );
  });
  
  // Watch for validation errors
  watch(() => passwordForm.value.new_password, (newVal) => {
    // Check if new password is same as current
    errors.value.samePassword = newVal === passwordForm.value.current_password && newVal !== '';
    
    // Check if passwords match
    if (passwordForm.value.confirm_password) {
      errors.value.passwordMatch = newVal !== passwordForm.value.confirm_password;
    }
  });
  
  watch(() => passwordForm.value.confirm_password, (newVal) => {
    // Check if passwords match
    errors.value.passwordMatch = newVal !== passwordForm.value.new_password && newVal !== '';
  });
  
  // Modal functions
  const openPasswordModal = () => {
    // Reset form
    passwordForm.value = {
      current_password: '',
      new_password: '',
      confirm_password: ''
    };
    errors.value = {
      samePassword: false,
      passwordMatch: false
    };
    showPasswordModal.value = true;
  };
  
  const closePasswordModal = () => {
    showPasswordModal.value = false;
  };
  
  // Handle password update
  const handlePasswordUpdate = async () => {
    // Validate form
    if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
      errors.value.passwordMatch = true;
      return;
    }
    
    if (passwordForm.value.current_password === passwordForm.value.new_password) {
      errors.value.samePassword = true;
      return;
    }
    
    // Update payload and submit
    payload.value.current_password = passwordForm.value.current_password;
    payload.value.new_password = passwordForm.value.new_password;
    
    await updatePassowrd();
    closePasswordModal();
  };
  
  // Helper functions
  const getInitials = (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return 'U';
    
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    
    return `${firstInitial}${lastInitial}`;
  };
  
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  definePageMeta({
    layout: 'dashboard'
})
  </script>
  
  <style scoped>
  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Modal transitions */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-from .bg-white,
  .modal-leave-to .bg-white {
    transform: scale(0.95);
    opacity: 0;
  }
  
  .modal-enter-active .bg-white,
  .modal-leave-active .bg-white {
    transition: all 0.3s ease;
  }
  </style>