<template>
<div class="message">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Tic Tac Toe"
    };
  }
};
</script>

<style>
.message {
  color: blue;
}
</style>