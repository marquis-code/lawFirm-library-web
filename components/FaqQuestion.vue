<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref<'Tenant' | 'Agent' | 'Service Provider'>('Tenant');
const openQuestion = ref<number | null>(null);

const faqData = {
  Tenant: [
    { 
      question: "How can I find affordable housing in the city?", 
      answer: "You can explore local listings, connect with trusted estate agents, or use housing apps tailored for our region. Government-subsidized housing options may also be available." 
    },
    { 
      question: "What documents do I need to rent an apartment?", 
      answer: "Typically, you’ll need a valid ID, proof of income or employment, a rental history reference, and in some cases, a guarantor." 
    },
    { 
      question: "Are landlords allowed to increase rent anytime?", 
      answer: "No, rent increases must follow tenancy laws, and landlords must provide prior notice, usually 3-6 months in advance." 
    },
    { 
      question: "Can I negotiate my rent?", 
      answer: "Yes, you can negotiate based on market rates, property condition, or long-term lease agreements." 
    },
    { 
      question: "What should I do if my landlord refuses to fix essential repairs?", 
      answer: "Report the issue formally in writing. If ignored, escalate to local housing authorities or tenant advocacy groups." 
    },
  ],
  Agent: [
    { 
      question: "How do I become a licensed real estate agent?", 
      answer: "You’ll need to complete a real estate certification course, pass a licensing exam, and register with the national housing board." 
    },
    { 
      question: "What are common challenges agents face in the local market?", 
      answer: "Slow property turnover, client trust issues, and fluctuating market prices can be major challenges." 
    },
    { 
      question: "How do I attract more property buyers?", 
      answer: "Leverage social media, provide virtual tours, offer flexible payment plans, and build strong client relationships." 
    },
    { 
      question: "Are there commission caps for agents?", 
      answer: "Commission rates vary but typically range between 3-10% of the property value, depending on the deal and regulations." 
    },
    { 
      question: "What legal requirements should I be aware of as an agent?", 
      answer: "Ensure all contracts are legally binding, follow anti-fraud laws, and maintain ethical business practices." 
    },
  ],
  'Service Provider': [
    { 
      question: "How do I register my business as a service provider?", 
      answer: "Visit the Corporate Affairs Commission (or equivalent) to register your business and obtain the necessary permits." 
    },
    { 
      question: "What are the most in-demand home services?", 
      answer: "Plumbing, electrical repairs, cleaning services, and home renovation are highly sought after." 
    },
    { 
      question: "How can I build trust with new clients?", 
      answer: "Provide high-quality service, maintain clear communication, and collect client testimonials." 
    },
    { 
      question: "Do I need insurance as a service provider?", 
      answer: "Yes, liability insurance helps protect you in case of damages or work-related accidents." 
    },
    { 
      question: "How do I set fair pricing for my services?", 
      answer: "Research market rates, factor in labor and material costs, and offer competitive yet profitable prices." 
    },
  ]
};


const toggleQuestion = (index: number) => {
  openQuestion.value = openQuestion.value === index ? null : index;
};
</script>

<template>
<main class="bg-[#FDFCFC]">
  <div class="max-w-3xl bg-[#FDFCFC] mx-auto p-6 py-20">
    <h2 data-aos="fade-up" class="text-xl text-[#1D2739] md:text-2xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
    
    <!-- <div data-aos="fade-up" class="flex justify-center lg:gap-4 mb-6">
      <button 
        class="px-4 py-2 lg:py-3 rounded-lg border-[0.5px] border-gray-25 text-base lg:text-sm transition-all duration-200"
        v-for="tab in ['Tenant', 'Agent', 'Service Provider']" 
        :key="tab"
        @click="activeTab = tab as any"
        :class="activeTab === tab ? 'bg-[#292929] text-white' : 'bg-[#F0F2F5] text-[#1D2739]'">
        {{ tab }}
      </button>
    </div> -->

    <div data-aos="fade-up" class="flex justify-center lg:gap-4 mb-6 overflow-x-auto whitespace-nowrap">
      <div class="flex gap-2">
        <button 
          class="px-4 py-2 lg:py-3 rounded-lg border-[0.5px] border-gray-25 text-base lg:text-sm transition-all duration-200"
          v-for="tab in ['Tenant', 'Agent', 'Service Provider']" 
          :key="tab"
          @click="activeTab = tab as any"
          :class="activeTab === tab ? 'bg-[#292929] text-white' : 'bg-[#F0F2F5] text-[#1D2739]'">
          {{ tab }}
        </button>
      </div>
    </div>


    
    <div data-aos="fade-up" class="space-y-4">
      <div 
        v-for="(faq, index) in faqData[activeTab]" 
        :key="index" 
        class="border-[0.5px] border-gray-50 rounded-lg overflow-hidden">
        <button 
          class="w-full flex justify-between items-center  px-4 py-5 bg-white"
          @click="toggleQuestion(index)">
          <span class="font-mediuk=m text-start">{{ faq.question }}</span>
          <span :class="openQuestion === index ? 'rotate-0' : 'rotate-180'" class="transition-transform">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10C12 10 9.05407 6.00001 8 6C6.94587 5.99999 4 10 4 10" stroke="#667185" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <div v-if="openQuestion === index" class="p-4 bg-white text-sm py-10 text-[#1D2739] border-t-[0.5px]">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped>
button {
  min-width: 120px;
  text-align: center;
}
</style>
