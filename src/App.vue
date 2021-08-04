<template>
  <div class="conatiner">
    <div class="row">
      <div class="col-12 col-md-5 mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
/* màu website: background: #3ac5c9; */
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
/* font-family: 'Roboto', sans-serif; */

@font-face{
  font-family: 'BM DANIEL';
  src: url('fonts/BMDANIEL-Bold.woff2') format('woff2');
  font-weight:bold;
  font-style:normal;
}
h1,h2{
	font-family:'BM DANIEL' !important;
	letter-spacing: 0.32px !important;
}
h3{
	letter-spacing: 0.15px;
}

</style>
