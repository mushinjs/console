<template>
  <div flex font-sans p="y-10" min-h-screen text="center gray-700 dark:gray-200">
    <NavBar />
    <div flex-col flex-auto>
      <Header />
      <RouterView flex-auto />
      <Footer />
    </div>
  </div>
</template>
