<script setup>
const props = defineProps({ color: String });
</script>
<template>
  <q-card class="card-cy" :square="true" :bordered="false" :flat="true">
    <div class="itemIcon">
      <i :style="{ border: '1px solid ' + color, backgroundColor: color }">
        <slot name="icon"></slot>
      </i>
      <div class="details">
        <h3>
          <slot name="heading"></slot>
        </h3>
        <span> <slot></slot></span>
      </div>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
.card-cy {
  margin: 5px;
  text-align: center;
  hr {
    border-top: 3px solid rgb(211, 211, 211);
    margin: 20px 15px 0px 15px;
  }
  .itemIcon {
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
      display: flex;
      place-items: center;
      place-content: center;
      width: 75px;
      height: 75px;
      padding: 15px;
      border-radius: 50%;
    }
    .details {
      h3 {
        text-align: center;
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.4rem;
        line-height: normal;
        margin-top: 10px;
      }
      span{
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 780px) {
    .itemIcon {
      i {
        width: 65px;
        height: 65px;
      }
      .details {
        h3 {
          font-size: 20px;
        }
        span{
          font-size: 15px;
        }
      }
    }
  }
}
</style>
