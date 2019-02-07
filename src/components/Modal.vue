<template>
    <div class="modal" v-show="show.modal" @click="closeModal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      show: {
        modal: false
      }
    }
  },
  methods: {
    openModal(item) {
      this.modal.src = item.img;
      this.show.modal = true;
    },
    closeModal() {
      this.modal.src = '';
      this.show.modal = false;
    }
  },
}
</script>

<style lang="scss">
.modal { 
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(100, 100, 100, 0.8);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  .modal-content {
    padding: 5px;
    border-radius: 5px;
    width: calc(100% - 100px);
  }
}
</style>
