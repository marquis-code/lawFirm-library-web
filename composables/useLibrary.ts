import { ref, computed } from 'vue';

interface LibraryItem {
  id: number;
  [key: string]: any;
}

// Create state with useState to ensure it's shared across components
export const useLibrary = () => {
  // Books data
  const books = useState<LibraryItem[]>('books', () => [
    { id: 1, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on contract law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 2, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on tort law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 3, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on criminal law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 4, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on property law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 5, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on constitutional law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 6, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on administrative law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 7, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on international law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 8, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on corporate law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    { id: 9, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on tax law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
  ]);

  // Law reports data
  const lawReports = useState<LibraryItem[]>('lawReports', () => [
    { id: 1, title: 'Law Report 1', author: 'Nathiel jewel', description: 'Supreme Court decision on property rights', catalogNumber: 'IBN120653', year: 2022, location: 'Second shelf' },
    { id: 2, title: 'Law Report 2', author: 'Nathiel jewel', description: 'Court of Appeal decision on contract breach', catalogNumber: 'IBN120653', year: 2021, location: 'Second shelf' },
  ]);

  // Articles data
  const articles = useState<LibraryItem[]>('articles', () => [
    { id: 1, title: 'Article 1', author: 'Nathiel jewel', description: 'Analysis of recent constitutional amendments', catalogNumber: 'IBN120653', journal: 'Law Review', location: 'First shelf' },
    { id: 2, title: 'Article 2', author: 'Nathiel jewel', description: 'Critique of judicial activism', catalogNumber: 'IBN120653', journal: 'Legal Studies', location: 'First shelf' },
  ]);

  // Client files data
  const clientFiles = useState<LibraryItem[]>('clientFiles', () => [
    { id: 1, title: 'Client File 1', clientName: 'Nathiel jewel', description: 'Corporate restructuring case', catalogNumber: 'IBN120653', caseNumber: 'CF-2023-001', location: 'Cabinet A' },
    { id: 2, title: 'Client File 2', clientName: 'Nathiel jewel', description: 'Intellectual property dispute', catalogNumber: 'IBN120653', caseNumber: 'CF-2023-002', location: 'Cabinet A' },
  ]);

  // Statues data
  const statues = useState<LibraryItem[]>('statues', () => [
    { id: 1, title: 'Statue 1', yearEnacted: 2020, description: 'Data protection legislation', catalogNumber: 'IBN120653', jurisdiction: 'Federal', location: 'Fourth shelf' },
    { id: 2, title: 'Statue 2', yearEnacted: 2019, description: 'Environmental protection act', catalogNumber: 'IBN120653', jurisdiction: 'State', location: 'Fourth shelf' },
  ]);

  // Users data
  const users = useState<LibraryItem[]>('users', () => [
    { id: 1, name: 'Micheal George', email: 'micheal@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Librarian', status: 'Active' },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
  ]);

  // Computed properties
  const totalBooks = computed(() => books.value.length);
  const totalLawReports = computed(() => lawReports.value.length);
  const totalArticles = computed(() => articles.value.length);
  const totalClientFiles = computed(() => clientFiles.value.length);
  const totalStatues = computed(() => statues.value.length);
  const totalUsers = computed(() => users.value.length);

  // Recent records from all categories
  const recentRecords = computed(() => {
    const allRecords = [
      ...books.value.map(book => ({ ...book, type: 'Books' })),
      ...lawReports.value.map(report => ({ ...report, type: 'Law report' })),
      ...articles.value.map(article => ({ ...article, type: 'Articles' })),
      ...clientFiles.value.map(file => ({ ...file, type: 'Client file' })),
      ...statues.value.map(statue => ({ ...statue, type: 'Statues' })),
    ];
    
    return allRecords.sort((a, b) => b.id - a.id).slice(0, 10);
  });

  // Add item function
  const addItem = (newItem: Omit<LibraryItem, 'id'>, type: string) => {
    switch (type) {
      case 'book':
        const bookId = books.value.length > 0 ? Math.max(...books.value.map(b => b.id)) + 1 : 1;
        books.value.push({ id: bookId, ...newItem });
        break;
        
      case 'law-report':
        const reportId = lawReports.value.length > 0 ? Math.max(...lawReports.value.map(r => r.id)) + 1 : 1;
        lawReports.value.push({ id: reportId, ...newItem });
        break;
        
      case 'article':
        const articleId = articles.value.length > 0 ? Math.max(...articles.value.map(a => a.id)) + 1 : 1;
        articles.value.push({ id: articleId, ...newItem });
        break;
        
      case 'client-file':
        const fileId = clientFiles.value.length > 0 ? Math.max(...clientFiles.value.map(f => f.id)) + 1 : 1;
        clientFiles.value.push({ id: fileId, ...newItem });
        break;
        
      case 'statue':
        const statueId = statues.value.length > 0 ? Math.max(...statues.value.map(s => s.id)) + 1 : 1;
        statues.value.push({ id: statueId, ...newItem });
        break;
        
      case 'user':
        const userId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1;
        users.value.push({ id: userId, ...newItem });
        break;
    }
  };

  // Update item function
  const updateItem = (updatedItem: LibraryItem, type: string) => {
    const { id } = updatedItem;
    
    switch (type) {
      case 'book':
        const bookIndex = books.value.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
          books.value[bookIndex] = { ...updatedItem };
        }
        break;
        
      case 'law-report':
        const reportIndex = lawReports.value.findIndex(report => report.id === id);
        if (reportIndex !== -1) {
          lawReports.value[reportIndex] = { ...updatedItem };
        }
        break;
        
      case 'article':
        const articleIndex = articles.value.findIndex(article => article.id === id);
        if (articleIndex !== -1) {
          articles.value[articleIndex] = { ...updatedItem };
        }
        break;
        
      case 'client-file':
        const fileIndex = clientFiles.value.findIndex(file => file.id === id);
        if (fileIndex !== -1) {
          clientFiles.value[fileIndex] = { ...updatedItem };
        }
        break;
        
      case 'statue':
        const statueIndex = statues.value.findIndex(statue => statue.id === id);
        if (statueIndex !== -1) {
          statues.value[statueIndex] = { ...updatedItem };
        }
        break;
        
      case 'user':
        const userIndex = users.value.findIndex(user => user.id === id);
        if (userIndex !== -1) {
          users.value[userIndex] = { ...updatedItem };
        }
        break;
    }
  };

  // Delete item function
  const deleteItem = (id: number, type: string) => {
    switch (type) {
      case 'book':
        books.value = books.value.filter(book => book.id !== id);
        break;
        
      case 'law-report':
        lawReports.value = lawReports.value.filter(report => report.id !== id);
        break;
        
      case 'article':
        articles.value = articles.value.filter(article => article.id !== id);
        break;
        
      case 'client-file':
        clientFiles.value = clientFiles.value.filter(file => file.id !== id);
        break;
        
      case 'statue':
        statues.value = statues.value.filter(statue => statue.id !== id);
        break;
        
      case 'user':
        users.value = users.value.filter(user => user.id !== id);
        break;
    }
  };

  return {
    // Data
    books,
    lawReports,
    articles,
    clientFiles,
    statues,
    users,
    
    // Computed
    totalBooks,
    totalLawReports,
    totalArticles,
    totalClientFiles,
    totalStatues,
    totalUsers,
    recentRecords,
    
    // Methods
    addItem,
    updateItem,
    deleteItem,
  };
};