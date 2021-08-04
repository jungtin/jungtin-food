<template>
  <!-- Modal -->
  <div class="modal fade" id="hello-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">JUNGTIN Food</h5>
        </div>
        <div class="modal-body">
          <p>{{ slideInfo.content }}</p>
          <div class="form-group" v-if="slideInfo.isShowForm">
            <input type="text" :class="['form-control', {'is-invalid': !slideInfo.isMatchPerson}]" aria-describedby="inputHelper" v-model.lazy="inputValue">
            <small id="inputHelper" class="form-text text-muted">{{ slideInfo.inputHelper }}</small>
            <div class="invalid-feedback">
                Tui không cho bạn order đâu! Quay xe đi. Cái này chỉ dành cho 1 người thôii
            </div>
          </div>
          <img src="@/assets/images/baemin-shipper.jpg" class="img-fluid mb-2" v-if="slideInfo.isShowImage">
          <button class="btn btn-sm btn-success" @click="nextSlide">Tiếp</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import { reactive, ref, watch } from 'vue';
import {isNew} from "@/composables/category"

export default {
  setup() {
    $(document).ready(function() {
      $('#hello-modal').modal({backdrop: 'static', keyboard: false});
    });

    const slideCount = ref(0); 
    const slideInfo = reactive({
      content: "Bạn đang đói? hay cô đơn? hay cần ai đó để ăn thịt? Hãy liên hệ 'chúng' tôi nhé",
      isShowForm: false,
      isShowImage: false,

      inputHelper: "Điền tên đầy đủ của bạn",
      isMatchPerson: true
    });

    const inputValue = ref("");

    watch(inputValue, (val) => {
        const name = removeAccents(val).toLowerCase();
        if(name !== matchOrderPerson) {
            slideInfo.isMatchPerson = false;
        }
    })

    const matchOrderPerson = "nguyen ngoc kha tu";
    const removeAccents = (str) => {
      return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const nextSlide = function() {
      if(slideCount.value === 0) {
        slideInfo.isShowForm = true;
        slideInfo.content = "Mà cho hỏi ai đang order vậy ?"

        slideCount.value++;
      } else if(slideCount.value === 1) {
        const name = removeAccents(inputValue.value).toLowerCase();
        if(name !== matchOrderPerson) {
          alert("Dịch vụ này chỉ dùng cho 1 ng duy nhất thôi ! Hình như không phải bạn rồi :(((");
          slideInfo.isMatchPerson = false
          return;
        }

        slideInfo.isShowForm = false;
        slideInfo.content = "Hãy chọn món bạn thích đi nhé !Shipper bên dưới sẽ ship cho bạn";
        slideInfo.isShowImage = true;
        slideInfo.isMatchPerson = true;
        slideCount.value++;
      } else if(slideCount.value === 2) {
        $('#hello-modal').modal("hide");
        setTimeout(() => {
          isNew.value = false; // disable 1st time
        }, 1000);
      }

    }

    return {
      slideInfo,
      inputValue,

      nextSlide
    }
  }

}
</script>

<style>

</style>