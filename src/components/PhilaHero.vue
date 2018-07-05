<template>
  <header>
    <div class="hero-content">
      <div class="hero-wrap">
        <div class="row expanded pvxl">
          <div class="medium-14 small-centered columns text-overlay">
            <h1><slot/></h1>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    heroStyle () {
      return this.img ? `background-image: url(${this.img})` : ''
    }
  }
}
</script>

<style lang="sass">
.hero-content
  background-image: url('../assets/hero.png')
</style>
