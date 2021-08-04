<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 mx-auto" id="category-container">
        <div class="category-item" 
          v-for="(cate, i) in categories" 
          :key="i"
          @click="selectCate(i)"
        >
          <img :src="cate.imageUrl">
          <span>{{ cate.name }}</span>
        </div> <!-- Item -->

      </div>
    </div>
  </div>
  <CategoryModal :category="modalCate" 
    @closeCateModal="modalCate = null"
    v-if="modalCate"></CategoryModal>
</template>

<script>
import CategoryModal from '@/components/home/CategoryModal.vue';
import { ref } from 'vue';
import $ from "jquery"
import { categories } from "@/composables/category"
import {useRouter} from "vue-router"


export default {
  components: {
    CategoryModal
  },
  setup() {
    const router = useRouter();

    const modalCate = ref(null);

    const selectCate = function(cateIndex) {
      const cate = categories[cateIndex];
      if(cate.content === null) {
        router.push({name: "mon-anh"})
        return;
      }

      modalCate.value = cate;
    }

    return {
      categories,
      modalCate,

      selectCate
    }
  }
}
</script>

<style scoped>
#category-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-flow: wrap;
}

.category-item {
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px dashed rgba(0, 0, 0, .2);
  justify-content: center;
  margin-top: 6px;
  margin-right: 6px;
}

.category-item span {
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: .9rem;
}

.category-item img {
    width: 45px;
}
</style>