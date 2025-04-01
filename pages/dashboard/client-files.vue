<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Client Files Management</h1>
        <button 
          @click="openAddModal" 
          class="flex items-center bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add New Client File
        </button>
      </div>
      
      <!-- Search and Filter -->
      <div class="bg-white rounded-xl shadow-md p-4 mb-6 transition-all duration-300 hover:shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search client files..."
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
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
            <div class="flex space-x-2">
              <div class="relative flex-1">
                <input
                  v-model="dateFilter.from"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <span class="absolute left-3 top-2 text-xs text-gray-500">From</span>
              </div>
              <div class="relative flex-1">
                <input
                  v-model="dateFilter.to"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <span class="absolute left-3 top-2 text-xs text-gray-500">To</span>
              </div>
              <button 
                @click="clearDateFilter" 
                class="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Clear date filter"
              >
                <XIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <div class="relative">
              <select
                v-model="sortOption"
                class="w-full px-3 py-2 pl-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none"
              >
                <option value="date_desc">Date (Newest First)</option>
                <option value="date_asc">Date (Oldest First)</option>
                <option value="name_asc">Client Name (A-Z)</option>
                <option value="name_desc">Client Name (Z-A)</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Client Files Table -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-medium text-green-700">Client Files</h2>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">
              {{ totalFiles }} {{ totalFiles === 1 ? 'file' : 'files' }}
            </span>
            <div v-if="loading" class="ml-2">
              <LoaderIcon class="animate-spin h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading && !clientFilesList.length" class="py-20 flex flex-col items-center justify-center space-y-4 animate-pulse">
          <div class="w-16 h-16 rounded-full border-4 border-gray-200 border-t-green-700 animate-spin"></div>
          <p class="text-gray-500 font-medium">Loading client files...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="filteredFiles.length === 0" class="py-20 flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <FileIcon class="h-10 w-10 text-gray-400" />
          </div>
          <div class="text-center px-4">
            <p class="text-gray-500 font-medium">No client files found</p>
            <p class="text-gray-400 text-sm mt-1 max-w-md">
              {{ searchTerm || dateFilter.from || dateFilter.to 
                ? 'Try adjusting your search or filter criteria' 
                : 'Add your first client file to get started' }}
            </p>
          </div>
          <button 
            v-if="!searchTerm && !dateFilter.from && !dateFilter.to"
            @click="openAddModal" 
            class="mt-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
          >
            <PlusIcon class="h-4 w-4 inline mr-1" />
            Add Client File
          </button>
        </div>
        
        <!-- Client Files Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Published Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Volume</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Description</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="(file, index) in paginatedFiles" 
                :key="file.id"
                class="hover:bg-gray-50 transition-all duration-150"
                :class="{'animate-highlight': highlightedFileId === file.id}"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ startIndex + index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3 hidden sm:flex">
                      {{ getInitials(file.client_name) }}
                    </div>
                    <span class="line-clamp-1">{{ file.client_name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ file.file_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{{ formatDate(file.published_date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{{ file.volume }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                  <span class="line-clamp-1">{{ file.description?.substring(0, 30) }}{{ file.description?.length > 30 ? '...' : '' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="viewClientFile(file)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center"
                    >
                      <EyeIcon class="h-3.5 w-3.5 mr-1" />
                      <span class="hidden sm:inline">View</span>
                    </button>
                    <button 
                      @click="editClientFile(file)"
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
          v-if="filteredFiles.length > 0"
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
                <span class="font-medium">{{ filteredFiles.length }}</span> files
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
    
    <!-- Client File Modal (Add/Edit/View) -->
    <Transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <!-- Backdrop with blur effect -->
        <div 
          class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          @click="closeModal"
        ></div>
        
        <!-- Modal Content -->
        <div 
          class="bg-white rounded-xl shadow-xl w-full max-w-2xl z-10 relative transform transition-all duration-300 ease-out overflow-hidden"
          :class="{ 'scale-100 opacity-100': showModal, 'scale-95 opacity-0': !showModal }"
        >
          <!-- Modal Header -->
          <div class="bg-green-700 text-white p-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">
                {{ isEditing ? 'Edit Client File' : (isViewing ? 'Client File Details' : 'Add New Client File') }}
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
          
          <!-- Client File Icon -->
          <div class="flex justify-center -mt-10">
            <div class="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center text-green-700 text-xl font-bold border-4 border-white">
              {{ getInitials(currentFile.client_name || 'CF') }}
            </div>
          </div>
          
          <!-- Form Content -->
          <div class="p-6 pt-4 overflow-y-auto max-h-[60vh]">
            <form @submit.prevent="submitForm" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input 
                    v-model="currentFile.client_name" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                  <input 
                    v-model="currentFile.file_name" 
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                  <input 
                    v-model="currentFile.published_date" 
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                  <input 
                    v-model="currentFile.volume" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">URL (Optional)</label>
                <div class="relative">
                  <input 
                    v-model="currentFile.url" 
                    type="url" 
                    class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    :disabled="isViewing"
                    :class="{'bg-gray-50': isViewing}"
                    placeholder="https://example.com/file"
                  />
                  <LinkIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <a 
                    v-if="isViewing && currentFile.url" 
                    :href="currentFile.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="absolute right-3 top-2.5 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLinkIcon class="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  v-model="currentFile.description" 
                  rows="3" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  :disabled="isViewing"
                  :class="{'bg-gray-50': isViewing}"
                ></textarea>
              </div>
              
              <!-- Image Upload Section -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                
                <!-- Image Preview -->
                <div v-if="imagePreview || currentFile.image" class="mb-3">
                  <div class="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                    <img 
                      :src="imagePreview || currentFile.image" 
                      alt="Preview" 
                      class="w-full h-full object-contain"
                    />
                    <button 
                      v-if="!isViewing"
                      type="button" 
                      @click="removeImage" 
                      class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                    >
                      <XIcon class="h-4 w-4" />
                    </button>
                    <button 
                      v-if="isViewing && (imagePreview || currentFile.image)"
                      type="button" 
                      @click="openImageFullscreen" 
                      class="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <MaximizeIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <!-- File Input -->
                <div v-if="!isViewing && !imagePreview && !currentFile.image" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
                  <!-- Loading Overlay -->
                  <div v-if="uploadingFile" class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                    <div class="flex flex-col items-center">
                      <LoaderIcon class="h-8 w-8 text-green-600 animate-spin" />
                      <p class="mt-2 text-sm text-gray-600">Uploading file...</p>
                    </div>
                  </div>
                  
                  <div class="space-y-1 text-center">
                    <UploadIcon class="mx-auto h-12 w-12 text-gray-400" />
                    <div class="flex text-sm text-gray-600">
                      <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                        <span>Upload a file</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          class="sr-only"
                          accept="image/*"
                          @change="handleImageChange"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                
                <!-- File Upload Button (when editing) -->
                <div v-if="!isViewing && (imagePreview || currentFile.image)" class="mt-3">
                  <label for="file-upload-edit" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer">
                    <UploadIcon class="h-4 w-4 mr-2 text-gray-500" />
                    Change Image
                    <input 
                      id="file-upload-edit" 
                      name="file-upload-edit" 
                      type="file" 
                      class="sr-only"
                      accept="image/*"
                      @change="handleImageChange"
                    />
                  </label>
                </div>
              </div>
              
              <!-- Form Actions -->
              <div class="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button 
                  type="button" 
                  @click="closeModal" 
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {{ isViewing ? 'Close' : 'Cancel' }}
                </button>
                <button 
                  v-if="!isViewing"
                  type="submit" 
                  class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  :disabled="adding || updating || uploadingFile"
                >
                  <LoaderIcon v-if="adding || updating" class="animate-spin h-4 w-4 mr-2" />
                  {{ isEditing ? 'Update Client File' : 'Add Client File' }}
                </button>
                <!-- <button>
                  {{ isEditing ? 'Update Client File' : 'Add Client File' }}
                </button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Fullscreen Image Viewer -->
    <Transition name="fade">
      <div 
        v-if="showFullscreenImage" 
        class="fixed inset-0 z-[60] bg-black bg-opacity-90 flex items-center justify-center p-4"
        @click="showFullscreenImage = false"
      >
        <button 
          @click.stop="showFullscreenImage = false" 
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <XIcon class="h-8 w-8" />
        </button>
        <img 
          :src="imagePreview || currentFile.image" 
          alt="Full size preview" 
          class="max-w-full max-h-[90vh] object-contain"
        />
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
import { ref, computed, onMounted, watch } from 'vue';
import { 
  PlusIcon, XIcon, UploadIcon, LoaderIcon, SearchIcon, ChevronLeftIcon, 
  ChevronRightIcon, EyeIcon, EditIcon, FileIcon, CheckIcon, AlertTriangleIcon, 
  XCircleIcon, ChevronDownIcon, ChevronsLeftIcon, ChevronsRightIcon, LinkIcon,
  ExternalLinkIcon, MaximizeIcon
} from 'lucide-vue-next';
import { useGetClientFiles } from '@/composables/modules/admin/client-files/useGetClientFiles';
import { useAddClientFile } from '@/composables/modules/admin/client-files/useCreateClientFile';
import { useUpdateClientFile } from '@/composables/modules/admin/client-files/useUpdateClientFile';
import { useUploadFile } from '@/composables/modules/admin/useUploadFile';

// Composables
const { clientFilesList, loading } = useGetClientFiles();
const { addClientFile, loading: adding, payload: createPayload } = useAddClientFile();
const { updateClientFile, loading: updating, payload: updatePayload } = useUpdateClientFile();
const { uploadFile, loading: uploadingFile, uploadedFileUrl } = useUploadFile();

// Modal state
const showModal = ref(false);
const isEditing = ref(false);
const isViewing = ref(false);
const currentFile = ref({
  id: '',
  client_name: '',
  file_name: '',
  published_date: new Date().toISOString().split('T')[0],
  volume: '',
  image: '',
  url: '',
  description: ''
});

// Image handling
const imagePreview = ref('');
const imageFile = ref(null);
const showFullscreenImage = ref(false);

// Search and filter
const searchTerm = ref('');
const dateFilter = ref({
  from: '',
  to: ''
});
const sortOption = ref('date_desc');

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const highlightedFileId = ref('');

// Toast notification
const toast = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
  timeout: null as number | null
});

// Format date for display
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Get initials for avatar
const getInitials = (name: string) => {
  if (!name) return '?';
  
  const words = name.split(' ');
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
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

// Highlight newly added or updated file
const highlightFile = (fileId: string) => {
  highlightedFileId.value = fileId;
  setTimeout(() => {
    highlightedFileId.value = '';
  }, 3000);
};

// Computed properties for filtering and pagination
const filteredFiles = computed(() => {
  if (!clientFilesList.value) return [];
  
  return clientFilesList.value.filter(file => {
    // Search filter
    const searchMatch = !searchTerm.value || 
      file.client_name?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      file.file_name?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.value.toLowerCase());
    
    // Date filter
    let dateMatch = true;
    if (dateFilter.value.from) {
      dateMatch = dateMatch && new Date(file.published_date) >= new Date(dateFilter.value.from);
    }
    if (dateFilter.value.to) {
      dateMatch = dateMatch && new Date(file.published_date) <= new Date(dateFilter.value.to);
    }
    
    return searchMatch && dateMatch;
  }).sort((a, b) => {
    // Sort based on selected option
    switch (sortOption.value) {
      case 'date_desc':
        return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
      case 'date_asc':
        return new Date(a.published_date).getTime() - new Date(b.published_date).getTime();
      case 'name_asc':
        return a.client_name.localeCompare(b.client_name);
      case 'name_desc':
        return b.client_name.localeCompare(a.client_name);
      default:
        return 0;
    }
  });
});

const totalFiles = computed(() => {
  return filteredFiles.value.length;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredFiles.value.length / itemsPerPage.value));
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredFiles.value.length);
});

const paginatedFiles = computed(() => {
  return filteredFiles.value.slice(startIndex.value, endIndex.value);
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

// Methods
const openAddModal = () => {
  currentFile.value = {
    id: '',
    client_name: '',
    file_name: '',
    published_date: new Date().toISOString().split('T')[0],
    volume: '',
    image: '',
    url: '',
    description: ''
  };
  imagePreview.value = '';
  imageFile.value = null;
  isEditing.value = false;
  isViewing.value = false;
  showModal.value = true;
};

const editClientFile = (file: any) => {
  currentFile.value = { ...file };
  imagePreview.value = '';
  imageFile.value = null;
  isEditing.value = true;
  isViewing.value = false;
  showModal.value = true;
};

const viewClientFile = (file: any) => {
  currentFile.value = { ...file };
  isEditing.value = false;
  isViewing.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openImageFullscreen = () => {
  showFullscreenImage.value = true;
};

const clearDateFilter = () => {
  dateFilter.value = {
    from: '',
    to: ''
  };
};

// Handle image upload
const handleImageChange = async (event: any) => {
  const file = event.target.files[0];
  if (!file) return;
  
  imageFile.value = file;
  
  try {
    // Upload file to server
    const fileUrl = await uploadFile(file);
    
    if (fileUrl) {
      // Set image preview
      imagePreview.value = fileUrl;
      // Store image URL
      currentFile.value.image = fileUrl;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    showToast('error', 'Upload Failed', 'There was an error uploading your image');
  }
};

const removeImage = () => {
  imagePreview.value = '';
  imageFile.value = null;
  currentFile.value.image = '';
};

const submitForm = async () => {
  try {
    if (isEditing.value) {
      // Update existing client file
      const { id, ...fileData } = currentFile.value;
      updatePayload.value = { ...fileData };
      await updateClientFile(id);
      showToast('success', 'File Updated', 'Client file has been updated successfully');
      highlightFile(id);
    } else {
      // Create new client file
      const { id, ...rest } = currentFile.value;
      createPayload.value = { ...rest };
      await addClientFile();
      showToast('success', 'File Added', 'New client file has been added successfully');
      
      // Reset pagination to first page to show the new file
      currentPage.value = 1;
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

// Reset pagination when search term, date filter, or items per page changes
watch([searchTerm, dateFilter, itemsPerPage, sortOption], () => {
  currentPage.value = 1;
});

// Watch for changes in total pages and adjust current page if needed
watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = Math.max(1, newTotalPages);
  }
});

// Fetch client files on component mount
onMounted(() => {
  // If your useGetClientFiles doesn't automatically fetch on mount, call it here
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

/* Fade transition for fullscreen image */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Line clamp for text overflow */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* File upload drag and drop */
#file-upload, #file-upload-edit {
  opacity: 0;
  position: absolute;
  z-index: -1;
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