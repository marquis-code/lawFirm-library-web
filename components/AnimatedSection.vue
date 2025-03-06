<template>
    <div class="min-h-screen font-sans">
      <main>
        <!-- Features Grid -->
        <section class="py-12 bg-gray-50">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Feature 1: Real-time Transaction -->
              <div 
                class="bg-blue-50 rounded-xl p-8 transition-all duration-500 hover:shadow-lg"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
              >
                <img src="@/assets/img/male.png" />
                <h3 class="text-2xl font-bold mb-2">Exclusive Early Access</h3>
                <p class="text-gray-600">Be the first to explore our powerful features and get a head start on transforming your church administration.</p>
              </div>
              
              <!-- Feature 2: Seamless Integration -->
              <div 
                class="bg-indigo-50 rounded-xl p-8 transition-all duration-500 hover:shadow-lg"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              >
                <img src="@/assets/img/female.jpg" />
                <h3 class="text-2xl font-bold mb-2">Influence Development</h3>
                <p class="text-gray-600">Share feedback and shape the platform to better meet the specific needs of your church community.</p>
              </div>
              
              <!-- Feature 3: Multi-Currency Support -->
              <div 
                class="bg-green-50 rounded-xl p-8 transition-all duration-500 hover:shadow-lg"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
              >
                <div class="mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                    <div class="mb-4">
                      <p class="text-sm text-gray-500 mb-1">You send</p>
                      <div class="flex justify-between items-center">
                        <input type="text" value="200" class="text-xl font-bold w-24 border-none focus:outline-none" />
                        <div class="flex items-center border rounded-md px-2 py-1">
                          <span class="mr-1">🇺🇸</span>
                          <span>USD</span>
                          <span class="ml-1">▼</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="mb-4">
                      <p class="text-sm text-gray-500 mb-1">Recipient will get</p>
                      <div class="flex justify-between items-center">
                        <input type="text" value="268.97" class="text-xl font-bold w-24 border-none focus:outline-none" readonly />
                        <div class="flex items-center border rounded-md px-2 py-1">
                          <span class="mr-1">🇸🇬</span>
                          <span>SGD</span>
                          <span class="ml-1">▼</span>
                        </div>
                      </div>
                    </div>
                    
                    <button class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
                      Continue
                    </button>
                  </div>
                  
                  <div class="flex justify-around">
                    <div class="text-center">
                      <div class="w-12 h-12 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                        <!-- <img src="/placeholder.svg?height=48&width=48" alt="Adam" /> -->
                      </div>
                      <p>Adam</p>
                    </div>
                    <div class="text-center">
                      <div class="w-12 h-12 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                        <!-- <img src="/placeholder.svg?height=48&width=48" alt="Maya" /> -->
                      </div>
                      <p>Maya</p>
                    </div>
                    <div class="text-center">
                      <div class="w-12 h-12 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                        <!-- <img src="/placeholder.svg?height=48&width=48" alt="Zidan" /> -->
                      </div>
                      <p>Zidan</p>
                    </div>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-2">Special Launch Offers</h3>
                <p class="text-gray-600">Enjoy exclusive perks, discounts, and benefits available only to our early adopters.</p>
              </div>
              
              <!-- Feature 4: User-Friendly Interface -->
              <div 
                class="bg-amber-50 rounded-xl p-8 transition-all duration-500 hover:shadow-lg"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 800 } }"
              >
                <div class="mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold">Recent Transactions</h4>
                      <button class="text-gray-400">✕</button>
                    </div>
                    
                    <div class="mb-4">
                      <div class="relative">
                        <input type="text" placeholder="Search" class="w-full pl-8 pr-4 py-2 border rounded-md" />
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                      </div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center mr-3">
                            <span class="text-red-500">▶</span>
                          </div>
                          <div>
                            <p class="font-medium">Youtube</p>
                            <p class="text-xs text-gray-500">Subscription Payment</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <p class="font-medium">$15.00</p>
                          <p class="text-xs text-gray-500">23 July 2024</p>
                        </div>
                      </div>
                      
                      <div class="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center mr-3">
                            <span class="text-purple-500">S</span>
                          </div>
                          <div>
                            <p class="font-medium">Stripe</p>
                            <p class="text-xs text-gray-500">Monthly Salary</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <p class="font-medium">$2,300</p>
                          <p class="text-xs text-gray-500">22 July 2024</p>
                        </div>
                      </div>
                      
                      <div class="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                            <span class="text-blue-500">P</span>
                          </div>
                          <div>
                            <p class="font-medium">Paypal</p>
                            <p class="text-xs text-gray-500">Electricity Bill</p>
                          </div>
                        </div>
                        <div>
                          <div class="text-right">
                            <p class="font-medium text-gray-400">YOUR BALANCE</p>
                            <p class="font-bold">$63,871.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex justify-between mt-4">
                      <button class="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">Send</button>
                      <button class="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">Request</button>
                    </div>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-2">User-Friendly Interface</h3>
                <p class="text-gray-600">Zenpay is designed with you in mind, featuring an intuitive interface.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Steps Section -->
        <section class="py-20 bg-blue-900 text-white">
          <div class="container mx-auto px-4">
            <div class="mb-4 text-blue-400 uppercase tracking-wider">STEP</div>
            <h2 class="text-4xl md:text-5xl font-bold mb-16">
              Maximize your returns with a<br>
              Reserve account that generates.
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                class="bg-blue-800 bg-opacity-30 p-8 rounded-lg"
                v-motion
                :initial="{ opacity: 0, x: -50 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
              >
                <div class="text-8xl font-bold text-blue-700 mb-6">1</div>
                <h3 class="text-2xl font-bold mb-4">Open your account</h3>
                <p class="text-blue-200">Sign up to finpay and set up your account from the dashboard.</p>
              </div>
              
              <div 
                class="bg-blue-800 bg-opacity-30 p-8 rounded-lg"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              >
                <div class="text-8xl font-bold text-blue-700 mb-6">2</div>
                <h3 class="text-2xl font-bold mb-4">Transfer your money</h3>
                <p class="text-blue-200">Move money from to another account into and start to earning up.</p>
              </div>
              
              <div 
                class="bg-blue-800 bg-opacity-30 p-8 rounded-lg"
                v-motion
                :initial="{ opacity: 0, x: 50 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: 600 } }"
              >
                <div class="text-8xl font-bold text-blue-700 mb-6">3</div>
                <h3 class="text-2xl font-bold mb-4">Watch your balance grow</h3>
                <p class="text-blue-200">Accessed instantly and remain insulated from market volatility.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- CTA Section -->
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-6">Ready to start your financial journey?</h2>
            <p class="text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of users who are already enjoying seamless financial transactions with Zenpay.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <button class="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Get Started</button>
              <button class="px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">Learn More</button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useMotion } from '@vueuse/motion';
  
  // Define reactive state
  const isLoading = ref(false);
  
  // Animation setup
  onMounted(() => {
    // You can add additional initialization code here
    console.log('Component mounted');
  });
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
  
  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .slide-up {
    animation: slideUp 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  </style>