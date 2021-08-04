<template>
  <div class="container">
    <div class="row">
      <img :src="imageUrl" class="res-thumbnail" />
    </div>
    <div class="row" style="margin-top: -50px">
      <div class="res-info-container">
        <h6 class="text-uppercase res-info-badge">Limited</h6>
        <h2 class="res-info-name">Món Anh</h2>
        <small class="text-muted">Món này không phải muốn ăn là được</small>
        <small class="mt-2 text-success"
          >Luôn luôn mở cửa nhưng chỉ bán tùy người</small
        >
      </div>
    </div>

    <div class="row my-5 question-container">
      <h2 class="h4">{{ slideInfo.content }}</h2>
      <input type="text" 
        class="form-control"
        v-if="slideInfo.isShowTextInput" 
        v-model="input" 
        placeholder="Đầy đủ tên của bạn">
      
      <input type="date" 
        class="form-control" 
        v-if="slideInfo.isShowDateInput" 
        v-model="dateInput">
      
      <button v-if="slideInfo.isShowCancel" 
        @click="cancelSlide"
        class="btn-warning btn mt-2">{{ slideInfo.cancelLabel }}</button>

      <button v-if="slideInfo.isShowNext" 
        @click="nextSlide"
        class="btn-next btn mt-2">{{ slideInfo.nextLabel }}</button>
    </div>
    
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import emailjs from 'emailjs-com';

export default {
  setup() {
    const imageUrl = "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.0-9/103803378_1472970009572073_2938353676235905943_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=_OJl6MpvMI8AX-TB3qp&_nc_ht=scontent.fsgn2-5.fna&oh=ae05265830e7caf533aab2b04dc6e9d4&oe=5FF31B0F";

    const slideCount = ref(0);
    const slideInfo = reactive({
      isShowTextInput: false,
      isShowDateInput: false,
      content: "Bạn có muốn ăn món này ?",

      isShowNext: true,
      isShowCancel: false,
      nextLabel: "Có",
      cancelLabel: "Không",
    });

    const input = ref(null);
    const dateInput = ref(null);

    const nextSlide = function() {
      if(slideCount.value === 0) {
        slideInfo.content = "Món này dành cho ai biết thưởng thức thôi";

        slideInfo.isShowCancel = true;
        slideInfo.cancelLabel = "Tôi không biết thưởng thức";
        slideInfo.nextLabel = "Tôi biết thưởng thức";

        slideCount.value++;
      } else if(slideCount.value === 1) {
        slideInfo.content = "...";
        setTimeout(() => {
          slideInfo.content = "Vậy nếu bạn trả lời được 10 câu hỏi thì bạn sẽ được order";
          slideInfo.isShowCancel = false;
          slideInfo.nextLabel = "Okayy dễ mà !";

          slideCount.value++;
        }, 1000);
      } else if(slideCount.value === 2) {
        slideInfo.content = "...";
        setTimeout(() => {
          slideInfo.content = "1. Bạn là ai ?"
          slideInfo.isShowTextInput = true;
          slideInfo.nextLabel = "Tiếp";

          slideCount.value++;
        }, 1000);
      } else if(slideCount.value === 3) {
        const matchOrderPerson = "nguyen ngoc kha tu";
        const removeAccents = (str) => {
          return str.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
        }
        const name = removeAccents(input.value).toLowerCase();
        if(name !== matchOrderPerson) {
          alert("Dịch vụ này chỉ dùng cho 1 ng duy nhất thôi ! Hình như không phải bạn rồi :(((");
          return;
        }
        
        slideInfo.content = "Chào em :))\n2. Lần thứ 2 anh và em gặp nhau là ngày mấy ?"
        slideInfo.isShowTextInput = false;
        slideInfo.isShowDateInput = true;
        slideInfo.nextLabel = "Tiếp";

        slideCount.value++;
      } else if(slideCount.value === 4) {
        slideInfo.content = "...";
        setTimeout(() => {
          if(dateInput.value === "2020-12-03") {
            alert("Wow đúng rồi! Nhớ hay ghê ta");
            slideInfo.content = "3. Ngày sinh của anh là ngày mấy ?"
            slideInfo.isShowTextInput = false;
            slideInfo.isShowDateInput = true;
            slideInfo.nextLabel = "Tiếp";

            slideCount.value++;
          } else {
            alert("Sai rồi !!!");
            return;
          }
        }, 1000);
      } else if(slideCount.value === 5) {
        slideInfo.content = "...";
        setTimeout(() => {
          if(dateInput.value === "2000-03-22") {
            alert("Ghê đó");
            slideInfo.content = "4. Anh chưa nghĩ ra thêm nên thôi e cứ order đi ?"
            slideInfo.isShowTextInput = false;
            slideInfo.isShowDateInput = false;
            slideInfo.nextLabel = "Order";

            slideCount.value++;
          } else {
            alert("Sai rồi !!!");
            return;
          }
        }, 1000);
      } else if(slideCount.value === 6) {
        slideInfo.content = "...";
        
        emailjs.send('service_3j81weh', 
          'template_xpu5zaf', 
          {
            message: `Món Anh đã được đặt hàng vào lúc\n${new Date().toLocaleString("en-US")}`
          }, "user_DTe8P7PgROSvH4GTd0hnr")
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });

        setTimeout(() => {
          slideInfo.content = "Order xong rồi đó !"
          slideInfo.isShowTextInput = false;
          slideInfo.isShowDateInput = false;

          slideCount.value++;
        }, 1000);
      }
    }

    const cancelSlide = function() {
      alert("Vậy thì để anh chỉ :))");
      slideInfo.content = "...";
      setTimeout(() => {
        slideInfo.content = "Vậy nếu bạn trả lời được 10 câu hỏi thì bạn sẽ được order";
        slideInfo.isShowCancel = false;
        slideInfo.nextLabel = "Okayy dễ mà !";

        slideCount.value++;
      }, 1000);
    }

    return {
      imageUrl,

      slideInfo,
      input,
      dateInput,

      nextSlide,
      cancelSlide
    }
  }
}
</script>

<style scoped>
.res-thumbnail {
  width: 100%;
  height: 270px;
  object-fit: cover;
  object-position: center;
}
.res-info-container {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: 5px 8px 22px -5px rgba(0, 0, 0, 0.5);
  border-radius: 7px;

  background: white;
  margin: auto;
}

.res-info-badge {
  color: #3ac5c9;
  font-weight: 700;
}

.btn-next {
  background: #3ac5c9;
  color: white;
}

/* meal */
.meal-section {
  font-size: 1.5rem;
  padding-left: 10px;
}
.meal-container {
    border-top: 3px solid #f8f9fa;
    padding: 14px 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    cursor: pointer;
}

.meal-img {
  width: 100px;
}

.meal-content {
    padding-left: 11px;
}

.meal-content h6 {
    margin-bottom: 2px !important;
}

.question-container {
  padding: 0 20px;
  display: block;
}
</style>
