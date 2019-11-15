<template>
    <div class="result">
        <h1 style="text-align: center;">Game Result</h1>
        <div class="result">
        <ul>
            <li>home</li>
            <li>archives</li>
            <li>tags</li>
            <li>categories</li>
            <li>about</li>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Result',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style  lang="scss" scoped>
body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  list-style-type: none;

  li {
    padding: 6px 0;

    a {
      position: relative;
      display: block;
      padding: 4px 0;
      font-family: Lato, sans-serif;
      color: #ecf0f1;
      text-decoration: none;
      text-transform: uppercase;
      transition: 0.5s;

      &::after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: #3498db;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
      }

      &:hover {
        color: #95a5a6;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
}
</style>
