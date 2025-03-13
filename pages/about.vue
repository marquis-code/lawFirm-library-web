<template>
    <div class="bg-white">
      <div class="container mx-auto px-4 py-16">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <!-- Content -->
          <div class="w-full md:w-1/2">
            <h1 class="text-4xl font-serif text-green-800 mb-8">About Us</h1>
            
            <p class="text-lg mb-8">
              Rocksmith chamber law library is your gateway to legal knowledge and research. 
              As a dedicated resource center, we strive to provide our users with access to a 
              vast array of legal materials, cutting-edge technology, and expert assistance.
            </p>
            
            <h2 class="text-3xl font-serif text-green-800 mb-6">Our Mission</h2>
            
            <p class="text-lg mb-6">
              Our mission is to empower legal professionals, students, and the public by providing:
            </p>
            
            <ul class="space-y-4 list-disc pl-6 mb-8">
              <li class="text-lg">
                <span class="font-semibold">Comprehensive Legal Resources:</span> A diverse collection of legal databases, 
                journals, treatises, and other essential materials.
              </li>
              <li class="text-lg">
                <span class="font-semibold">State-of-the-Art Technology:</span> Advanced search tools and digital resources to 
                facilitate efficient research.
              </li>
              <li class="text-lg">
                <span class="font-semibold">Expert Assistance:</span> Knowledgeable librarians who can assist with research 
                queries and guide you through our collections.
              </li>
              <li class="text-lg">
                <span class="font-semibold">Collaborative Spaces:</span> Comfortable and inspiring study areas to foster 
                learning and collaboration.
              </li>
            </ul>
          </div>
          
          <!-- Image -->
          <div class="w-full md:w-1/2">
            <div class="rounded-3xl overflow-hidden">
              <img 
                src="@/assets/img/about-us.png" 
                alt="Library Interior" 
                class="w-full h-auto object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>