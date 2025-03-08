<template>
    <div class="flex h-screen bg-white">
      <!-- Sidebar -->
      <div 
        :class="[
          'bg-[#470A34] text-white w-64 flex flex-col transition-all duration-300 fixed md:relative h-full z-50',
          isMobileMenuOpen ? 'left-0' : '-left-64 md:left-0'
        ]"
      >
        <!-- Logo -->
        <div class="p-4 border-b border-purple-800 flex items-center">
          <img src="@/assets/img/logo.png" alt="Covenant University Logo" class="h-10" />
        </div>
  
        <!-- Navigation -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4 text-sm text-purple-300">Main</div>
          <nav class="space-y-1 px-2">
            <NuxtLink 
              to="/dashboard" 
              class="flex items-center p-3 rounded-xl transition-colors duration-200"
              :class="{ 'bg-purple-800 text-white': currentRoute === 'dashboard', 'hover:bg-purple-800/50': currentRoute !== 'dashboard' }"
            >
              <LayoutGrid class="h-5 w-5 mr-3" />
              Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/user" 
              class="flex items-center p-3 rounded-xl transition-colors duration-200"
              :class="{ 'bg-purple-800 text-white': currentRoute === 'user', 'hover:bg-purple-800/50': currentRoute !== 'user' }"
            >
              <User class="h-5 w-5 mr-3" />
              User
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/roles" 
              class="flex items-center p-3 rounded-xl transition-colors duration-200"
              :class="{ 'bg-purple-800 text-white': currentRoute === 'roles', 'hover:bg-purple-800/50': currentRoute !== 'roles' }"
            >
              <ShieldCheck class="h-5 w-5 mr-3" />
              Roles
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/knowledge-base" 
              class="flex items-center p-3 rounded-xl transition-colors duration-200"
              :class="{ 'bg-purple-800 text-white': currentRoute === 'knowledge-base', 'hover:bg-purple-800/50': currentRoute !== 'knowledge-base' }"
            >
              <BookOpen class="h-5 w-5 mr-3" />
              Knowledge Base
            </NuxtLink>
          </nav>
        </div>
  
        <!-- Logout -->
        <div class="p-4 border-t border-purple-800">
          <button 
            @click="logout" 
            class="flex items-center w-full p-3 rounded-xl text-white hover:bg-purple-800/50 transition-colors duration-200"
          >
            <LogOut class="h-5 w-5 mr-3 text-red-400" />
            Logout
          </button>
        </div>
      </div>
  
      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header class="bg-white border-b flex items-center justify-between p-4">
          <div class="flex items-center">
            <button 
              @click="toggleMobileMenu" 
              class="md:hidden mr-2 text-gray-600"
            >
              <Menu class="h-6 w-6" />
            </button>
            <h1 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h1>
          </div>
          <div class="flex items-center">
            <NuxtLink to="/dashboard" class="mr-4">
              <Home class="h-5 w-5 text-gray-600" />
            </NuxtLink>
            <div class="flex items-center">
              <img 
                src="@/assets/img/avatar.png" 
                alt="User Avatar" 
                class="h-10 w-10 rounded-full border-2 border-purple-500"
              />
              <div class="ml-2 hidden md:block">
                <p class="text-sm font-medium">Micheal George</p>
                <p class="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>
  
        <!-- Page content -->
        <main class="flex-1 overflow-y-auto bg-gray-50 p-4">
          <slot />
        </main>
      </div>
  
      <!-- Mobile menu overlay -->
      <div 
        v-if="isMobileMenuOpen" 
        @click="toggleMobileMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'nuxt/app';
  import { LayoutGrid, User, ShieldCheck, BookOpen, LogOut, Menu, Home } from 'lucide-vue-next';
  
  const route = useRoute();
  const router = useRouter();
  const isMobileMenuOpen = ref(false);
  
  const currentRoute = computed(() => {
    const path = route.path;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/dashboard/user')) return 'user';
    if (path.includes('/dashboard/roles')) return 'roles';
    if (path.includes('/dashboard/knowledge-base')) return 'knowledge-base';
    return '';
  });
  
  const pageTitle = computed(() => {
    const path = route.path;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/dashboard/user')) return 'User';
    if (path.includes('/dashboard/roles')) return 'Roles';
    if (path.includes('/dashboard/knowledge-base')) return 'Knowledge Base';
    return 'Covenant University';
  });
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };
  
  const logout = () => {
    router.push('/login');
  };
  </script>