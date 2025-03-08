// composables/useChatService.ts
import { ref } from 'vue';

export function useChatService() {
  const messages = ref<Array<{type: 'user' | 'bot', text: string}>>([]);
  const isLoading = ref(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    messages.value.push({
      type: 'user',
      text
    });
    
    // Simulate bot response
    isLoading.value = true;
    
    setTimeout(() => {
      // This would be replaced with an actual API call
      const botResponses = {
        'How do i calculate my CGPA?': 'To calculate your CGPA, multiply each course credit by the grade point, sum these values, and divide by the total credits. For example, a 3-credit A (4.0) and a 2-credit B (3.0) would be: ((3×4.0)+(2×3.0))/(3+2) = 3.6 CGPA.',
        'I need a level advisor for my 400l courses this semester?': 'For 400 level course advising, please contact Dr. Johnson in the department office (Room 405) or email advisor@university.edu with your student ID and course interests. Office hours are Monday-Thursday, 10am-2pm.',
        'How do i choose selective courses in computer science?': 'To choose selective courses in computer science, first identify your specialization interests (e.g., AI, networks, security). Check prerequisites, review course evaluations, and consult the department handbook. Your academic advisor can help finalize your selections based on your career goals.'
      };
      
      const defaultResponse = 'Thank you for your question. Please visit the academic advising office for more specific information about your inquiry.';
      
      messages.value.push({
        type: 'bot',
        text: botResponses[text as keyof typeof botResponses] || defaultResponse
      });
      
      isLoading.value = false;
    }, 1000);
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
}