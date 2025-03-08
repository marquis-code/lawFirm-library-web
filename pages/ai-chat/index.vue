
<template>
  <div class="min-h-screen bg-white">
    <div class="w-full">
      <div class="relative bg-purple-900 text-white p-4 rounded-t-lg">
        <div class="flex items-center">
          <div class="border border-white rounded-lg p-2 mr-4">
            <p class="font-semibold">Chat with CU-AI</p>
            <p class="text-sm">Chat Bot</p>
          </div>
          <h1 class="text-xl font-medium text-center flex-grow">Course Advising Assistant</h1>
          <button class="absolute right-4 top-4" @click="closeChat">
            <span class="text-2xl">&times;</span>
          </button>
        </div>
      </div>
      
      <div class="bg-white h-[calc(100vh-200px)] overflow-y-auto p-6 flex flex-col items-center justify-center">
        <div v-if="!isLoggedIn" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border transition-all duration-300">
          <p class="text-center text-xl">Kindly Login to make use of<br>the AI Assistant</p>
        </div>
        
        <div v-else class="w-full flex flex-wrap justify-center gap-4 mt-10">
          <div 
            v-for="(question, index) in suggestedQuestions" 
            :key="index"
            class="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80"
            :class="question.bgColor"
            @click="selectQuestion(question.text)"
          >
            <p class="text-sm sm:text-base" :class="question.textColor">{{ question.text }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-100 p-4 border-b absolute w-full bottom-0 flex rounded-b-xl  items-center">
        <input 
          type="text" 
          v-model="userMessage"
          placeholder="Ask me question on course Advising"
          class="flex-grow p-2 bg-transparent outline-none"
          @keyup.enter="sendMessage"
        />
        <button class="ml-2 text-gray-500">
          <span class="text-xl">📎</span>
        </button>
        <button class="ml-2 text-gray-500">
          <span class="text-xl">😊</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const router = useRouter()

const isLoggedIn = ref(false);
const userMessage = ref('');

const suggestedQuestions = ref([
  { 
    text: 'I need a level advisor for my 400l courses this semester?',
    bgColor: 'bg-purple-900',
    textColor: 'text-white'
  },
  { 
    text: 'How do i calculate my CGPA?',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-900'
  },
  { 
    text: 'How do i choose selective courses in computer science?',
    bgColor: 'bg-purple-900',
    textColor: 'text-white'
  }
]);

// Simulate logging in after a short delay for demo purposes
onMounted(() => {
  setTimeout(() => {
    isLoggedIn.value = true;
  }, 2000);
});


function closeChat() {
  // This would typically close the chat or navigate away
  alert('Chat closed');
  router.push('/')
}

function selectQuestion(question: string) {
  userMessage.value = question;
  // In a real app, we would send this message
  console.log('Selected question:', question);
}

function sendMessage() {
  if (!userMessage.value.trim()) return;
  
  // In a real app, we would send this message to a backend
  console.log('Sending message:', userMessage.value);
  
  // Clear the input after sending
  userMessage.value = '';
}
</script>