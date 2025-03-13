<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-green-700 text-white flex flex-col">
      <!-- Logo -->
      <div class="p-4 border-b border-green-600">
        <div class="flex items-center">
          <img src="@/assets/icons/logo.svg" alt="Rocksmith Chambers Logo" class="h-10 mr-2" />
          <div>
            <div class="text-sm font-medium">Rocksmith Chambers</div>
            <div class="text-xs text-green-300">Law Library.</div>
          </div>
        </div>
      </div>
      
      <!-- User Profile -->
      <div class="p-4 border-b border-green-600 flex flex-col items-center">
        <div class="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-white">
          <img src="@/assets/img/male-avatar.png" alt="User Profile" class="w-full h-full object-cover" />
        </div>
        <div class="text-center">
          <div class="font-medium">{{ user.name }}</div>
          <div class="text-sm text-green-300">{{ user.role }}</div>
        </div>
      </div>
      
      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto py-4">
        <div class="px-4 mb-4 text-sm font-medium text-green-300">Main</div>
        
        <nav class="space-y-1">
          <NuxtLink 
            to="/dashboard" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path === '/dashboard' }"
          >
            <LayoutDashboardIcon class="h-5 w-5 mr-3" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/users" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path === '/dashboard/users' }"
          >
            <UserIcon class="h-5 w-5 mr-3" />
            User
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/books" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path.includes('/dashboard/books') }"
          >
            <BookOpenIcon class="h-5 w-5 mr-3" />
            Books
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/law-reports" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path.includes('/dashboard/law-reports') }"
          >
            <ScaleIcon class="h-5 w-5 mr-3" />
            Law report
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/articles" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path.includes('/dashboard/articles') }"
          >
            <FileTextIcon class="h-5 w-5 mr-3" />
            Article/Journal
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/client-files" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path.includes('/dashboard/client-files') }"
          >
            <FolderIcon class="h-5 w-5 mr-3" />
            Client files
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/statues" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path.includes('/dashboard/statues') }"
          >
            <LandmarkIcon class="h-5 w-5 mr-3" />
            Statues
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard/profile" 
            class="flex items-center px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            :class="{ 'bg-green-600': $route.path === '/dashboard/profile' }"
          >
            <UserCircleIcon class="h-5 w-5 mr-3" />
            Profile
          </NuxtLink>
        </nav>
      </div>
      
      <!-- Logout -->
      <div class="p-4 border-t border-green-600">
        <button 
          @click="logout" 
          class="flex items-center w-full px-4 py-2 text-sm hover:bg-green-600 transition-colors rounded"
        >
          <LogOutIcon class="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm z-10">
        <div class="flex items-center justify-between px-6 py-4">
          <h1 class="text-2xl font-medium text-green-700">{{ pageTitle }}</h1>
          
          <div class="flex items-center">
            <NuxtLink to="/" class="text-green-700 hover:text-green-600 mr-4">Home</NuxtLink>
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                class="w-64 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  LayoutDashboardIcon, 
  UserIcon, 
  BookOpenIcon, 
  ScaleIcon, 
  FileTextIcon, 
  FolderIcon, 
  LandmarkIcon, 
  UserCircleIcon, 
  LogOutIcon,
  SearchIcon
} from 'lucide-vue-next';
import { useLibraryStore } from '~/stores/library';

const route = useRoute();
const router = useRouter();
const libraryStore = useLibraryStore();

// User data
const user = ref({
  name: 'Micheal George',
  role: 'Admin',
  avatar: '/images/profile.jpg'
});

// Page title based on route
const pageTitle = computed(() => {
  const path = route.path;
  if (path === '/dashboard') return 'Dashboard';
  if (path === '/dashboard/users') return 'Users';
  if (path === '/dashboard/books') return 'Books';
  if (path === '/dashboard/law-reports') return 'Law Reports';
  if (path === '/dashboard/articles') return 'Articles';
  if (path === '/dashboard/client-files') return 'Client Files';
  if (path === '/dashboard/statues') return 'Statues';
  if (path === '/dashboard/profile') return 'Profile';
  return 'Dashboard';
});

// Edit modal state
const showEditModal = computed(() => libraryStore.showEditModal);
const currentItem = computed(() => libraryStore.currentItem);
const currentItemType = computed(() => libraryStore.currentItemType);

// Methods
const logout = () => {
  // Handle logout logic
  router.push('/login');
};

const closeEditModal = () => {
  libraryStore.closeEditModal();
};

const saveItem = (item: any) => {
  libraryStore.updateItem(item);
  libraryStore.closeEditModal();
};
</script>