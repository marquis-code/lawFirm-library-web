import { defineStore } from 'pinia';

interface LibraryItem {
  id: number;
  [key: string]: any;
}

interface LibraryState {
  books: LibraryItem[];
  lawReports: LibraryItem[];
  articles: LibraryItem[];
  clientFiles: LibraryItem[];
  statues: LibraryItem[];
  users: LibraryItem[];
  showEditModal: boolean;
  currentItem: LibraryItem | null;
  currentItemType: string;
}

export const useLibraryStore = defineStore('library', {
  state: (): LibraryState => ({
    books: [
      { id: 1, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on contract law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 2, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on tort law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 3, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on criminal law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 4, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on property law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 5, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on constitutional law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 6, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on administrative law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 7, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on international law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 8, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on corporate law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
      { id: 9, title: 'Title', author: 'Nathiel jewel', description: 'Legal textbook on tax law', catalogNumber: 'IBN120653', category: 'Books', location: 'Third shelf' },
    ],
    lawReports: [
      { id: 1, title: 'Law Report 1', author: 'Nathiel jewel', description: 'Supreme Court decision on property rights', catalogNumber: 'IBN120653', year: 2022, location: 'Second shelf' },
      { id: 2, title: 'Law Report 2', author: 'Nathiel jewel', description: 'Court of Appeal decision on contract breach', catalogNumber: 'IBN120653', year: 2021, location: 'Second shelf' },
    ],
    articles: [
      { id: 1, title: 'Article 1', author: 'Nathiel jewel', description: 'Analysis of recent constitutional amendments', catalogNumber: 'IBN120653', journal: 'Law Review', location: 'First shelf' },
      { id: 2, title: 'Article 2', author: 'Nathiel jewel', description: 'Critique of judicial activism', catalogNumber: 'IBN120653', journal: 'Legal Studies', location: 'First shelf' },
    ],
    clientFiles: [
      { id: 1, title: 'Client File 1', clientName: 'Nathiel jewel', description: 'Corporate restructuring case', catalogNumber: 'IBN120653', caseNumber: 'CF-2023-001', location: 'Cabinet A' },
      { id: 2, title: 'Client File 2', clientName: 'Nathiel jewel', description: 'Intellectual property dispute', catalogNumber: 'IBN120653', caseNumber: 'CF-2023-002', location: 'Cabinet A' },
    ],
    statues: [
      { id: 1, title: 'Statue 1', yearEnacted: 2020, description: 'Data protection legislation', catalogNumber: 'IBN120653', jurisdiction: 'Federal', location: 'Fourth shelf' },
      { id: 2, title: 'Statue 2', yearEnacted: 2019, description: 'Environmental protection act', catalogNumber: 'IBN120653', jurisdiction: 'State', location: 'Fourth shelf' },
    ],
    users: [
      { id: 1, name: 'Micheal George', email: 'micheal@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Librarian', status: 'Active' },
      { id: 3, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    ],
    showEditModal: false,
    currentItem: null,
    currentItemType: '',
  }),
  
  getters: {
    totalBooks: (state) => state.books.length,
    totalLawReports: (state) => state.lawReports.length,
    totalArticles: (state) => state.articles.length,
    totalClientFiles: (state) => state.clientFiles.length,
    totalStatues: (state) => state.statues.length,
    totalUsers: (state) => state.users.length,
    
    recentRecords: (state) => {
      // Combine all types of records and sort by id (assuming newer records have higher ids)
      const allRecords = [
        ...state.books.map(book => ({ ...book, type: 'Books' })),
        ...state.lawReports.map(report => ({ ...report, type: 'Law report' })),
        ...state.articles.map(article => ({ ...article, type: 'Articles' })),
        ...state.clientFiles.map(file => ({ ...file, type: 'Client file' })),
        ...state.statues.map(statue => ({ ...statue, type: 'Statues' })),
      ];
      
      return allRecords.sort((a, b) => b.id - a.id).slice(0, 10);
    },
  },
  
  actions: {
    // Open edit modal
    openEditModal(item: LibraryItem, type: string) {
      this.currentItem = { ...item };
      this.currentItemType = type;
      this.showEditModal = true;
    },
    
    // Close edit modal
    closeEditModal() {
      this.showEditModal = false;
      this.currentItem = null;
    },
    
    // Update item
    updateItem(updatedItem: LibraryItem) {
      const { id } = updatedItem;
      
      switch (this.currentItemType) {
        case 'book':
          const bookIndex = this.books.findIndex(book => book.id === id);
          if (bookIndex !== -1) {
            this.books[bookIndex] = { ...updatedItem };
          }
          break;
          
        case 'law-report':
          const reportIndex = this.lawReports.findIndex(report => report.id === id);
          if (reportIndex !== -1) {
            this.lawReports[reportIndex] = { ...updatedItem };
          }
          break;
          
        case 'article':
          const articleIndex = this.articles.findIndex(article => article.id === id);
          if (articleIndex !== -1) {
            this.articles[articleIndex] = { ...updatedItem };
          }
          break;
          
        case 'client-file':
          const fileIndex = this.clientFiles.findIndex(file => file.id === id);
          if (fileIndex !== -1) {
            this.clientFiles[fileIndex] = { ...updatedItem };
          }
          break;
          
        case 'statue':
          const statueIndex = this.statues.findIndex(statue => statue.id === id);
          if (statueIndex !== -1) {
            this.statues[statueIndex] = { ...updatedItem };
          }
          break;
          
        case 'user':
          const userIndex = this.users.findIndex(user => user.id === id);
          if (userIndex !== -1) {
            this.users[userIndex] = { ...updatedItem };
          }
          break;
      }
    },
    
    // Add new item
    addItem(newItem: Omit<LibraryItem, 'id'>, type: string) {
      switch (type) {
        case 'book':
          const bookId = this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
          this.books.push({ id: bookId, ...newItem });
          break;
          
        case 'law-report':
          const reportId = this.lawReports.length > 0 ? Math.max(...this.lawReports.map(r => r.id)) + 1 : 1;
          this.lawReports.push({ id: reportId, ...newItem });
          break;
          
        case 'article':
          const articleId = this.articles.length > 0 ? Math.max(...this.articles.map(a => a.id)) + 1 : 1;
          this.articles.push({ id: articleId, ...newItem });
          break;
          
        case 'client-file':
          const fileId = this.clientFiles.length > 0 ? Math.max(...this.clientFiles.map(f => f.id)) + 1 : 1;
          this.clientFiles.push({ id: fileId, ...newItem });
          break;
          
        case 'statue':
          const statueId = this.statues.length > 0 ? Math.max(...this.statues.map(s => s.id)) + 1 : 1;
          this.statues.push({ id: statueId, ...newItem });
          break;
          
        case 'user':
          const userId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
          this.users.push({ id: userId, ...newItem });
          break;
      }
    },
    
    // Delete item
    deleteItem(id: number, type: string) {
      switch (type) {
        case 'book':
          this.books = this.books.filter(book => book.id !== id);
          break;
          
        case 'law-report':
          this.lawReports = this.lawReports.filter(report => report.id !== id);
          break;
          
        case 'article':
          this.articles = this.articles.filter(article => article.id !== id);
          break;
          
        case 'client-file':
          this.clientFiles = this.clientFiles.filter(file => file.id !== id);
          break;
          
        case 'statue':
          this.statues = this.statues.filter(statue => statue.id !== id);
          break;
          
        case 'user':
          this.users = this.users.filter(user => user.id !== id);
          break;
      }
    },
  },
});