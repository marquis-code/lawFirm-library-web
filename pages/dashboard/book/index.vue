<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Books Management</h1>
        <button
          @click="openAddModal"
          class="flex items-center bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add New Book
        </button>
      </div>

      <!-- Category and Search Filters -->
      <div class="bg-white rounded-xl shadow-md p-4 mb-6 transition-all duration-300 hover:shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Book Category</label>
            <div class="relative">
              <select
                v-model="selectedCategoryId"
                class="w-full px-3 py-2 pl-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none"
                :disabled="categoriesLoading"
              >
                <option v-if="categoriesLoading" value="">
                  Loading categories...
                </option>
                <option v-else-if="categories.length === 0" value="">
                  No categories available
                </option>
                <option value="">All Categories</option>
                <option
                  v-for="category in categories"
                  :key="category.uuid"
                  :value="category.uuid"
                >
                  {{ category.name }}
                </option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <div v-if="categoriesLoading" class="absolute right-10 top-2.5">
                <LoaderIcon class="animate-spin h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search books..."
                class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button 
                v-if="searchTerm" 
                @click="searchTerm = ''" 
                class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircleIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Books Table -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-medium text-green-700">Books</h2>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">
              {{ totalBooks }} {{ totalBooks === 1 ? 'book' : 'books' }}
            </span>
            <div v-if="fetchingBooks" class="ml-2">
              <LoaderIcon class="animate-spin h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="fetchingBooks && !bookList.length" class="py-20 flex flex-col items-center justify-center space-y-4 animate-pulse">
          <div class="w-16 h-16 rounded-full border-4 border-gray-200 border-t-green-700 animate-spin"></div>
          <p class="text-gray-500 font-medium">Loading books...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredBooks.length === 0" class="py-20 flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <BookOpenIcon class="h-10 w-10 text-gray-400" />
          </div>
          <div class="text-center px-4">
            <p class="text-gray-500 font-medium">No books found</p>
            <p class="text-gray-400 text-sm mt-1 max-w-md">
              {{ searchTerm || selectedCategoryId 
                ? 'Try adjusting your search or category filter' 
                : 'Add your first book to get started' }}
            </p>
          </div>
          <button 
            v-if="!searchTerm && !selectedCategoryId"
            @click="openAddModal" 
            class="mt-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
          >
            <PlusIcon class="h-4 w-4 inline mr-1" />
            Add Book
          </button>
        </div>

        <!-- Books Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Catalog Number
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Year
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Location
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(book, index) in paginatedBooks"
                :key="book.id"
                class="hover:bg-gray-50 transition-all duration-150"
                :class="{'animate-highlight': highlightedBookId === book.id}"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ startIndex + index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3 hidden sm:flex">
                      {{ getInitials(book.title) }}
                    </div>
                    <span class="line-clamp-1">{{ book.title }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ book.author }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                  {{ book.catalog_number }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                  {{ book.year }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                  {{ book.location || "N/A" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewBook(book)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center"
                    >
                      <EyeIcon class="h-3.5 w-3.5 mr-1" />
                      <span class="hidden sm:inline">View</span>
                    </button>
                    <button
                      @click="editBook(book)"
                      class="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center"
                    >
                      <EditIcon class="h-3.5 w-3.5 mr-1" />
                      <span class="hidden sm:inline">Edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredBooks.length > 0"
          class="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-4"
        >
          <!-- Items per page selector -->
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-600">Show:</label>
            <select 
              v-model="itemsPerPage" 
              class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
          
          <!-- Mobile pagination -->
          <div class="flex items-center justify-center sm:hidden w-full">
            <button
              @click="goToPage(1)"
              :disabled="currentPage === 1"
              class="px-2 py-1 border border-gray-300 rounded-l-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeftIcon class="h-4 w-4" />
            </button>
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-2 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon class="h-4 w-4" />
            </button>
            <span class="px-4 py-1 border-t border-b border-gray-300 bg-white text-sm">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage >= totalPages"
              class="px-2 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon class="h-4 w-4" />
            </button>
            <button
              @click="goToPage(totalPages)"
              :disabled="currentPage >= totalPages"
              class="px-2 py-1 border border-gray-300 rounded-r-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRightIcon class="h-4 w-4" />
            </button>
          </div>
          
          <!-- Desktop pagination -->
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to 
                <span class="font-medium">{{ endIndex }}</span> of 
                <span class="font-medium">{{ filteredBooks.length }}</span> books
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
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
    </div>

    <!-- Book Modal (Add/Edit/View) -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      >
        <!-- Backdrop with blur effect -->
        <div
          class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          @click="closeModal"
        ></div>

        <!-- Modal Content -->
        <div
          class="bg-white rounded-xl shadow-xl w-full max-w-2xl z-10 relative transform transition-all duration-300 ease-out overflow-hidden"
          :class="{
            'scale-100 opacity-100': showModal,
            'scale-95 opacity-0': !showModal,
          }"
        >
          <!-- Modal Header -->
          <div class="bg-green-700 text-white p-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">
                {{
                  isEditing
                    ? "Edit Book"
                    : isViewing
                    ? "Book Details"
                    : "Add New Book"
                }}
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
          
          <!-- Book Icon -->
          <div class="flex justify-center -mt-10">
            <div class="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center text-green-700 text-xl font-bold border-4 border-white">
              {{ getInitials(currentBook.title) }}
            </div>
          </div>

          <!-- Form Content -->
          <div class="p-6 pt-4 overflow-y-auto max-h-[60vh]">
            <form @submit.prevent="submitForm" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    v-model="currentBook.title"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    v-model="currentBook.author"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Catalog Number</label>
                  <input
                    v-model="currentBook.catalog_number"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    v-model="currentBook.year"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div class="relative">
                  <select
                    v-model="currentBook.category_id"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none"
                    :disabled="isViewing || categoriesLoading"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  >
                    <option v-if="categoriesLoading" value="">
                      Loading categories...
                    </option>
                    <option v-else-if="categories.length === 0" value="">
                      No categories available
                    </option>
                    <option
                      v-for="category in categories"
                      :key="category.uuid"
                      :value="category.uuid"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <ChevronDownIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  v-model="currentBook.location"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  :disabled="isViewing"
                  :class="{'bg-gray-50': isViewing}"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-model="currentBook.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  :disabled="isViewing"
                  :class="{'bg-gray-50': isViewing}"
                ></textarea>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {{ isViewing ? "Close" : "Cancel" }}
                </button>
                <button
                  v-if="!isViewing"
                  type="submit"
                  class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  :disabled="creating || updating"
                >
                  <LoaderIcon
                    v-if="creating || updating"
                    class="animate-spin h-4 w-4 mr-2"
                  />
                  {{ isEditing ? "Update Book" : "Add Book" }}
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
        class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center max-w-md border-l-4 transform transition-all duration-300"
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
import { ref, watch, computed, onMounted, nextTick } from "vue";
import {
  PlusIcon,
  XIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  EyeIcon,
  EditIcon,
  BookOpenIcon,
  CheckIcon,
  AlertTriangleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from "lucide-vue-next";
import { useAddBook } from "@/composables/modules/admin/books/useAddBook";
import { useUpdateBook } from "@/composables/modules/admin/books/useUpdateBook";
import { useGetBooks } from "@/composables/modules/admin/books/uesGetBooks";
import { useGetBookCategories } from "@/composables/modules/admin/books/useGetCategories";

// Composables
const { categories, loading: categoriesLoading } = useGetBookCategories();
const { addBook, loading: creating } = useAddBook();
const { updateBook, loading: updating } = useUpdateBook();
const {
  bookList,
  loading: fetchingBooks,
  filters,
  metadata,
  getBooks,
} = useGetBooks();

// State
const showModal = ref(false);
const isEditing = ref(false);
const isViewing = ref(false);
const selectedCategoryId = ref("");
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const highlightedBookId = ref("");

// Toast notification
const toast = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
  timeout: null as number | null
});

// Current book for add/edit/view
const currentBook = ref({
  id: "",
  uuid: "",
  title: "",
  author: "",
  catalog_number: "",
  category_id: "",
  location: "",
  year: "",
  description: "",
});

// Computed properties for pagination
const filteredBooks = computed(() => {
  if (!bookList.value) return [];
  
  if (!searchTerm.value.trim()) {
    return bookList.value;
  }
  
  const search = searchTerm.value.toLowerCase().trim();
  return bookList.value.filter(book => {
    return (
      book.title?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search) ||
      book.catalog_number?.toLowerCase().includes(search) ||
      book.year?.toString().includes(search) ||
      book.location?.toLowerCase().includes(search) ||
      book.description?.toLowerCase().includes(search)
    );
  });
});

const totalBooks = computed(() => {
  return filteredBooks.value.length;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredBooks.value.length / itemsPerPage.value));
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredBooks.value.length);
});

const paginatedBooks = computed(() => {
  return filteredBooks.value.slice(startIndex.value, endIndex.value);
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

// Get book initials for avatar
const getInitials = (title: string) => {
  if (!title) return '?';
  
  const words = title.split(' ');
  if (words.length === 1) {
    return title.substring(0, 2).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

// Show toast notification
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

// Highlight newly added or updated book
const highlightBook = (bookId: string) => {
  highlightedBookId.value = bookId;
  setTimeout(() => {
    highlightedBookId.value = '';
  }, 3000);
};

// Methods
const openAddModal = () => {
  currentBook.value = {
    id: "",
    uuid: "",
    title: "",
    author: "",
    catalog_number: "",
    category_id: selectedCategoryId.value,
    location: "",
    year: new Date().getFullYear().toString(),
    description: "",
  };
  isEditing.value = false;
  isViewing.value = false;
  showModal.value = true;
};

const editBook = (book: any) => {
  currentBook.value = { ...book };
  isEditing.value = true;
  isViewing.value = false;
  showModal.value = true;
};

const viewBook = (book: any) => {
  currentBook.value = { ...book };
  isEditing.value = false;
  isViewing.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  try {
    if (isEditing.value) {
      // Update existing book
      const updateObj = {
        id: currentBook.value.uuid,
        title: currentBook.value.title,
        author: currentBook.value.author,
        catalog_number: currentBook.value.catalog_number,
        category_id: currentBook.value.category_id,
        location: currentBook.value.location,
        year: currentBook.value.year,
        description: currentBook.value.description,
      };
      await updateBook(updateObj);
      showToast('success', 'Book Updated', 'Book information has been updated successfully');
      highlightBook(currentBook.value.id);
    } else {
      // Create new book
      await addBook(currentBook.value);
      showToast('success', 'Book Added', 'New book has been added successfully');
      
      // Reset pagination to first page to show the new book
      currentPage.value = 1;
      
      // Highlight the new book (after data refresh)
      nextTick(() => {
        if (bookList.value && bookList.value.length > 0) {
          // Assuming the newest book is at the beginning of the array
          highlightBook(bookList.value[0].id);
        }
      });
    }
    closeModal();
    // Refresh the book list
    getBooks(selectedCategoryId.value);
  } catch (error) {
    console.error("Error submitting form:", error);
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

// Watch for category selection changes
watch(selectedCategoryId, (newCategoryId) => {
  currentPage.value = 1; // Reset to first page when changing category
  if (newCategoryId) {
    filters.value.categoryId = newCategoryId;
    getBooks(newCategoryId);
  } else {
    // If "All Categories" is selected
    filters.value.categoryId = '';
    getBooks('');
  }
});

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

// Initialize with first category when available
watch(categories, (newCategories) => {
  if (newCategories && newCategories.length > 0 && !selectedCategoryId.value) {
    // Don't auto-select first category, let user choose
    // selectedCategoryId.value = newCategories[0].uuid;
  }
});

// Fetch books on component mount
onMounted(() => {
  // If your useGetBooks doesn't automatically fetch on mount, call it here
  getBooks('');
});

definePageMeta({
  layout: "dashboard",
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

/* Empty state animation */
.animate-empty-state {
  animation: emptyState 0.8s ease-in-out;
}

@keyframes emptyState {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Line clamp for text overflow */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }
  
  th, td {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>