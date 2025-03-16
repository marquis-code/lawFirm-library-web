<template>
    <div>
      <!-- Books Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-medium text-green-700">Recent records</h2>
          <div class="relative">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search books..."
              class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catalog Number</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Year</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                  <div class="flex justify-center">
                    <LoaderIcon class="h-8 w-8 animate-spin text-green-700" />
                  </div>
                  <p class="mt-2">Loading books...</p>
                </td>
              </tr>
              <tr v-else-if="filteredBooks.length === 0" class="animate-fade-in">
                <td colspan="8" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center justify-center space-y-4">
                    <BookOpenIcon class="h-12 w-12 text-gray-300" />
                    <div class="text-gray-500 font-medium">No books found</div>
                    <p class="text-gray-400 text-sm max-w-md">
                      We couldn't find any books matching your search criteria. Try adjusting your search term.
                    </p>
                  </div>
                </td>
              </tr>
              <tr 
                v-for="(book, index) in paginatedBooks" 
                :key="book.uuid"
                class="hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ startIndex + index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {{ book.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ book.author }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ book.catalog_number }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                  {{ book.year }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                  <span class="px-2 py-1 text-xs rounded-full" 
                    :class="getCategoryClass(book.category?.type)">
                    {{ book.category?.name }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                  {{ book.location || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="viewBook(book)"
                    class="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage >= totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ startIndex + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(startIndex + itemsPerPage, filteredBooks.length) }}</span>
                of
                <span class="font-medium">{{ filteredBooks.length }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="h-5 w-5" />
                </button>
                
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    page === currentPage
                      ? 'z-10 bg-green-50 border-green-500 text-green-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
                
                <button
                  @click="nextPage"
                  :disabled="currentPage >= totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Book View Modal -->
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <!-- Backdrop with blur effect -->
          <div 
            class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
            @click="closeModal"
          ></div>
  
          <!-- Modal Content -->
          <div 
            class="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 relative transform transition-all duration-300 ease-out overflow-y-auto max-h-[80vh]"
            :class="{ 'scale-100 opacity-100': showModal, 'scale-95 opacity-0': !showModal }"
          >
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-medium text-gray-800">Book Details</h2>
                <button 
                  @click="closeModal" 
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <XIcon class="h-6 w-6" />
                </button>
              </div>
  
              <div class="space-y-6">
                <div class="flex flex-col md:flex-row gap-6">
                  <div class="md:w-1/3">
                    <div class="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
                      <BookOpenIcon v-if="!selectedBook.image" class="h-20 w-20 text-gray-400" />
                      <img v-else :src="selectedBook.image" alt="Book cover" class="max-h-full object-contain" />
                    </div>
                  </div>
                  
                  <div class="md:w-2/3 space-y-4">
                    <div>
                      <h3 class="text-2xl font-bold text-gray-800">{{ selectedBook.title }}</h3>
                      <p class="text-gray-600">By {{ selectedBook.author }}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">Catalog Number</p>
                        <p class="font-medium">{{ selectedBook.catalog_number }}</p>
                      </div>
                      
                      <div>
                        <p class="text-sm text-gray-500">Year</p>
                        <p class="font-medium">{{ selectedBook.year }}</p>
                      </div>
                      
                      <div>
                        <p class="text-sm text-gray-500">Category</p>
                        <p class="font-medium">{{ selectedBook.category?.name }}</p>
                      </div>
                      
                      <div>
                        <p class="text-sm text-gray-500">Location</p>
                        <p class="font-medium">{{ selectedBook.location || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Description</h4>
                  <p class="text-gray-600">{{ selectedBook.description || 'No description available.' }}</p>
                </div>
                
                <div class="pt-4 border-t flex justify-end">
                  <button 
                    @click="closeModal" 
                    class="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { 
    SearchIcon, 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    XIcon, 
    BookOpenIcon,
    LoaderIcon
  } from 'lucide-vue-next';
  
  // Props and emits
  const props = defineProps({
    bookList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  });
  
  // Search functionality
  const searchTerm = ref('');
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(5);
  
  // Modal state
  const showModal = ref(false);
  const selectedBook = ref({});
  
  // Filter books based on search term
  const filteredBooks = computed(() => {
    if (!searchTerm.value.trim()) {
      return props.bookList;
    }
    
    const search = searchTerm.value.toLowerCase().trim();
    return props.bookList.filter((book) => {
      return (
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        book.catalog_number?.toLowerCase().includes(search) ||
        book.year?.toString().includes(search) ||
        book.location?.toLowerCase().includes(search) ||
        book.description?.toLowerCase().includes(search) ||
        book.category?.name?.toLowerCase().includes(search)
      );
    });
  });
  
  // Calculate total pages
  const totalPages = computed(() => {
    return Math.ceil(filteredBooks.value.length / itemsPerPage.value);
  });
  
  // Calculate start index for current page
  const startIndex = computed(() => {
    return (currentPage.value - 1) * itemsPerPage.value;
  });
  
  // Get paginated books for current page
  const paginatedBooks = computed(() => {
    return filteredBooks.value.slice(
      startIndex.value,
      startIndex.value + itemsPerPage.value
    );
  });
  
  // Calculate which page numbers to display
  const displayedPages = computed(() => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages.value <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of page range to show
      let startPage = Math.max(2, currentPage.value - 1);
      let endPage = Math.min(totalPages.value - 1, currentPage.value + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage.value <= 2) {
        endPage = 4;
      } else if (currentPage.value >= totalPages.value - 1) {
        startPage = totalPages.value - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages.value - 1) {
        pages.push('...');
      }
      
      // Always include last page
      if (totalPages.value > 1) {
        pages.push(totalPages.value);
      }
    }
    
    return pages;
  });
  
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
  
  const goToPage = (page) => {
    if (page !== '...') {
      currentPage.value = page;
    }
  };
  
  // Reset to first page when search term changes
  watch(searchTerm, () => {
    currentPage.value = 1;
  });
  
  // View book details
  const viewBook = (book) => {
    selectedBook.value = book;
    showModal.value = true;
  };
  
  // Close modal
  const closeModal = () => {
    showModal.value = false;
  };
  
  // Get category badge class based on type
  const getCategoryClass = (type) => {
    switch (type) {
      case 'statues':
        return 'bg-yellow-100 text-yellow-800';
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'book':
        return 'bg-purple-100 text-purple-800';
      case 'law_report':
        return 'bg-green-100 text-green-800';
      case 'client_file':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
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