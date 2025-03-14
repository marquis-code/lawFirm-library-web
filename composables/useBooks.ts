import { ref, computed } from 'vue'
import bookImage from '@/assets/img/book-store2.jpg'

export interface Book {
  id: number
  title: string
  author: string
  catalogNumber: string
  category: string
  year: number
  description: string
  location: string
  availability: 'Available' | 'Checked Out'
  coverImage?: string
}

export const useBooks = () => {
  const books = useState<Book[]>('books', () => [
    {
      id: 1,
      title: 'The Law Crowner',
      author: 'Barr. Olatunji Adedeji',
      catalogNumber: 'IBN120653',
      category: 'Book',
      year: 2023,
      description: 'This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance this book covers all essential topics. Ideal for law students, legal professionals, and business owners, it offers practical insights and real-world examples to help you navigate the complexities of contract law.',
      location: 'Third shelf',
      availability: 'Available',
      coverImage: bookImage
    },
    // Add more sample books...
  ])

  // Active letter filter
  const activeLetterFilter = useState<string>('activeLetterFilter', () => '')

  // Filtered books based on active letter
  const filteredBooks = computed(() => {
    if (!activeLetterFilter.value) return books.value
    
    return books.value.filter(book => 
      book.title.toLowerCase().startsWith(activeLetterFilter.value.toLowerCase())
    )
  })

  // Get all unique first letters of book titles
  const availableLetters = computed(() => {
    const letters = new Set(
      books.value.map(book => book.title[0].toUpperCase())
    )
    return Array.from(letters).sort()
  })

  // Set active letter filter
  const setLetterFilter = (letter: string) => {
    activeLetterFilter.value = letter
  }

  // Clear letter filter
  const clearLetterFilter = () => {
    activeLetterFilter.value = ''
  }

  // Add new book
  const addBook = (book: Omit<Book, 'id'>) => {
    const newId = books.value.length > 0 
      ? Math.max(...books.value.map(b => b.id)) + 1 
      : 1
    
    books.value.push({
      id: newId,
      ...book
    })
  }

  // Update existing book
  const updateBook = (updatedBook: Book) => {
    const index = books.value.findIndex(book => book.id === updatedBook.id)
    if (index !== -1) {
      books.value[index] = updatedBook
    }
  }

  // Delete book
  const deleteBook = (id: number) => {
    books.value = books.value.filter(book => book.id !== id)
  }

  return {
    books,
    filteredBooks,
    activeLetterFilter,
    availableLetters,
    setLetterFilter,
    clearLetterFilter,
    addBook,
    updateBook,
    deleteBook
  }
}