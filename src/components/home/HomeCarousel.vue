<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-8 mx-auto">
                <div class="carousel slide" id="home-carousel" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-interval="3000">
                            <img src="@/assets/images/slide-1.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item" data-interval="3000">
                            <img src="@/assets/images/slide-2.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item" data-interval="3000">
                            <img src="@/assets/images/slide-3.jpg" class="d-block w-100">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#home-carousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#home-carousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.carousel-item img {
    height: 25vh;
    object-fit: contain;
    object-position: center;
}
</style>