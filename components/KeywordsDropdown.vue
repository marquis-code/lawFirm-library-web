<template>
    <div class="relative">
      <!-- Dropdown Button -->
      <button 
        @click="toggleDropdown" 
        class="flex items-center justify-between w-full bg-white border border-gray-300 rounded px-4 py-3 text-left"
      >
        <span>{{ selectedKeyword || 'Keywords' }}</span>
        <ChevronDownIcon class="h-5 w-5" />
      </button>
      
      <!-- Dropdown Menu -->
      <div 
        v-if="isOpen" 
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-y-auto"
      >
        <!-- Search Input -->
        <div class="sticky top-0 bg-white p-2 border-b border-gray-200">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Search keywords..." 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <!-- Alphabet Filter -->
        <div class="flex flex-wrap p-2 border-b border-gray-200 bg-gray-50">
          <button 
            v-for="letter in alphabet" 
            :key="letter" 
            @click="filterByLetter(letter)"
            :class="[
              'px-2 py-1 m-1 text-sm rounded transition-colors',
              currentLetter === letter 
                ? 'bg-green-700 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ letter }}
          </button>
          <button 
            @click="filterByLetter('all')"
            :class="[
              'px-2 py-1 m-1 text-sm rounded transition-colors',
              currentLetter === 'all' 
                ? 'bg-green-700 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            All
          </button>
        </div>
        
        <!-- Keywords List -->
        <div class="p-2">
          <div 
            v-for="keyword in filteredKeywords" 
            :key="keyword" 
            @click="selectKeyword(keyword)"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded"
          >
            {{ keyword }}
          </div>
          
          <div v-if="filteredKeywords.length === 0" class="px-4 py-2 text-gray-500 text-center">
            No keywords found
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  import { ChevronDownIcon } from 'lucide-vue-next';
  
  const props = defineProps<{
    modelValue?: string;
  }>();
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();
  
  // State
  const isOpen = ref(false);
  const searchTerm = ref('');
  const currentLetter = ref('all');
  const selectedKeyword = ref(props.modelValue || '');
  
  // Alphabet array for filter
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  // Mock keywords data
  const keywords = [
    'Abandonment', 'Abatement', 'Abduction', 'Abortion', 'Abrogation', 'Absolute Liability',
    'Absolute Privilege', 'Abstract of Title', 'Abuse of Process', 'Acceptance', 'Accessory',
    'Accomplice', 'Accord and Satisfaction', 'Accountability', 'Accretion', 'Accusation',
    'Acquittal', 'Act of God', 'Action', 'Actionable', 'Active Concealment', 'Actual Damages',
    'Actus Reus', 'Ad Hoc', 'Ad Litem', 'Ad Valorem', 'Addendum', 'Ademption', 'Adjournment',
    'Adjudication', 'Adjustment', 'Administrative Law', 'Admissible Evidence', 'Admission',
    'Admonition', 'Adoption', 'Adversarial System', 'Adverse Possession', 'Affiant', 'Affidavit',
    'Affirmation', 'Affirmative Action', 'Affirmative Defense', 'Agency', 'Agent', 'Aggravated Damages',
    'Aggravation', 'Aggravating Circumstances', 'Aggrieved Party', 'Agreement', 'Aid and Abet',
    'Alibi', 'Alienation', 'Alimony', 'Allegation', 'Allege', 'Allocution', 'Allotment', 'Allowance',
    'Alternate Juror', 'Alternative Dispute Resolution', 'Ambiguity', 'Amendment', 'Amicus Curiae',
    'Amnesty', 'Annulment', 'Answer', 'Antenuptial Agreement', 'Anticipatory Breach', 'Antitrust Laws',
    'Appeal', 'Appearance', 'Appellant', 'Appellate Court', 'Appellee', 'Appraisal', 'Appraiser',
    'Appreciation', 'Appurtenance', 'Arbitration', 'Arraignment', 'Arrest', 'Arson', 'Article',
    'Assault', 'Assessment', 'Asset', 'Assign', 'Assignment', 'Assumption of Risk', 'Attachment',
    'Attempt', 'Attest', 'Attorney', 'Attorney-Client Privilege', 'Attorney-in-Fact', 'Attractive Nuisance',
    'Auction', 'Authentication', 'Authority', 'Authorization', 'Autopsy', 'Award',
    'Bail', 'Bailiff', 'Bailor', 'Bankruptcy', 'Bar', 'Battery', 'Bench', 'Beneficiary',
    'Bequeath', 'Beyond Reasonable Doubt', 'Bias', 'Bigamy', 'Bill', 'Binding', 'Blackmail',
    'Bona Fide', 'Bond', 'Breach', 'Brief', 'Burden of Proof', 'Burglary',
    'Capital Crime', 'Case Law', 'Causation', 'Cease and Desist', 'Certiorari', 'Chain of Custody',
    'Challenge', 'Chambers', 'Change of Venue', 'Character Evidence', 'Charge', 'Charity',
    'Charter', 'Chattel', 'Check', 'Child Abuse', 'Child Support', 'Circumstantial Evidence',
    'Citation', 'Civil Action', 'Civil Law', 'Civil Liability', 'Civil Rights', 'Claim',
    'Class Action', 'Clear and Convincing Evidence', 'Clemency', 'Closing Argument', 'Codicil',
    'Coercion', 'Collateral', 'Collusion', 'Commencement', 'Commerce Clause', 'Commercial Law',
    'Commitment', 'Common Law', 'Community Property', 'Commutation', 'Comparative Negligence',
    'Compensatory Damages', 'Competence', 'Complaint', 'Compliance', 'Compounding a Crime',
    'Compromise', 'Concealment', 'Conciliation', 'Concurrent Jurisdiction', 'Condemnation',
    'Condition Precedent', 'Confession', 'Confidential Communication', 'Confiscation', 'Conflict of Interest',
    'Conflict of Laws', 'Confrontation Clause', 'Consent', 'Consequential Damages', 'Consideration',
    'Conspiracy', 'Constitution', 'Constitutional Law', 'Construction', 'Constructive Notice',
    'Constructive Trust', 'Contempt of Court', 'Contingency Fee', 'Continuance', 'Contract',
    'Contributory Negligence', 'Conversion', 'Conveyance', 'Conviction', 'Copyright',
    'Coroner', 'Corporate Law', 'Corporation', 'Corpus Delicti', 'Corruption', 'Costs',
    'Counsel', 'Counterclaim', 'Counterfeit', 'Court', 'Court Costs', 'Court of Appeals',
    'Court Order', 'Court Reporter', 'Covenant', 'Credibility', 'Creditor', 'Crime',
    'Criminal Law', 'Cross-Examination', 'Cruel and Unusual Punishment', 'Culpable', 'Custody',
    'Damages', 'Dangerous Weapon', 'Death Penalty', 'Debtor', 'Deceit', 'Decision',
    'Declaration', 'Decree', 'Deed', 'Defamation', 'Default', 'Default Judgment',
    'Defendant', 'Defense', 'Deferred Sentence', 'Deficiency Judgment', 'Delegation', 'Deliberation',
    'Delinquency', 'Delivery', 'Demurrer', 'Deposition', 'Depreciation', 'Dereliction',
    'Descent and Distribution', 'Desertion', 'Detainer', 'Detention', 'Dictum', 'Dilatory',
    'Diligence', 'Direct Evidence', 'Direct Examination', 'Directed Verdict', 'Disbarment',
    'Discharge', 'Disclaimer', 'Discovery', 'Discretion', 'Discrimination', 'Dismissal',
    'Disparagement', 'Disposition', 'Disqualification', 'Dissent', 'Dissolution', 'Distress',
    'Diversity of Citizenship', 'Diversion', 'Dividend', 'Divorce', 'Docket', 'Doctrine',
    'Document', 'Domestic Relations', 'Domicile', 'Double Jeopardy', 'Dower', 'Due Process',
    'Duress', 'Duty',
    // Add more keywords for other letters
  ];
  
  // Filter keywords based on search term and selected letter
  const filteredKeywords = computed(() => {
    let result = keywords;
    
    // Filter by letter if not 'all'
    if (currentLetter.value !== 'all') {
      result = result.filter(keyword => 
        keyword.charAt(0).toUpperCase() === currentLetter.value
      );
    }
    
    // Filter by search term if not empty
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      result = result.filter(keyword => 
        keyword.toLowerCase().includes(term)
      );
    }
    
    return result;
  });
  
  // Toggle dropdown
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  // Filter by letter
  const filterByLetter = (letter: string) => {
    currentLetter.value = letter;
  };
  
  // Select keyword
  const selectKeyword = (keyword: string) => {
    selectedKeyword.value = keyword;
    emit('update:modelValue', keyword);
    isOpen.value = false;
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isOpen.value && !target.closest('.relative')) {
      isOpen.value = false;
    }
  };
  
  // Watch for prop changes
  watch(() => props.modelValue, (newValue) => {
    if (newValue !== undefined) {
      selectedKeyword.value = newValue;
    }
  });
  
  // Lifecycle hooks
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>