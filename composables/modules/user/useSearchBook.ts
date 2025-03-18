import { ref } from "vue"
import { user_api } from "@/api_factory/modules/user"

interface SearchFilters {
  str: string | any
  category_id: string | any
}

interface Book {
  id: string
  title: string
  author: string
  description: string
  category?: string
  year?: string
  catalog_no?: string
  cover_image?: string
  [key: string]: any
}

export const useSearchBook = () => {
  const loading = ref(false)
  const bookList = ref<Book[]>([])
  const filters = ref<SearchFilters>({
    category_id: "",
    str: "",
  })

  const searchBook = async (searchFilters?: Partial<SearchFilters>) => {
    // Update filters if provided
    if (searchFilters) {
      filters.value = {
        ...filters.value,
        ...searchFilters,
      }
    }

    // Don't search if string is empty
    if (!filters.value.str || filters.value.str.trim() === "") {
      bookList.value = []
      return { data: [] }
    }

    loading.value = true
    try {
      // Call the API with the current filters
      const res = await user_api.$_search_book(filters.value)
      console.log(res, 'search resfukt')

      if (res && res.type !== "ERROR" && res.data && res.data.data.rows) {
        // Map the API response to our Book interface
        bookList.value = res.data.data.rows.map((item: any) => ({
          ...item,
          id: item.id || `book-${Math.random().toString(36).substr(2, 9)}`,
          title: item.title || "The Law Crowner",
          author: item.author || "Barr. Olatunji Adedeji",
          description:
            item.description ||
            "This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance...",
          category: item.category.name || "Books",
          year: item.year || "2023",
          catalog_no: item.catalog_number || "IBN120653",
          cover_image: item.image || null,
        }))
      } 
      
      // else {
      //   // If we get an error or no data, provide mock data for testing
      //   if (process.env.NODE_ENV === "development") {
      //     bookList.value = [
      //       {
      //         id: "book-1",
      //         title: "The Law Crowner",
      //         author: "Barr. Olatunji Adedeji",
      //         description:
      //           "This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance...",
      //         category: "Books",
      //         year: "2023",
      //         catalog_no: "IBN120653",
      //       },
      //       {
      //         id: "book-2",
      //         title: "Constitutional Rights",
      //         author: "Barr. Olatunji Adedeji",
      //         description:
      //           "This comprehensive guide provides a clear and concise overview of constitutional rights. From civil liberties to due process...",
      //         category: "Books",
      //         year: "2023",
      //         catalog_no: "IBN120654",
      //       },
      //       {
      //         id: "book-3",
      //         title: "Criminal Procedure",
      //         author: "Barr. Olatunji Adedeji",
      //         description:
      //           "This comprehensive guide provides a clear and concise overview of criminal procedure. From arrest to trial...",
      //         category: "Books",
      //         year: "2023",
      //         catalog_no: "IBN120655",
      //       },
      //     ]
      //   } else {
      //     bookList.value = []
      //   }
      // }

      return res?.data || { data: [] }
    } catch (error) {
      console.error("Error searching books:", error)

      // Provide mock data for testing in development
      if (process.env.NODE_ENV === "development") {
        bookList.value = [
          {
            id: "book-1",
            title: "The Law Crowner",
            author: "Barr. Olatunji Adedeji",
            description:
              "This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance...",
            category: "Books",
            year: "2023",
            catalog_no: "IBN120653",
          },
        ]
      } else {
        bookList.value = []
      }

      return { data: [] }
    } finally {
      loading.value = false
    }
  }

  return {
    searchBook,
    bookList,
    loading,
    filters,
  }
}

