<template>
  <div class="dogs">
    <h2 class="dogs__title">
      <FontAwesomeIcon class="dogs__logo" :icon="['fas', 'paw']" />
      Dogs & Pups Galore
    </h2>
    <div class="dogs__list">
      <template v-for="breed in breeds" :key="breed.id">
        <div class="dog">
          <div class="dog__name">
            <h3>{{ breed.name }}</h3>
          </div>
          <div class="dog__bred-for">
            <h4>{{ breed.bred_for }}</h4>
          </div>
          <div class="dog__image">
            <img :alt="breed.name" :src="breed.image.url">
            <div class="dog__image--breed-group">
              {{ breed.breed_group || 'Unknown' }}
            </div>
          </div>
          <div class="dog__temperament">
            <div class="dog__temperament--title">
              <h4>Temperament</h4>
            </div>
            <div class="dog__temperament--description">
              {{ breed.temperament }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <button type="button" class="dogs__load-more" @click="loadMore">
      Load more...
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { onMounted } from 'vue'
  import { useDogBreedsApi } from '@/components/Exercise-3/useDogBreedsApi'

  const { breeds, request, loadMore } = useDogBreedsApi()

  onMounted(async () => {
    await request()
  })
</script>


<style lang="scss">
$clip-path: polygon(100% 0, 85% 100%, 0 100%, 0 0);

.dogs {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 12px;

  &__logo {
    color: $color-brand-red;
  }

  &__title {
    color: $color-brand-secondary-dark;
    margin: 24px auto;
    text-align: center;
  }

  &__list {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-template-rows: auto;
    grid-gap: 18px 2%;
  }

  &__load-more {
    all: unset;
    display: block;
    margin: 24px 0;
    background-color: $color-brand-accent-orange;
    color: $color-brand-primary-light;
    padding: 18px;
    clip-path: polygon(100% 0, 93% 100%, 0 100%, 0 0);
    text-align: center;
    box-shadow: $box-shadow-2;

    &:hover {
      cursor: pointer;
      opacity: .9;
    }
  }
}

.dog {
  display: flex;
  flex-direction: column;
  background: linear-gradient($color-brand-secondary-light 50%, $color-white-active 50%);
  box-shadow: $box-shadow-1;

  &__name {
    background-color: $color-brand-blue-dark;
    padding: 18px;
    clip-path: $clip-path;

    h3 {
      margin: 0;
      color: $color-brand-primary-light;
      font-weight: 700;
      font-size: 20px;

      // Make this font a but thicker without having to load any more fonts
      // Sorry IE...
      @supports (-webkit-text-stroke: 1px $color-brand-primary-light) {
        & {
          -webkit-text-stroke: 1px $color-brand-primary-light;
          -webkit-text-fill-color: $color-brand-primary-light;
        }
      }
    }
  }

  &__bred-for {
    z-index: 2;

    h4 {
      display: inline-block;
      margin: 0;
      color: $color-brand-primary-light;
      font-weight: 500;
      background-color: $color-brand-primary-blue;
      padding: 10px 32px 10px 18px;
      clip-path: polygon(100% 0, 85% 100%, 0 100%, 0 0);
      min-width: 60%;
      font-size: 14px;
    }
  }

  &__image {
    position: relative;
    transform: translateY(-12px);
    z-index: 1;

    // This does not cover 100% of cases, especially those where the main focal point is in the
    // upper, left corner, but for 99% of the images, it works well. Perhaps there is a better
    // solution that covers all scenarios.
    img {
      height: 260px;
      width: 356px;
      object-fit: cover;
    }

    &--breed-group {
      position: absolute;
      bottom: 0;
      left: 0;
      // Half of the real size of the box
      transform: translateY(15px);
      display: inline-block;
      color: $color-brand-primary-light;
      padding: 12px 18px;
      background-color: $color-brand-accent-pink;
      min-width: 35%;
      clip-path: polygon(100% 0, 80% 100%, 0 100%, 0 0);
    }
  }

  &__temperament {
    transform: translateY(-18px);

    &--title {
      margin: 0 0 18px;
      background-color: $color-brand-secondary-dark;
      padding: 32px 18px 12px;
      clip-path: polygon(100% 0, 89% 100%, 0 100%, 0 0);

      h4 {
        margin: 0;
        color: $color-brand-primary-light;
      }
    }

    &--description {
      margin: 6px 18px 18px;
    }
  }
}
</style>
