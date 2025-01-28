<script setup lang="ts">
import { SchemaDataset, type SearchParamsBase } from "@piveau/sdk-core";
import { defineHubSearch, dcatApDataset } from "@piveau/sdk-vue";
import { reactive, ref, toRefs } from "vue";

// 👇 Your hub-search definition here
function useDatasetsSearch() {
  return defineHubSearch(
    {
      baseUrl: "https://demo.piveau.io/api/hub/search",
      index: "dataset",
      indexDetails: "datasets",
      facets: ["categories", "publisher", "catalog", "format", "license"],
      schema: SchemaDataset,
    },
    dcatApDataset().setup
  );
}

// 👇 Query parameters
const queryParams: SearchParamsBase = reactive({
  q: "",
  limit: 20,
  page: 1,
  sort: "title+asc",
});

// 👇 Create hub-search asynchronous state
const { useSearch } = useDatasetsSearch();
const {
  isFetching,
  getSearchResultsEnhanced,
  nextPage,
  previousPage,
  getSearchResultsPagesCount,
  getSearchResultsCount,
} = useSearch({
  // Will refetch whenever one of these change
  queryParams: toRefs(queryParams),
});

// 👇 Component-specific datamodels
const searchInput = ref("");
const onSearch = () => (queryParams.q = searchInput.value);
</script>

<template>
  <main class="search-page">
    <div>
      <input
        class="search"
        type="text"
        v-model="searchInput"
        @keyup.enter="onSearch"
        placeholder="Search datasets"
      />
      <div v-if="isFetching">Fetching...</div>
      <div v-else>
        Found {{ getSearchResultsCount }} datasets
        <hr />
        <ul class="dataset-list">
          <li v-for="dataset in getSearchResultsEnhanced" :key="dataset.getId">
            {{ dataset.getTitle }}
          </li>
        </ul>
        <hr />
      </div>
      <section class="pagination">
        <button @click="previousPage">Decrement page</button>
        <span>Page {{ queryParams.page }} of {{ getSearchResultsPagesCount }}</span>
        <button @click="nextPage">Increment page</button>
      </section>
    </div>
  </main>
</template>

<style scoped>
.search-page {
  width: 100%;
}

.search {
  width: 100%;
  padding: 12px 20px;
  margin: 27px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.dataset-list {
  list-style: none;
  padding: 0;
  margin: 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
}
</style>
