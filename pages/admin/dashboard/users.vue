<template>
  <div class="user-management">
    <!-- Add New User Button -->
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800 hidden sm:block">User Management</h1>
      <button 
        @click="openAddModal" 
        class="flex items-center bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        <span>Add New User</span>
      </button>
    </div>
    
    <!-- Search and Filter -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="relative flex-grow">
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Search users..." 
          class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
        />
        <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button 
          v-if="searchTerm" 
          @click="searchTerm = ''" 
          class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <XCircleIcon class="h-5 w-5" />
        </button>
      </div>
      <div class="flex items-center">
        <label class="mr-2 text-sm text-gray-600">Per page:</label>
        <select 
          v-model="itemsPerPage" 
          class="border border-gray-300 rounded-xl px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>
    
    <!-- Users Table Card -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-medium text-green-700">Users</h2>
        <span class="text-sm text-gray-500">{{ filteredUsers.length }} total users</span>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="py-20 flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div class="w-16 h-16 rounded-full border-4 border-gray-200 border-t-green-700 animate-spin"></div>
        <p class="text-gray-500 font-medium">Loading users...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredUsers.length === 0" class="py-20 flex flex-col items-center justify-center space-y-4 animate-fade-in">
        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <UsersIcon class="h-10 w-10 text-gray-400" />
        </div>
        <div class="text-center">
          <p class="text-gray-500 font-medium">No users found</p>
          <p class="text-gray-400 text-sm mt-1">
            {{ searchTerm ? 'Try adjusting your search term' : 'Add a new user to get started' }}
          </p>
        </div>
        <button 
          v-if="!searchTerm"
          @click="openAddModal" 
          class="mt-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition-all duration-300"
        >
          Add User
        </button>
      </div>
      
      <!-- Users Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(user, index) in paginatedUsers" 
              :key="index"
              class="hover:bg-gray-50 transition-all duration-150"
              :class="{'animate-highlight': highlightedUserId === user.id}"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ startIndex + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3">
                    {{ getInitials(user) }}
                  </div>
                  <span v-if="user?.firstname?.length || user?.lastname?.length">
                    {{ user.firstname }} {{ user.lastname }}
                  </span>
                  <span v-else>Nil</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user?.email ?? 'Nil' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user?.phone ?? 'Nil' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button 
                    @click="viewUser(user)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center"
                  >
                    <EyeIcon class="h-3.5 w-3.5 mr-1" />
                    View
                  </button>
                  <button 
                    @click="editUser(user)"
                    class="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center"
                  >
                    <EditIcon class="h-3.5 w-3.5 mr-1" />
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredUsers.length > 0" class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeftIcon class="h-4 w-4 mr-1" />
            Previous
          </button>
          <div class="mx-2 flex items-center">
            <span class="text-sm text-gray-700">{{ currentPage }} / {{ totalPages }}</span>
          </div>
          <button 
            @click="nextPage" 
            :disabled="currentPage >= totalPages"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <ChevronRightIcon class="h-4 w-4 ml-1" />
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredUsers.length }}</span> users
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="goToPage(1)" 
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="First page"
              >
                <span class="sr-only">First page</span>
                <ChevronsLeftIcon class="h-4 w-4" />
              </button>
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="Previous page"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-4 w-4" />
              </button>
              
              <button 
                v-for="page in displayedPages" 
                :key="page" 
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200',
                  currentPage === page 
                    ? 'z-10 bg-green-50 border-green-500 text-green-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              
              <button 
                @click="nextPage" 
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="Next page"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-4 w-4" />
              </button>
              <button 
                @click="goToPage(totalPages)" 
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="Last page"
              >
                <span class="sr-only">Last page</span>
                <ChevronsRightIcon class="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    
    <!-- User Modal -->
    <Transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop with blur effect -->
        <div 
          class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          @click="closeModal"
        ></div>
        
        <!-- Modal Content -->
        <div 
          class="bg-white rounded-xl shadow-2xl w-full max-w-md z-10 relative transform transition-all duration-300 ease-out overflow-hidden"
          :class="{ 'scale-100 opacity-100': showModal, 'scale-95 opacity-0': !showModal }"
        >
          <!-- Modal Header -->
          <div class="bg-green-700 text-white p-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">
                {{ isEditing ? 'Edit User' : (isViewing ? 'User Details' : 'Add New User') }}
              </h2>
              <button 
                @click="closeModal" 
                class="text-white hover:text-gray-200 transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <XIcon class="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <!-- User Avatar -->
          <div class="flex justify-center -mt-10">
            <div class="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center text-green-700 text-xl font-bold border-4 border-white">
              {{ getInitials(currentUser) }}
            </div>
          </div>
          
          <!-- Form Content -->
          <div class="p-6 pt-4">
            <form @submit.prevent="submitForm" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    v-model="currentUser.firstname" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    v-model="currentUser.lastname" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
              </div>
              
              <div v-if="!isEditing">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="currentUser.email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  :disabled="isViewing"
                  :class="{'bg-gray-50': isViewing}"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  v-model="currentUser.phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  :disabled="isViewing"
                  :class="{'bg-gray-50': isViewing}"
                  required
                />
              </div>
              
              <div v-if="!isEditing && !isViewing">
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div class="relative">
                  <input 
                    v-model="currentUser.password" 
                    :type="showPassword ? 'text' : 'password'" 
                    class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    required
                  />
                  <button 
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                  >
                    <EyeIcon v-if="showPassword" class="h-5 w-5" />
                    <EyeOffIcon v-else class="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <!-- Form Actions -->
              <div class="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button 
                  type="button" 
                  @click="closeModal" 
                  class="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {{ isViewing ? 'Close' : 'Cancel' }}
                </button>
                <button 
                  v-if="!isViewing"
                  type="submit" 
                  class="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  :disabled="adding || updating"
                >
                  <LoaderIcon v-if="adding || updating" class="animate-spin h-4 w-4 mr-2" />
                  {{ isEditing ? 'Update User' : 'Add User' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="toast.show" 
        class="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 flex items-center max-w-md border-l-4 transform transition-all duration-300"
        :class="{
          'border-green-500': toast.type === 'success',
          'border-red-500': toast.type === 'error'
        }"
      >
        <div 
          class="rounded-full p-2 mr-3"
          :class="{
            'bg-green-100 text-green-500': toast.type === 'success',
            'bg-red-100 text-red-500': toast.type === 'error'
          }"
        >
          <CheckIcon v-if="toast.type === 'success'" class="h-5 w-5" />
          <AlertTriangleIcon v-else class="h-5 w-5" />
        </div>
        <div>
          <h3 class="font-medium text-gray-900">{{ toast.title }}</h3>
          <p class="text-sm text-gray-600">{{ toast.message }}</p>
        </div>
        <button 
          @click="toast.show = false" 
          class="ml-auto text-gray-400 hover:text-gray-500"
        >
          <XIcon class="h-5 w-5" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { 
  PlusIcon, XIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon, 
  LoaderIcon, EyeIcon, EyeOffIcon, EditIcon, UsersIcon, CheckIcon, 
  AlertTriangleIcon, XCircleIcon, ChevronsLeftIcon, ChevronsRightIcon 
} from 'lucide-vue-next';
import { useGetUsers } from '@/composables/modules/admin/users/useGetUsers';
import { useAddUser } from '@/composables/modules/admin/users/useAddUser';
import { useUpdateUser } from '@/composables/modules/admin/users/useUpdateUser';

// Composables
const { users, loading } = useGetUsers();
const { addUser, loading: adding } = useAddUser();
const { updateUser, loading: updating } = useUpdateUser();
const showPassword = ref(false);

// Modal state
const showModal = ref(false);
const isEditing = ref(false);
const isViewing = ref(false);
const currentUser = ref({
  id: '',
  uuid: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: ''
});

// Toast notification
const toast = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
  timeout: null as number | null
});

const showToast = (type: 'success' | 'error', title: string, message: string) => {
  // Clear any existing timeout
  if (toast.value.timeout) {
    clearTimeout(toast.value.timeout);
  }
  
  // Set toast data
  toast.value = {
    show: true,
    type,
    title,
    message,
    timeout: setTimeout(() => {
      toast.value.show = false;
    }, 5000) as unknown as number
  };
};

// Highlight newly added or updated user
const highlightedUserId = ref('');
const highlightUser = (userId: string) => {
  highlightedUserId.value = userId;
  setTimeout(() => {
    highlightedUserId.value = '';
  }, 3000);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Search and pagination
const searchTerm = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Computed properties for pagination
const filteredUsers = computed(() => {
  if (!users.value) return [];
  
  return users.value.filter(user => {
    const fullName = `${user.firstname || ''} ${user.lastname || ''}`.toLowerCase();
    const searchLower = searchTerm.value.toLowerCase();
    
    return fullName.includes(searchLower) || 
           (user.email?.toLowerCase() || '').includes(searchLower) ||
           (user.phone || '').includes(searchLower);
  });
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredUsers.value.length / itemsPerPage.value));
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredUsers.value.length);
});

const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  
  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// Get user initials for avatar
const getInitials = (user: any) => {
  if (!user) return '?';
  
  const first = user.firstname?.charAt(0) || '';
  const last = user.lastname?.charAt(0) || '';
  
  if (!first && !last) return '?';
  return (first + last).toUpperCase();
};

// Methods
const openAddModal = () => {
  currentUser.value = {
    id: '',
    uuid: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  };
  isEditing.value = false;
  isViewing.value = false;
  showModal.value = true;
};

const editUser = (user: any) => {
  currentUser.value = { ...user };
  isEditing.value = true;
  isViewing.value = false;
  showModal.value = true;
};

const viewUser = (user: any) => {
  currentUser.value = { ...user };
  isEditing.value = false;
  isViewing.value = true;
  showModal.value = true;
};

const closeModal = () => {
  // Add closing animation
  showModal.value = false;
};

const submitForm = async () => {
  try {
    if (isEditing.value) {
      const payloadObj = {
        firstname: currentUser.value.firstname,
        lastname: currentUser.value.lastname, // Fixed typo from original code
        phone: currentUser.value.phone,
        id: currentUser.value.uuid
      };
      await updateUser(payloadObj);
      showToast('success', 'User Updated', 'User information has been updated successfully');
      highlightUser(currentUser.value.id);
    } else {
      const { id, uuid, ...rest } = currentUser.value;
      await addUser(rest);
      showToast('success', 'User Added', 'New user has been added successfully');
      
      // Reset pagination to first page to show the new user
      currentPage.value = 1;
      
      // Highlight the new user (after data refresh)
      nextTick(() => {
        if (users.value && users.value.length > 0) {
          // Assuming the newest user is at the beginning of the array
          highlightUser(users.value[0].id);
        }
      });
    }
    closeModal();
  } catch (error) {
    console.error('Error submitting form:', error);
    showToast('error', 'Operation Failed', 'There was an error processing your request');
  }
};

// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Reset pagination when search term or items per page changes
watch([searchTerm, itemsPerPage], () => {
  currentPage.value = 1;
});

// Watch for changes in total pages and adjust current page if needed
watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = Math.max(1, newTotalPages);
  }
});

// Fetch users on component mount
onMounted(() => {
  // If your useGetUsers doesn't automatically fetch on mount, call it here
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-highlight {
  animation: highlight 3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes highlight {
  0%, 100% { background-color: transparent; }
  20%, 80% { background-color: rgba(16, 185, 129, 0.1); }
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-  0, 0.2, 1);
}

/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .user-management {
    padding: 0 0.5rem;
  }
  
  table {
    font-size: 0.875rem;
  }
  
  th, td {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>