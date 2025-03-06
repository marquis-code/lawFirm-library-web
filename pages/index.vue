<template>
  <div class="font-sans">
    <!-- Hero Section -->

    <section class="min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <video
        class="object-cover w-full h-full"
        autoplay
        loop
        muted
        playsinline
        poster="/church2.mp4"
      >
        <source src="/church2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <ChurchNavbar />

    <div class="relative container mx-auto px-4 pt-32 pb-20">
      <div
        class="max-w-4xl mx-auto text-center text-white"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
      >
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          ChurchRemit
        </h1>
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          The Future of Church Administration and Finance is Here
        </h2>
        <p class="text-xl mb-10 leading-relaxed">
          A revolutionary platform designed to simplify church operations, enhance financial transparency, and
          streamline payments. Join our waitlist now to be among the first to experience seamless church admin
          management.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            @click="scrollToWaitlist"
            class="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Join Waitlist
          </button>
          <button
            @click="scrollToFeatures"
            class="px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
          >
            Explore Features
          </button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button @click="scrollToWaitlistBenefits" class="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>

    <button
      @click="toggleVideo"
      class="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
    >
      <PauseIcon v-if="isPlaying" class="h-6 w-6" />
      <PlayIcon v-else class="h-6 w-6" />
    </button>
  </section>

  <!-- <AnimatedSection /> -->
     
    <!-- Waitlist Benefits Section -->
    <section ref="waitlistBenefits" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
            Why Join the Waitlist?
          </h2>
          
          <div class="space-y-8">
            <div class="flex items-start gap-6" v-motion :initial="{ opacity: 0, x: -50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }">
              <div class="flex-shrink-0 bg-blue-100 p-4 rounded-full">
                <span class="text-2xl">🚀</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Exclusive Early Access</h3>
                <p class="text-gray-600">Be the first to explore our powerful features and get a head start on transforming your church administration.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-6" v-motion :initial="{ opacity: 0, x: -50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }">
              <div class="flex-shrink-0 bg-yellow-100 p-4 rounded-full">
                <span class="text-2xl">💡</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Influence Development</h3>
                <p class="text-gray-600">Share feedback and shape the platform to better meet the specific needs of your church community.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-6" v-motion :initial="{ opacity: 0, x: -50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 400 } }">
              <div class="flex-shrink-0 bg-red-100 p-4 rounded-full">
                <span class="text-2xl">🎁</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Special Launch Offers</h3>
                <p class="text-gray-600">Enjoy exclusive perks, discounts, and benefits available only to our early adopters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="features" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-16 text-center" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          Key Features
        </h2>
        
        <div class="grid md:grid-cols-2 gap-16">
          <!-- Church Operations & Administration -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500" v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
            <h3 class="text-2xl font-bold mb-6 text-blue-600">Church Operations & Administration</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Centralised management for multi-branch churches.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Membership directory with role-based access.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Event scheduling and workflow automation.</span>
              </li>
            </ul>
          </div>
          
          <!-- Payments & Remittances -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500" v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }">
            <h3 class="text-2xl font-bold mb-6 text-blue-600">Payments & Remittances</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Accept tithes, offerings, and donations via bank transfers, USSD, and mobile wallets.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Making donations or payments to your church from any payment, banking or fintech platform.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Automated transaction receipts and donor tracking.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Real-time remittance monitoring for full transparency.</span>
              </li>
            </ul>
          </div>
          
          <!-- Payroll & Expense Management -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500" v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }">
            <h3 class="text-2xl font-bold mb-6 text-blue-600">Payroll & Expense Management</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Automated salary payments for clergy and staff.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Tax compliance, benefits tracking, and payslip generation.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Secure approval workflows for accurate disbursements.</span>
              </li>
            </ul>
          </div>
          
          <!-- Corporate Banking & Compliance -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500" v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }">
            <h3 class="text-2xl font-bold mb-6 text-blue-600">Corporate Banking & Compliance</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Direct integration with banking platforms for secure fund management.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Access to Payroll-linked loans and salary advances for your staff.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Access to Treasury management and investment products.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Real-time financial reporting and audit logs.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span>Compliance with financial regulations to protect church finances.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Advanced Reporting & Analytics -->
        <div class="mt-16 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto" v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 500 } }">
          <h3 class="text-2xl font-bold mb-6 text-blue-600">Advanced Reporting & Analytics</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <span>Real-time financial dashboards for income and expenses.</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <span>Donation trend analysis and financial forecasting.</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <span>Secure data encryption and fraud detection mechanisms.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Why Choose ChurchRemit Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          Why Choose ChurchRemit?
        </h2>
        
        <p class="text-xl text-center text-gray-600 mb-16 max-w-4xl mx-auto" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }">
          At ChurchRemit, we recognize the value in every solution for church management. Here's how
          ChurchRemit takes church financial management to the next level:
        </p>
        
        <div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div class="bg-blue-50 p-8 rounded-xl" v-motion :initial="{ opacity: 0, x: -50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <h3 class="text-xl font-bold mb-4 text-blue-700">Superior Banking Integration</h3>
            <p class="text-gray-700">
              Our platform directly connects with leading banking platforms and payment aggregators. This
              ensures real-time remittance monitoring and secure, efficient transactions.
            </p>
          </div>
          
          <div class="bg-purple-50 p-8 rounded-xl" v-motion :initial="{ opacity: 0, x: 50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <h3 class="text-xl font-bold mb-4 text-purple-700">Advanced Payroll & Expense Management</h3>
            <p class="text-gray-700">
              Beyond basic donation tracking, ChurchRemit offers automated salary disbursement, tax
              compliance, and multi-level approval workflows. This robust payroll management means you can
              focus on ministry while we handle the complexities.
            </p>
          </div>
          
          <div class="bg-green-50 p-8 rounded-xl" v-motion :initial="{ opacity: 0, x: -50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }">
            <h3 class="text-xl font-bold mb-4 text-green-700">Comprehensive Financial Transparency</h3>
            <p class="text-gray-700">
              Enjoy a real-time financial dashboard that delivers instant insights into donations, expenditures, and
              overall financial health. Our advanced reporting and analytics provide greater clarity and
              accountability compared to standard solutions.
            </p>
          </div>
          
          <div class="bg-yellow-50 p-8 rounded-xl" v-motion :initial="{ opacity: 0, x: 50 }" :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }">
            <h3 class="text-xl font-bold mb-4 text-yellow-700">Scalability and Security</h3>
            <p class="text-gray-700">
              Built on a modern cloud infrastructure, ChurchRemit guarantees high performance, reliability, and
              state-of-the-art security measures. This robust foundation supports the growth and evolving needs
              of your church.
            </p>
          </div>
          
          <div class="bg-red-50 p-8 rounded-xl md:col-span-2" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }">
            <h3 class="text-xl font-bold mb-4 text-red-700">Exclusive Early Access & Community Influence</h3>
            <p class="text-gray-700">
              By joining our waitlist, you'll gain exclusive early access, special launch offers, and the opportunity
              to shape the platform's development with your feedback.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Waitlist CTA Section -->
    <section ref="waitlist" class="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          Join the Waitlist Now!
        </h2>
        
        <p class="text-xl mb-12 max-w-3xl mx-auto" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }">
          Be part of the future of church financial management. Sign up today and get early access before our official
          launch!
        </p>
        
        <div class="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg" v-motion :initial="{ opacity: 0, scale: 0.9 }" :visible="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 400 } }">
          <form @submit.prevent="submitWaitlist" class="space-y-4">
            <div>
              <label for="name" class="block text-start text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="waitlistForm.name" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Your Name"
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-start text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="waitlistForm.email" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label for="church" class="block text-start text-gray-700 mb-2">Church Name</label>
              <input 
                type="text" 
                id="church" 
                v-model="waitlistForm.church" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Your Church"
                required
              />
            </div>
            
            <button 
              type="submit" 
              class="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              :class="{ 'opacity-75 cursor-not-allowed': isSubmitting }"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Join Waitlist</span>
            </button>
          </form>
        </div>
        
        <div class="mt-12 flex flex-wrap justify-center gap-6" v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }">
          <a href="#" class="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
            <!-- <EnvelopeIcon class="h-6 w-6" /> -->
            <span>Sign Up for Early Access</span>
          </a>
          <a href="#" class="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
            <PhoneIcon class="h-6 w-6" />
            <span>Contact Us</span>
          </a>
          <a href="#" class="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
            <!-- <GlobeAltIcon class="h-6 w-6" /> -->
            <span>Visit Our Website</span>
          </a>
        </div>
        
        <p class="mt-8 text-blue-200">+234 816 817 6267</p>
      </div>
    </section>

    <ChurchAppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';
import { 
  CheckCircleIcon, 
  // EnvelopeIcon, 
  PhoneIcon, 
  // GlobeAltIcon 
} from 'lucide-vue-next';
import AnimatedSection from '../components/AnimatedSection.vue';
// import ChurchAppFooter from '../components/ChurchAppFooter.vue';

// Refs for scroll targets
const waitlistBenefits = ref<HTMLElement | null>(null);
const features = ref<HTMLElement | null>(null);
const waitlist = ref<HTMLElement | null>(null);

// Form state
const waitlistForm = ref({
  name: '',
  email: '',
  church: ''
});
const isSubmitting = ref(false);
const showSuccess = ref(false);

// Scroll functions
const scrollToWaitlistBenefits = () => {
  waitlistBenefits.value?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToFeatures = () => {
  features.value?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToWaitlist = () => {
  waitlist.value?.scrollIntoView({ behavior: 'smooth' });
};

// Form submission
const submitWaitlist = () => {
  isSubmitting.value = true;
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    showSuccess.value = true;
    waitlistForm.value = {
      name: '',
      email: '',
      church: ''
    };
    
    // Show success message
    alert('Thank you for joining our waitlist! We will contact you soon with exclusive early access information.');
  }, 1500);
};

// Intersection observer for animations
onMounted(() => {
  // Initialize animations
  useMotion();
  
  // Add scroll reveal animations for elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
</script>

<style>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gradient text animation */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

