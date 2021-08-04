<template>
  <!-- Category Modal -->
  <div class="modal fade" id="cate-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">JUNGTIN Food</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h1 id="modal-content">{{ props.category.content }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"

export default {
  emits: ["close-cate-modal"],
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {

    $(document).ready(function() {
      $('#cate-modal').modal("show");

      $('#cate-modal').on('hidden.bs.modal', function (e) {
        emit("close-cate-modal");
      })
    });

    

    return {
      props,
    }
  }

}
</script>

<style scoped>
#modal-content {
  white-space: pre-line;
}
</style>