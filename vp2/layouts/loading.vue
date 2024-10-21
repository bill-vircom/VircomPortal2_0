<template>
    <div class="loading-layout">
        <VProgressCircular
            :size="70"
            indeterminate
            color="primary"
            :width="7"
        />
    </div>
</template>

<style scoped>
    .loading-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>