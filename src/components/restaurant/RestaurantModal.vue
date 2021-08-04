<template>
  <!-- Modal -->
  <div class="modal fade" id="order-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">JUNGTIN Food</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-show="slideInfo.isShowForm">
            <img :src="meal.image_url" class="rounded meal-img" />
            <div class="info-container">
              <h2 class="h3">{{ meal.name }}</h2>
              <p class="text-muted">{{ priceFormatter(meal.price) }}đ</p>
            </div>
            <hr>
            <textarea class="form-control" 
              v-model="message"
              placeholder="Có lời gì muốn gửi cho anh shipper hong ?"></textarea>
            <hr>
            <p class="text-muted">Giao hàng đến</p>
            <input type="text" class="form-control" v-model="address">

            <div class="custom-control custom-switch mt-4">
              <input type="checkbox" class="custom-control-input" 
                v-model="isExtra"
                id="switch">
              <label class="custom-control-label w-50 ml-auto" for="switch">Giao đến tận mồm & ngồi đút cho ăn</label>
            </div>

            <div class="mt-4">
              <label>Số lượng</label>
              <select class="form-control" v-model="quantity">
                <option selected>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <hr>
            <h2>Tổng cộng : <span class="text-muted">{{ priceFormatter(total) }}đ</span></h2>
            <h2 class="h5">Gồm : </h2>
            <div class="order-final-info">
              <ul>
                <li>{{ priceFormatter(meal.price) }}đ x {{ quantity }} món = {{ priceFormatter(total) }}đ</li>
                <li v-if="isExtra">*Phí đút ăn : {{ priceFormatter(96000) }}đ</li>
              </ul>

              <button type="button" class="btn btn-order" @click="nextSlide">Đặt hàng</button>
            </div>
          </div> <!-- end form -->

          <div v-show="!slideInfo.isShowForm">
            <h2 class="h4" style="white-space: pre-line">{{ slideInfo.content }}</h2>
            <button class="btn btn-danger btn-sm mr-2" v-if="anotherAns.isShow" @click="cancelSlide">{{ anotherAns.label }}</button>
            <button class="btn btn-success btn-sm" @click="nextSlide">{{ slideInfo.nextLabel }}</button>
          </div>

        </div> <!-- end modal body -->
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import { computed, reactive, ref, watch } from 'vue';
import numeral from "numeral"

import emailjs from 'emailjs-com';

export default {
  emits: ["close-order-modal"],
  props: {
    meal: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {

    $(document).ready(function() {
      $('#order-modal').modal("show");

      $('#order-modal').on('hidden.bs.modal', function (e) {
        emit("close-order-modal");
      })
    });

    const priceFormatter = (price) => {
      return numeral(price).format("0,0");
    }

    const isExtra = ref(false);
    const quantity = ref(1);
    const address = ref(null);
    const message = ref(null);

    const total = computed(() => {
      const extraFee = isExtra.value ? 96000 : 0;
      return props.meal.price * quantity.value + extraFee;
    });

    const slideCount = ref(0);
    const slideInfo = reactive({
      isShowForm: true,
      content: "",
      nextLabel: "Muốn"
    })
    const anotherAns = reactive({
      isShow: false,
      label: "Không muốn"
    });

    const nextSlide = function() {
      if(slideCount.value === 0) {
        slideInfo.isShowForm = false
        slideInfo.content = "Quán hiện không nhận loại tiền tệ này bạn có muốn trả bằng Yêu Thương ?";          

        slideCount.value++;
      } else if(slideCount.value === 1) {
        slideInfo.content = "Đang tính toán..."
        setTimeout(() => {
          slideInfo.content = `Số tiền bạn đã mua là : ${priceFormatter(total.value)}đ
            \nSau khi quy đổi là : ${convertPrice(total.value)}
            \nBạn có muốn trả không`;
          anotherAns.isShow = true;

          slideCount.value++;
        }, 1500);
      } else if(slideCount.value === 2) {
        slideInfo.content = `...`;
        setTimeout(() => {
          anotherAns.isShow = false;
          slideInfo.content = `Quàoo...`;
          slideInfo.nextLabel = "Tiếp";

          slideCount.value++;
        }, 1000);
      } else if(slideCount.value === 3) {
        slideInfo.content = `...`;
        setTimeout(() => {
          slideInfo.content = `Em ơii :))`;

          slideCount.value++;
        }, 1000);
      } else if(slideCount.value === 4) {
        slideInfo.content = `...`;
        setTimeout(() => {
          slideInfo.content = `Cám ơn em vì đã tin tưởng anh`;

          slideCount.value++;
        }, 2500);

      } else if(slideCount.value === 5) {
        slideInfo.content = `...`;
        setTimeout(() => {
          slideInfo.content = `Anh biết là mình gặp nhau chưa lâu mà anh mời e đi ăn nên e ngại`;

          slideCount.value++;
        }, 1000);

      } else if(slideCount.value === 6) {
        slideInfo.content = `...`;
        setTimeout(() => {
          slideInfo.content = `Anh chỉ muốn hiểu rõ e hơn mà thôi!`;

          slideCount.value++;
        }, 1000);
      } else if(slideCount.value === 7) {
        slideInfo.content = `Cám ơn em đã sử dụng dịch vụ của anh <3`;
        slideInfo.nextLabel = "Đóng"

        emailjs.send('service_3j81weh', 
          'template_xpu5zaf', 
          {
            message: `Món : ${props.meal.name} | 
            Giá : ${props.meal.price} | 
            Số lượng : ${quantity.value} | 
            Extra : ${isExtra.value} | 
            Địa chỉ : ${address.value} | 
            Chú thích : ${message.value} | 
            Tổng : ${total.value} | 
            Convert : ${convertPrice(total.value)}`
          }, "user_DTe8P7PgROSvH4GTd0hnr")
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });

        slideCount.value++;
      } else if(slideCount.value === 8) {
        $('#order-modal').modal('hide');
      }
    }

    const cancelSlide = function() {
      alert("Muốn ăn nhưng không muốn trả tiền à! Anh bắn đó");
    }

    const convertPrice = function(price) {
      if(price <= 30000) 
        return "Nắm tay shipper cái";

      if(price <= 60000) 
        return "Ngồi sau xe nhớ ôm shipper";

      if(price <= 120000) 
        return "Cho shipper hun 1 cái th";

      if(price <= 180000) 
        return "Cho shipper hun ... 2 cái";

      if(price <= 230000) 
        return "Cho shipper hôn vào môi của em";

      if(price <= 270000) 
        return "Cho shipper hôn vào 'đôi' môi của em";

      if(price <= 330000) 
        return "Anh shipper hư hỏng sẽ ăn thịt e đó";

      if(price <= 390000) 
        return "Em mua nhiều quá đó! Tiêu tiền như vậy a phạt chân trên cổ anh nha";
      
      if(price <= 450000) 
        return "E không trả hết nổi đâu! Giờ thì nằm yên để đôi môi và bàn tay của anh làm việc";
      
      if(price > 450000) 
        return "...Em xong rồi !";
    }

    

    return {
      props,

      isExtra,
      quantity,
      address,
      message,
      total,
      slideInfo,
      anotherAns,

      priceFormatter,
      nextSlide,
      cancelSlide
    }
  }

}
</script>

<style scoped>
.meal-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
}

.info-container { 
  margin-top: 28px;
}

.order-final-info {
  display: flex;
  justify-content: space-between;
}

.btn-order {
  background: #3ac5c9;
  color: white;
}
</style>