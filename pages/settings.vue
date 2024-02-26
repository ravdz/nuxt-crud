<template>
  <div>
    <NuxtLayout>
      <div class="pb-6 lg:pb-8 flex justify-start items-center">
        <Heading is="h1">Settings</Heading>
      </div>

      <div
        class="mb-10 flex flex-col xl:flex-row justify-start items-start p-8 px-6 border-gray-200 border rounded-md"
      >
        <div
          class="flex flex-col justify-start items-start mb-8 xl:mb-0 xl:mr-14 lg:max-w-80 xl:max-w-none"
        >
          <Heading is="h4">Personal Information</Heading>
          <p class="ku avz awo axo">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form
          @submit="handlerSavePersonalInformation($event)"
          class="flex flex-col justify-start items-stretch xl:flex-grow w-full xl:w-auto"
        >
          <!--        <div class="flex justify-start items-center mb-10">-->
          <!--          <img-->
          <!--            class="inline-block h-28 w-28 rounded-full ring-2 ring-white"-->
          <!--            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"-->
          <!--            alt=""-->
          <!--          />-->
          <!--          <div class="flex flex-col justify-center items-start ml-8">-->
          <!--            <Button type="button">Change avatar</Button>-->
          <!--            <span class="text-xs text-gray-400 mt-3">-->
          <!--              Only JPG, GIF or PNG. 1MB max.-->
          <!--            </span>-->
          <!--          </div>-->
          <!--        </div>-->

          <div class="flex flex-col justify-start items-stretch mb-10">
            <Input
              v-model="email"
              name="email"
              type="email"
              label="Email address"
              :disabled="loading"
            />
          </div>

          <div>
            <Button type="submit" :disabled="loading">Save changes</Button>
          </div>
        </form>
      </div>

      <div
        class="flex flex-col xl:flex-row justify-start items-start p-8 px-6 border-gray-200 border rounded-md"
      >
        <div
          class="flex flex-col justify-start items-start mb-8 xl:mb-0 xl:mr-14 lg:max-w-80 xl:max-w-none"
        >
          <Heading is="h4">Change password</Heading>
          <p class="ku avz awo axo">
            Update your password associated with your account.
          </p>
        </div>

        <form
          class="flex flex-col justify-start items-stretch xl:flex-grow w-full xl:w-auto"
        >
          <div class="flex flex-col justify-start items-stretch mb-10">
            <Input
              v-model="currentPassword"
              name="currentPassword"
              type="password"
              label="Current password"
              :disabled="loading"
            />
          </div>

          <div class="flex flex-col justify-start items-stretch mb-10">
            <Input
              v-model="newPassword"
              name="newPassword"
              type="password"
              label="New password"
              :disabled="loading"
            />
          </div>

          <div class="flex flex-col justify-start items-stretch mb-10">
            <Input
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              :disabled="loading"
            />
          </div>

          <div>
            <Button type="submit" :disabled="loading">Save changes</Button>
          </div>
        </form>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Input from "~/components/Input.vue";

definePageMeta({
  auth: true,
  layout: "auth",
});

const loading = ref<boolean>(false);
const email = ref<string>("");
const currentPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");

const handlerSavePersonalInformation = async (event: Event) => {
  event.preventDefault();
};
</script>
