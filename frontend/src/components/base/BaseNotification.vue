<template>
  <div>
    <notifications group="global" width="500px" position="bottom center">
      <template slot="body" slot-scope="props">
        <div class="message" :class="notificationType(props.item.type)">
          <div class="message-icon">
            <i class="fa fa-check"></i>
          </div>
          <div class="message-body">
            <h2>{{props.item.title}}</h2>
            <p>{{props.item.text}}</p>
          </div>
          <v-btn class="message-close js-messageClose" icon @click="props.close">
            <v-icon>$vuetify.icons.close</v-icon>
          </v-btn>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
export default {
  methods: {
    notificationType(type) {
      console.log(type);
      switch (type) {
        case "success":
          return "message--green";
        case "error":
          return "message-red";
        case "info":
          return "message-blue";
        default:
          return "message-blue";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// https://codepen.io/hmps/pen/sCnbm

$c-black: #111;
$c-white: #fff;
$c-blues: #2980b9, #0074d9, #009fe3;
$c-greys: #343c3f, #a2acb0, #d9e1e4;
$c-greens: #27ae60, #2ecc40, #01ff70;
$c-reds: #c0392b, #ff4136, #e74c3c;
$c-yellows: #f39c12, #fca624, #f1c40f;
$c-purples: #532e62, #8e44ad, #9b59b6;

* {
  box-sizing: border-box;
}

.message {
  margin: 40px auto 0;
  margin-bottom: 10px;
  width: 500px;
  height: 100px;
  background-color: nth($c-blues, 2);
  color: #fff;
  transition: all 0.2s ease;
  border-radius: 15px;

  &.is-hidden {
    opacity: 0;
    height: 0;
    font-size: 0;
    padding: 0;
    margin: 0 auto;
    display: block;
  }
}
.message--orange {
  background-color: nth($c-yellows, 1);
}

.message--red {
  background-color: nth($c-reds, 2);
}

.message--green {
  background-color: nth($c-greens, 2);
}

.message-icon {
  display: table-cell;
  vertical-align: middle;
  width: 60px;
  padding: 30px;
  text-align: center;
  > i {
    width: 20px;
    font-size: 20px;
  }
}

.message-body {
  display: table-cell;
  vertical-align: middle;
  padding: 15px 10px 15px 5px;

  > p {
    line-height: 1.2;
    margin-top: 6px;
  }
}

.message-button {
  position: relative;
  margin: 15px 5px -10px;
  background-color: rgba(black, 0.25);
  box-shadow: 0 3px rgba(black, 0.4);
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-family: "Source Sans Pro";
  color: #fff;
  outline: none;
  cursor: pointer;

  &:hover {
    background: rgba(black, 0.3);
  }

  &:active {
    background: rgba(black, 0.3);
    box-shadow: 0 0px rgba(black, 0.4);
    top: 3px;
  }
}

.message-close {
  position: absolute;
  background-color: rgba(black, 0.3);
  color: #fff;
  border: none;
  outline: none;
  font-size: 20px;
  right: 5px;
  top: 5px;
  opacity: 0;
  cursor: pointer;

  .message:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: rgba(black, 0.5);
  }
}
</style>