<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col"
  >
    <!-- Header with logo -->
    <div class="w-full flex justify-center py-4 bg-[#FBD9F3]">
      <div class="flex items-center">
        <img
          src="@/assets/img/logo.png"
          alt="Covenant University Logo"
          class="h-16"
        />
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex items-center justify-center px-4 md:px-0">
      <div class="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative">
        <!-- Login form -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-[#470A34] text-white p-4">
            <h2 class="text-base text-center py-3">
              Kindly Login with your
              <span class="text-[#47CA56]">Username/Email</span> and
              <span class="text-[#47CA56]">Password</span>
            </h2>
          </div>
          <div class="p-8">
            <form @submit.prevent="handleLogin">
              <div class="mb-6">
                <label for="username" class="block text-[#470A34] text-lg mb-2"
                  >Username/Email</label
                >
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="e.g ilemoragbenga@gmail.com"
                  class="w-full p-3 border rounded-xl border-[#BEBEBE] focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div class="mb-4">
                <label for="password" class="block text-[#470A34] text-lg mb-2"
                  >Password</label
                >
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="********"
                  class="w-full p-3 border rounded-xl border-[#BEBEBE] focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div class="flex justify-end mb-6">
                <a href="#" class="text-[#4555FF] font-medium hover:underline"
                  >Forgot Password?</a
                >
              </div>
              <div class="pt-5">
                <button
                  type="submit"
                  class="w-full bg-[#470A34] font-semibold text-white py-3.5 rounded-xl hover:bg-purple-800 transition-colors duration-300"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="hidden md:flex flex-col items-center justify-center">
          <img
            src="@/assets/img/school.png"
            alt="Desktop Interface"
            class="h-auto w-96 rounded-3xl absolute -right-32 -bottom-32"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "nuxt/app";

const router = useRouter();
const username = ref("");
const password = ref("");

const handleLogin = () => {
  // In a real app, you would validate and authenticate here
  if (username.value && password.value) {
    router.push("/dashboard");
  }
};
</script>
