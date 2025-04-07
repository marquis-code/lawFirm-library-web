<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- {{adminProfileObj}} -->
    <!-- Overlay for mobile sidebar -->
    <Transition name="fade">
      <div 
        v-if="isSidebarOpen && isMobile" 
        class="fixed inset-0 bg-black bg-opacity-50 z-20"
        @click="toggleSidebar"
      ></div>
    </Transition>
    
    <!-- Sidebar -->
    <Transition name="slide">
      <div 
        :class="[
          'bg-green-700 text-white flex flex-col z-30',
          isMobile ? 'fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out' : 'w-64',
          {'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen && isMobile}
        ]"
      >
        <!-- Logo -->
        <div class="p-4 border-b border-green-600">
          <div class="flex items-center">
            <img src="@/assets/icons/logo.svg" alt="Rocksmith Chambers Logo" class="h-8 mr-2" />
            <button 
              v-if="isMobile" 
              @click="toggleSidebar" 
              class="ml-auto text-white hover:text-green-200 transition-colors"
              aria-label="Close sidebar"
            >
              <XIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <!-- User Profile -->
        <div class="p-4 border-b border-green-600 flex flex-col items-center">
          <!-- <div class="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow-md">
            <img 
              :src="user.avatar || '@/assets/img/male-avatar.png'" 
              alt="User Profile" 
              class="w-full h-full object-cover"
            />
          </div> -->
          <div v-if="adminProfileObj?.avatar" class="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img :src="adminProfileObj.avatar" alt="Profile Avatar" class="h-full w-full object-cover" />
              </div>
              <div v-else class="h-32 w-32 rounded-full border-4 border-white bg-green-100 flex items-center justify-center shadow-lg">
                <span class="text-4xl font-bold text-green-700">
                  {{ getInitials(adminProfileObj?.firstname, adminProfileObj?.lastname) }}
                </span>
            </div>
          <div class="text-center mt-4">
            <div class="font-medium">{{ user.name }}</div>
            <div class="text-sm text-green-300">{{ user.role }}</div>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="flex-1 overflow-y-auto py-4">
          <div class="px-4 mb-4 text-sm font-medium text-green-300">Main</div>
          
          <nav class="space-y-1">
            <NuxtLink 
              to="/admin/dashboard" 
              class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-all duration-200"
              :class="{ 'bg-green-600': $route.path === '/admin/dashboard' }"
              @click="isMobile && toggleSidebar()"
            >
              <LayoutDashboardIcon class="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/dashboard/users" 
              class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-all duration-200"
              :class="{ 'bg-green-600': $route.path === '/admin/dashboard/users' }"
              @click="isMobile && toggleSidebar()"
            >
              <UserIcon class="h-5 w-5 mr-3" />
              <span>Users</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/dashboard/book" 
              class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-all duration-200"
              :class="{ 'bg-green-600': $route.path.includes('/admin/dashboard/book') }"
              @click="isMobile && toggleSidebar()"
            >
              <BookOpenIcon class="h-5 w-5 mr-3" />
              <span>Books</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/dashboard/client-files" 
              class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-all duration-200"
              :class="{ 'bg-green-600': $route.path.includes('/admin/dashboard/client-files') }"
              @click="isMobile && toggleSidebar()"
            >
              <FolderIcon class="h-5 w-5 mr-3" />
              <span>Client Files</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/dashboard/profile" 
              class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-all duration-200"
              :class="{ 'bg-green-600': $route.path === '/admin/dashboard/profile' }"
              @click="isMobile && toggleSidebar()"
            >
              <UserCircleIcon class="h-5 w-5 mr-3" />
              <span>Profile</span>
            </NuxtLink>
          </nav>
        </div>
        
        <!-- Logout -->
        <div class="p-4 border-t border-green-600">
          <button 
            @click="logout" 
            class="flex items-center w-full px-4 py-2 text-sm hover:bg-green-600 transition-colors rounded group"
          >
            <LogOutIcon class="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </Transition>
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm z-10">
        <div class="flex items-center justify-between px-4 sm:px-6 py-4">
          <div class="flex items-center">
            <button 
              @click="toggleSidebar" 
              class="mr-4 text-green-700 hover:text-green-600 focus:outline-none lg:hidden"
              aria-label="Toggle sidebar"
            >
              <MenuIcon v-if="!isSidebarOpen" class="h-6 w-6 transition-transform duration-300" />
              <XIcon v-else class="h-6 w-6 transition-transform duration-300" />
            </button>
            <h1 class="text-xl sm:text-2xl font-medium text-green-700 truncate">{{ pageTitle }}</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-green-700 hover:text-green-600 hidden sm:block">
              <HomeIcon class="h-5 w-5" />
            </NuxtLink>
            
            <div class="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                class="w-48 lg:w-64 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div class="relative">
              <button 
                @click="isUserMenuOpen = !isUserMenuOpen" 
                class="flex items-center focus:outline-none"
              >
                <!-- <div class="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                  <img 
                    :src="user.avatar || '@/assets/img/male-avatar.png'" 
                    alt="User Profile" 
                    class="h-full w-full object-cover"
                  />
                </div>
                <ChevronDownIcon class="h-4 w-4 ml-1 text-gray-500" /> -->
                <div v-if="adminProfileObj?.avatar" class="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img :src="adminProfileObj.avatar" alt="Profile Avatar" class="h-full w-full object-cover" />
              </div>
                    <div v-else class="h-10 w-10 rounded-full border-4 border-white bg-green-100 flex items-center justify-center shadow-lg">
                      <span class="text-sm font-bold text-green-700">
                        {{ getInitials(adminProfileObj?.firstname, adminProfileObj?.lastname) }}
                      </span>
                  </div>
              </button>
              
              <!-- User dropdown menu -->
              <Transition name="dropdown">
                <div 
                  v-if="isUserMenuOpen" 
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
                >
                  <NuxtLink 
                    to="/admin/dashboard/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="isUserMenuOpen = false"
                  >
                    Your Profile
                  </NuxtLink>
                  <button 
                    @click="logout" 
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        
        <!-- Mobile Search -->
        <div class="px-4 pb-4 lg:hidden">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              class="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6">
        <slot />
      </main>
    </div>
    
    <!-- Edit Modal -->
    <EditModal 
      v-if="showEditModal" 
      :item="currentItem" 
      :type="currentItemType"
      @close="closeEditModal" 
      @save="saveItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useFetchProfile } from '@/composables/modules/admin/settings/useFetchProfile';
import { useRoute, useRouter } from 'vue-router';
import { 
  LayoutDashboardIcon, 
  UserIcon, 
  BookOpenIcon, 
  FolderIcon, 
  UserCircleIcon, 
  LogOutIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  ChevronDownIcon
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const { updateItem } = useLibrary();
const { showEditModal, currentItem, currentItemType, closeEditModal } = useModal();
const { adminProfileObj, loading } = useFetchProfile();

// User data
const user = ref({
  name: `${adminProfileObj.value?.firstname} ${adminProfileObj.value?.lastname}`,
  role: 'Admin',
  avatar: adminProfileObj.value?.avatar || '@/assets/img/male-avatar.png'
});

// Update user data when profile is loaded
watch(adminProfileObj, (newProfile) => {
  if (newProfile) {
    user.value.name =  `${adminProfileObj.value?.firstname} ${adminProfileObj.value?.lastname}`,
    user.value.avatar = newProfile.avatar || user.value.avatar;
  }
});

// Responsive sidebar
const isMobile = ref(false);
const isSidebarOpen = ref(true);
const isUserMenuOpen = ref(false);

// Check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  } else {
    isSidebarOpen.value = true;
  }
};

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Close user menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (isUserMenuOpen.value && !target.closest('.user-menu')) {
    isUserMenuOpen.value = false;
  }
};

// Page title based on route
const pageTitle = computed(() => {
  const path = route.path;
  if (path === '/admin/dashboard') return 'Dashboard';
  if (path === '/admin/dashboard/users') return 'Users';
  if (path === '/admin/dashboard/book') return 'Books';
  if (path === '/admin/dashboard/client-files') return 'Client Files';
  if (path === '/admin/dashboard/profile') return 'Profile';
  return 'Dashboard';
});

// Methods
const logout = () => {
  // Handle logout logic
  isUserMenuOpen.value = false;
  router.push('/admin');
};

const saveItem = (item: any) => {
  updateItem(item, currentItemType.value);
  closeEditModal();
};

// Lifecycle hooks
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  document.removeEventListener('click', handleClickOutside);
});

// Close sidebar when route changes on mobile
watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      isSidebarOpen.value = false;
    }
  }
);

  // Helper functions
  const getInitials = (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return 'U';
    
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    
    return `${firstInitial}${lastInitial}`;
  };
</script>

<style scoped>
/* Sidebar slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Fade animation for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Active link styles */
.router-link-active {
  background-color: rgba(16, 185, 129, 0.2);
  font-weight: 500;
}

/* Hover animations */
.hover\:bg-green-600:hover {
  background-color: rgba(5, 150, 105, 0.8);
  transform: translateX(4px);
}

/* Logout button animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .truncate {
    max-width: 200px;
  }
}
</style>