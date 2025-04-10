<template>
    <div class="catalog-container">
      <h1 class="catalog-title">Our Catalogs.</h1>
      <!-- {{catalogueCountObj}} -->
      <!-- {{bookCategoriesList}} -->
      
      <div class="catalog-grid">
        <!-- Books catalog -->
        <div class="catalog-card">
          <div class="catalog-image-container">
            <img src="@/assets/img/book-store1.jpg" alt="Books" class="catalog-image" />
          </div>
          <div class="catalog-content">
            <h2 class="catalog-name">Books <span class="catalog-count">({{catalogueCountObj?.books ?? '0'}})</span></h2>
            <p class="catalog-description">
              This section contains records of legal books, commentaries, and academic publications available in our library. These cover a wide range of legal subjects, from core principles to specialized areas of law.

            </p>
            <button @click="handleCatalog('books')" class="view-button">View</button>
          </div>
        </div>
        
        <!-- Statutes catalog -->
        <div class="catalog-card">
          <div class="catalog-image-container">
            <img src="@/assets/img/book-store1.jpg" alt="Statutes" class="catalog-image" />
          </div>
          <div class="catalog-content">
            <h2 class="catalog-name">Statutes <span class="catalog-count">({{catalogueCountObj?.statutes ?? '0'}})</span></h2>
            <p class="catalog-description">
              Browse through records of statutory materials housed in our library, including acts of parliament, statutory instruments, and other legislative documents relevant to legal practice.

            </p>
            <button @click="handleCatalog('statutes')" class="view-button">View</button>
          </div>
        </div>
        
        <!-- Law Reports catalog - special position -->
        <div class="catalog-card law-reports">
          <div class="catalog-image-container">
            <img src="@/assets/img/book-store1.jpg" alt="Law Reports" class="catalog-image" />
          </div>
          <div class="catalog-content">
            <h2 class="catalog-name">Law Reports <span class="catalog-count">({{catalogueCountObj?.lawReports ?? '0'}})</span></h2>
            <p class="catalog-description">
              This catalog features records of law reports available in our library, comprising court decisions and judgments that serve as important references for case law and legal precedent.

            </p>
            <button @click="handleCatalog('law-reports')" class="view-button">View</button>
          </div>
        </div>
        
        <!-- Articles/Journals catalog -->
        <div class="catalog-card">
          <div class="catalog-image-container">
            <img src="@/assets/img/book-store1.jpg" alt="Articles and Journals" class="catalog-image" />
          </div>
          <div class="catalog-content">
            <h2 class="catalog-name">Articles/Journals <span class="catalog-count">({{catalogueCountObj?.articles ?? '0'}})</span></h2>
            <p class="catalog-description">
              Here you'll find cataloged records of legal journals, scholarly articles, and research papers accessible in our library. These materials offer insight into various legal issues and developments.

            </p>
            <button @click="handleCatalog('articles-journals')" class="view-button">View</button>
          </div>
        </div>
        
        <!-- Client Files catalog -->
        <div class="catalog-card">
          <div class="catalog-image-container">
            <img src="@/assets/img/book-store1.jpg" alt="Client Files" class="catalog-image" />
          </div>
          <div class="catalog-content">
            <h2 class="catalog-name">Client Files <span class="catalog-count">({{catalogueCountObj?.clientFiles ?? '0'}})</span></h2>
            <p class="catalog-description">
              This section includes catalog records of archived client files stored within our library. These are for internal reference only and contain documentation related to cases handled by the firm.
            </p>
            <button @click="handleCatalog('client-files')" class="view-button">View</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFetchBookCataloges } from '@/composables/modules/home/useFetchBookCatalogue'
  import { useFetchCatalogueCount } from '@/composables/modules/home/useFetchCatalogueCounts'
  const {  bookCategoriesList, loading } = useFetchBookCataloges()
  const { catalogueCountObj, loading:fetchingCatalogueCount} = useFetchCatalogueCount()
  const router = useRouter()
  // TypeScript setup using Composition API

  const handleCatalog = (item: string) => {
    console.log(item,'itemhere',bookCategoriesList.value[0].uuid)
  const categoryMap = {
    books: bookCategoriesList.value[3].uuid,
    statutes: bookCategoriesList.value[0].uuid,
    'law-reports': bookCategoriesList.value[2].uuid,
    'articles-journals': bookCategoriesList.value[1].uuid,
    'client-files': 0, // Same category as 'statutes'
  };
  console.log(categoryMap)

  if(item === 'client-files'){
      router.push(`/client-files-catalog?categoryId=92cef6d0-8e05-4bea-8419-55007a5085d5?name=client-files`)
    }

      if(item === 'books'){
      router.push(`/catalog?caregoryId=${bookCategoriesList.value[3].uuid}&name=${bookCategoriesList.value[3].type}`)
    }

    if(item === 'statutes'){
      router.push(`/catalog?caregoryId=${bookCategoriesList.value[0].uuid}&name=${bookCategoriesList.value[0].type}`)
    }

    if(item === 'law-reports'){
      router.push(`/catalog?caregoryId=${bookCategoriesList.value[2].uuid}&name=${bookCategoriesList.value[2].type}`)
    }


    if(item === 'articles-journals'){
      router.push(`/catalog?caregoryId=${bookCategoriesList.value[1].uuid}&name=${bookCategoriesList.value[1].type}`)
    }

    // if(item === 'client-files'){
    //   router.push(`/catalog?caregoryId=${statuesObj.uuid}`)
    // }

  // const categoryIndex = categoryMap[item];
  // console.log(categoryIndex, 'herro')
  
  // if (categoryIndex !== undefined) {
  //   const categoryObj = bookCategoriesList.value[categoryIndex];
  //   router.push(`/catalog?caregoryId=${categoryObj}`);
  // } else {
  //   console.error(`Invalid category: ${item}`);
  // }
}


  // const handleCatalog = (item:any) => {
  //   const statuesObj = bookCategoriesList.value[0]
  //   const articleObj = bookCategoriesList.value[1]
  //   const lawObj = bookCategoriesList.value[2]
  //   const bookObj = bookCategoriesList.value[3]
  //   if(item === 'books'){
  //     router.push(`/catalog?caregoryId=${bookObj.uuid}`)
  //   }

  //   if(item === 'statutes'){
  //     router.push(`/catalog?caregoryId=${statuesObj.uuid}`)
  //   }

  //   if(item === 'law-reports'){
  //     router.push(`/catalog?caregoryId=${lawObj.uuid}`)
  //   }


  //   if(item === 'articles-journals'){
  //     router.push(`/catalog?caregoryId=${articleObj.uuid}`)
  //   }

  //   if(item === 'client-files'){
  //     router.push(`/catalog?caregoryId=${statuesObj.uuid}`)
  //   }

  // }
  </script>
  
  <style scoped>
  .catalog-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
  }
  
  .catalog-title {
    text-align: center;
    color: #3c7651;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    font-weight: bold;
  }
  
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto;
    gap: 1.5rem;
  }
  
  .catalog-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .catalog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  /* Grid positioning */
  .catalog-card:nth-child(1) {
    grid-column: 1 / span 5;
    grid-row: 1;
  }
  
  .catalog-card:nth-child(2) {
    grid-column: 7 / span 5;
    grid-row: 1;
  }
  
  .catalog-card.law-reports {
    grid-column: 4 / span 5;
    grid-row: 2;
  }
  
  .catalog-card:nth-child(4) {
    grid-column: 1 / span 5;
    grid-row: 3;
  }
  
  .catalog-card:nth-child(5) {
    grid-column: 7 / span 5;
    grid-row: 3;
  }
  
  .catalog-image-container {
    height: 200px;
    overflow: hidden;
  }
  
  .catalog-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .catalog-card:hover .catalog-image {
    transform: scale(1.05);
  }
  
  .catalog-content {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .catalog-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  .catalog-count {
    font-weight: bold;
  }
  
  .catalog-description {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    flex-grow: 1;
  }
  
  .view-button {
    background-color: #3c7651;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: flex-end;
    margin-top: auto;
  }
  
  .view-button:hover {
    background-color: #2c5a3c;
  }
  
  /* Responsive design */
  @media (max-width: 1024px) {
    .catalog-grid {
      grid-template-columns: repeat(6, 1fr);
    }
    
    .catalog-card:nth-child(1) {
      grid-column: 1 / span 3;
      grid-row: 1;
    }
    
    .catalog-card:nth-child(2) {
      grid-column: 4 / span 3;
      grid-row: 1;
    }
    
    .catalog-card.law-reports {
      grid-column: 2 / span 4;
      grid-row: 2;
    }
    
    .catalog-card:nth-child(4) {
      grid-column: 1 / span 3;
      grid-row: 3;
    }
    
    .catalog-card:nth-child(5) {
      grid-column: 4 / span 3;
      grid-row: 3;
    }
  }
  
  @media (max-width: 768px) {
    .catalog-grid {
      grid-template-columns: 1fr;
    }
    
    .catalog-card,
    .catalog-card:nth-child(1),
    .catalog-card:nth-child(2),
    .catalog-card.law-reports,
    .catalog-card:nth-child(4),
    .catalog-card:nth-child(5) {
      grid-column: 1;
      grid-row: auto;
      margin-bottom: 1.5rem;
    }
    
    .catalog-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
  </style>