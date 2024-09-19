<template>
  <div>
    <h1>保存输入内容</h1>
    <button @click="showInputBox">输入内容</button>

    <div v-if="isInputVisible">
      <input v-model="userInput" placeholder="请输入内容" />
      <button @click="saveInput">确定</button>
    </div>

    <h2>已保存的内容：</h2>
    <ul>
      <li v-for="(entry, index) in savedEntries" :key="index">
        {{ entry.date }}: {{ entry.content }}
        <button @click="deleteEntry(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInputVisible: false,
      userInput: '',
      savedEntries: [],
    };
  },
  created() {
    this.fetchSavedEntries(); // 页面加载时获取之前保存的内容
  },
  methods: {
    // 显示输入框
    showInputBox() {
      this.isInputVisible = true;
    },
    // 保存输入内容
    // 保存数据
    async saveInput() {
      if (this.userInput) {
        const response = await fetch("/.netlify/functions/saveEntry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: this.userInput }),
        });
        const data = await response.json();
        this.savedEntries.push(data.entry);
        this.userInput = "";
      }
    },

// 获取数据
    async fetchSavedEntries() {
      const response = await fetch("/.netlify/functions/getEntries");
      const data = await response.json();
      this.savedEntries = data.entries;
    },

// 删除数据
    async deleteEntry(index) {
      await fetch("/.netlify/functions/deleteEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });
      this.savedEntries = this.savedEntries.filter((_, i) => i !== index);
    },
  },
};
</script>

<style scoped>
/* 样式可根据需求自定义 */
</style>
