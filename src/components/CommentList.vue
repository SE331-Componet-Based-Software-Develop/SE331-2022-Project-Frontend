<template>
  <div class="comment-list">
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        {{ index + 1 }}.doctor: {{ comment.doctor.name }}
        {{ comment.doctor.sur_name }}
        <div class="list-style">
          <div class="index-list"></div>
          <div>{{ comment.comment }}</div>
        </div>
        <br />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
.list-style {
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  height: auto;
  text-align: center;
  margin-left: 100px;
  margin-right: 100px;
}
li {
  list-style: none;
}
.index-list {
  padding-left: 2px;
  positon: absolute;
  float: left;
}
</style>
