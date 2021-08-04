import { ref } from "vue";

export const categories = [
  {
    name: "Tạp Hóa",
    imageUrl: require("@/assets/images/item-taphoa.png"),
    content: "Tạp Hóa chỉ để bán chứ không để ăn!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Vietnammm",
    imageUrl: require("@/assets/images/item-vietnam.png"),
    content:
      "Các quán ăn món Việt hiện từ chối phục vụ khách!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Bếp Nhà",
    imageUrl: require("@/assets/images/item-bepnha.png"),
    content: "Muốn ăn thì lăn vào bếp!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Chuỗi",
    imageUrl: require("@/assets/images/item-chuoi.png"),
    content: "Đồ ăn ở chuỗi dễ mập lắm đừng ăn!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Cơm Phần",
    imageUrl: require("@/assets/images/item-comphan.png"),
    content: "Không cho ăn!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Trà Sữa",
    imageUrl: require("@/assets/images/item-trasua.png"),
    content: "Trà sữa uống nhiều ngọt lắm!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Gà Rán",
    imageUrl: require("@/assets/images/item-garan.png"),
    content: "Nhiều mỡ không tốt!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Bún/Phở",
    imageUrl: require("@/assets/images/item-pho.png"),
    content: ". . . Hệ thống lỗi!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Ăn Vặt",
    imageUrl: require("@/assets/images/item-anvat.png"),
    content: "Ở đây chỉ có ăn no chứ không cho ăn vặt!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Món Hàn",
    imageUrl: require("@/assets/images/item-monhan.png"),
    content: "Món Hàn cay lắm!\n\nVui lòng chọn mục khác",
  },
  {
    name: "Healthy",
    imageUrl: require("@/assets/images/item-healthy.png"),
    content:
      "Cám ơn bạn đã chọn thực đơn vì sức khỏe!\n\nVui lòng chọn mục kế bên phải Healthy để chọn món <3",
  },
  {
    name: "Món Anh",
    imageUrl: require("@/assets/images/item-anh.png"),
    content: null,
  },
];

export const isNew = ref(true);