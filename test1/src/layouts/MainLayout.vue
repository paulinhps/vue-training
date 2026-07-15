<script lang="ts" setup />
<template>
    <div class="main-layout">
        <header id="header">
            <h1>Main Layout</h1>
        </header>
        <main id="main" class="main">
            <RouterView />
        </main>
        <footer id="footer">
            <p>&copy; 2024 My Application</p>
        </footer>
    </div>
</template>
<style scoped>
.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main {
    flex: 1;
    padding: 20px;
}

header {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}

footer {
    padding: 10px;
    text-align: center;
    margin-top: auto;
}
</style>