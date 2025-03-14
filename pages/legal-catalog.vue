<template>
    <div class="catalogs-container">
      <h1 class="catalogs-title">Our Catalogs.</h1>
      
      <div class="catalogs-grid">
        <!-- Top Row -->
        <div class="catalog-card">
          <div class="card-image">
            <img src="@/assets/img/book-store1.jpg" alt="Books" />
          </div>
          <div class="card-content">
            <h2 class="card-title">Books <span class="count">(1200+)</span></h2>
            <p class="card-description">
              Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
            </p>
            <button class="view-button">View</button>
          </div>
        </div>
        
        <div class="catalog-card">
          <div class="card-image">
            <img src="@/assets/img/book-store1.jpg" alt="Statutes" />
          </div>
          <div class="card-content">
            <h2 class="card-title">Statutes <span class="count">(2,000+)</span></h2>
            <p class="card-description">
              Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
            </p>
            <button class="view-button">View</button>
          </div>
        </div>
        
        <!-- Middle Row -->
        <div class="catalog-card middle-card">
          <div class="card-image">
            <img src="@/assets/img/book-store1.jpg" alt="Law Reports" />
          </div>
          <div class="card-content">
            <h2 class="card-title">Law Reports <span class="count">(4000+)</span></h2>
            <p class="card-description">
              Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
            </p>
            <button class="view-button">View</button>
          </div>
        </div>
        
        <!-- Bottom Row -->
        <div class="catalog-card">
          <div class="card-image">
            <img src="@/assets/img/book-store1.jpg" alt="Articles and Journals" />
          </div>
          <div class="card-content">
            <h2 class="card-title">Articles/Journals <span class="count">(4200+)</span></h2>
            <p class="card-description">
              Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
            </p>
            <button class="view-button">View</button>
          </div>
        </div>
        
        <div class="catalog-card">
          <div class="card-image">
            <img src="@/assets/img/book-store1.jpg" alt="Client Files" />
          </div>
          <div class="card-content">
            <h2 class="card-title">Client Files <span class="count">(2500+)</span></h2>
            <p class="card-description">
              Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
            </p>
            <button class="view-button">View</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // You can add any reactive data or methods here if needed
  </script>
  
  <style scoped>
  .catalogs-container {
    padding: 2rem;
    background-color: #e0f5e9;
    min-height: 100vh;
    width: 100%;
  }
  
  .catalogs-title {
    text-align: center;
    color: #2c5e3f;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
  }
  
  .catalogs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto auto;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .middle-card {
    grid-column: 1 / 3;
    max-width: 50%;
    margin: 0 auto;
  }
  
  .catalog-card {
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  
  .card-image {
    height: 180px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  .count {
    font-weight: 700;
  }
  
  .card-description {
    color: #666;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .view-button {
    align-self: flex-end;
    background-color: #3c8d50;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-button:hover {
    background-color: #2c6e3c;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .catalogs-grid {
      grid-template-columns: 1fr;
    }
    
    .middle-card {
      grid-column: 1;
      max-width: 100%;
    }
    
    .catalogs-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
  
  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1024px) {
    .middle-card {
      max-width: 70%;
    }
  }
  </style>