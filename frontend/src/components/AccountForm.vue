<template>
  <div :class="containerClass">
    <div class="form-container sign-up-container">
      <form>
        <h1>Create Account</h1>
        <v-btn class="google-button" rounded color="#df4930">
          <v-icon color="white" left>$vuetify.icons.google</v-icon>
          <b class="white-text">Login with Google</b>
        </v-btn>
        <div class="or-seperator">
          <i>or</i>
        </div>
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="age" type="text" placeholder="Age" />
        <input v-model="sex" type="text" placeholder="Sex" />

        <BaseButton rounded>Sign Up</BaseButton>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form>
        <h1>Sign in</h1>
        <v-btn class="google-button" rounded color="#df4930">
          <v-icon color="white" left>$vuetify.icons.google</v-icon>
          <b class="white-text">Login with Google</b>
        </v-btn>
        <div class="or-seperator">
          <i>or</i>
        </div>
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <BaseButton rounded @click="onSignIn">Sign In</BaseButton>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Login to access MIA experiments</p>
          <BaseButton
            rounded
            class="ghost"
            @click="containerClass['right-panel-active'] = false"
          >Sign In</BaseButton>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Welcome!</h1>
          <p>Sign up to begin participating in MIA experiments</p>
          <BaseButton
            rounded
            class="ghost"
            @click="containerClass['right-panel-active'] = true"
          >Sign Up</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      age: "",
      sex: "",
      containerClass: {
        container: true,
        "right-panel-active": false
      }
    };
  },
  methods: {
    onSignIn() {
      this.$store.dispatch({
        type: "signIn",
        email: this.email,
        password: this.password
      });
      this.$notify({
        group: "global",
        type: "success",
        duration: "2000",
        title: "Successfully signed in!"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #204f70;
  background: -webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364);
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.google-button {
  margin: 0 auto;
  display: block;
}
.or-seperator {
  margin: 30px 0 0;
  text-align: center;
  border-top: 2px solid #ccc;
}
.or-seperator i {
  padding: 5px 7px;
  background: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 20px;
  position: relative;
  top: -11px;
  z-index: 1;
}
.white-text {
  color: #f4f4f4;
}
</style>
