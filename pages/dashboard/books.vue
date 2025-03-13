<template>
    <div>
      <!-- Add New Book Button -->
      <div class="mb-6">
        <button 
          @click="openAddModal" 
          class="flex items-center bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add New Books
        </button>
      </div>
      
      <!-- Books Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-medium text-green-700">Recent records</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catalog number</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(book, index) in books" :key="book.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.description?.substring(0, 30) }}{{ book.description?.length > 30 ? '...' : '' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.author }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.catalogNumber }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.category }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ book.location }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    class="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs"
                    @click="editBook(book)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Add Book Modal -->
      <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop with blur effect -->
        <div 
          class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          @click="showAddModal = false"
        ></div>
        
        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 relative">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-medium text-gray-800">Add New Book</h2>
              <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700">
                <XIcon class="h-6 w-6" />
              </button>
            </div>
            
            <form @submit.prevent="addBook" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    v-model="newBook.title" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input 
                    v-model="newBook.author" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  v-model="newBook.description" 
                  rows="3" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Catalog Number</label>
                  <input 
                    v-model="newBook.catalogNumber" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    v-model="newBook.category" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="Books">Books</option>
                    <option value="Law Reports">Law Reports</option>
                    <option value="Articles">Articles</option>
                    <option value="Client Files">Client Files</option>
                    <option value="Statues">Statues</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  v-model="newBook.location" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div class="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  type="button" 
                  @click="showAddModal = false" 
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { PlusIcon, XIcon } from 'lucide-vue-next';
  import { useLibraryStore } from '~/stores/library';
  
  const libraryStore = useLibraryStore();
  
  // Books data
  const books = computed(() => libraryStore.books);
  
  // Add book modal
  const showAddModal = ref(false);
  const newBook = ref({
    title: '',
    author: '',
    description: '',
    catalogNumber: '',
    category: 'Books',
    location: '',
  });
  
  // Open add modal
  const openAddModal = () => {
    newBook.value = {
      title: '',
      author: '',
      description: '',
      catalogNumber: '',
      category: 'Books',
      location: '',
    };
    showAddModal.value = true;
  };
  
  // Add book
  const addBook = () => {
    libraryStore.addItem(newBook.value, 'book');
    showAddModal.value = false;
  };
  
  // Edit book
  const editBook = (book: any) => {
    libraryStore.openEditModal(book, 'book');
  };
  </script>