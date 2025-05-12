<template>
  <ul class="example-2">
    <li class="icon-content" v-for="(icon, index) in icons" :key="index">
      <a
        href="javascript:void(0)"
        :aria-label="icon.ariaLabel"
        :data-social="icon.dataSocial"
        @click="icon.clickHandler"
      >
        <div class="filled" :style="{ backgroundColor: icon.backgroundColor }"></div>
        <svg
          :fill="icon.fill"
          :version="icon.version"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="icon.viewBox"
          xml:space="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g v-html="icon.svgContent"></g>
          </g>
        </svg>
      </a>
      <div class="tooltip">{{ icon.ariaLabel }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SocialMedia",
  props: {
    icons: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.example-2 .icon-content {
  position: relative;
  display: inline-block;
  margin: 0 10px;
}
.example-2 .icon-content a {
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a .filled {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a:hover .filled {
  height: 100%;
}
.example-2 .icon-content .tooltip {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.example-2 .icon-content a:hover ~ .tooltip {
  opacity: 1;
}
</style>
