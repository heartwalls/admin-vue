<script setup lang="ts">
import { User, Lock, Check } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import type { FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入user相关的Pinia仓库
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

const $router = useRouter()
const useStore = useUserStore()
const loading = ref(false)
// 表单验证
const ruleFormRef = ref()

const loginForm = reactive({
  username: '',
  password: '',
  verifyCode: '',
})

const submitForm = async () => {
  await ruleFormRef.value.validate()
  // 登录加载效果
  loading.value = true
  // 登录请求
  try {
    await useStore.userLogin(loginForm)
    // 登录成功后清除登录加载效果
    // TODO 可以在加载的时候限制点击登录的次数，减少服务器压力
    loading.value = false
    // 登录成功后跳转到首页
    $router.push('/')
    ElNotification({
      type: 'success',
      title: `Hi, ${getTime()}`,
      message: '欢迎回来',
    })
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const validateUsername = (rule: any, value: any, callback: any) => {
  // 只包含英文数字和下划线
  const regex = /^[a-zA-Z0-9_]+$/
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (regex.test(value)) {
    callback()
  } else{
    callback(new Error('用户名只能包含字母数字和下划线'))
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const validateVerifyCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
    // TODO 从后端获取验证码
  } else {
    callback()
  }
}

const check = ref(true)

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'change' }],
  password: [{ validator: validatePassword, trigger: 'change' }],
  verifyCode: [{ validator: validateVerifyCode, trigger: 'change' }],
})

const options = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        // 开启鼠标点击的效果
        enable: true,
        mode: 'push',
      },
      onHover: {
        // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab',
      },
      resize: true,
    },
    modes: {
      // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      grab: {
        distance: 200,
        duration: 0.4,
      },
      attract: {
        // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5,
      },
    },
  },
  particles: {
    color: {
      value: '#BA55D3', // 粒子点的颜色
    },
    links: {
      color: '#FFBBFF', // 线条颜色
      distance: 150, //线条距离
      enable: true,
      opacity: 0.4, // 不透明度
      width: 1.2, // 线条宽度
    },
    collisions: {
      enable: true,
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 0.5, // 移动速度
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80, //粒子数
    },
    opacity: {
      //粒子透明度
      value: 0.7,
    },
    shape: {
      //粒子样式
      type: 'star',
    },
    size: {
      //粒子大小
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
}
</script>

<template>
  <div class="login">
    <!--粒子背景插件 粒子背景界面样式class 粒子背景下的具体内容展示-->
    <Particles id="particles" class="login__particles" :options="options" />
    <div class="loginForm">
      <h2>用户登录</h2>
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        style="transform: translate(-30px)"
      >
        <el-form-item label="账号：" prop="username">
          <el-input
            v-model="loginForm.username"
            :prefix-icon="User"
            placeholder="请输入账号"
            maxlength="20"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            maxlength="20"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="验证码：" prop="verifyCode">
          <el-input
            style="width: 150px"
            v-model="loginForm.verifyCode"
            :prefix-icon="Check"
            placeholder="请输入验证码"
            maxlength="4"
            clearable
          />
          <img class="verifyCodeImg" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="check" label="记住密码" />
        </el-form-item>
        <el-button
          class="btn"
          type="primary"
          :loading="loading"
          @click="submitForm()"
        >
          登录
        </el-button>
        <div style="text-align: right; transform: translate(0, 30px)">
          <el-link type="warning" @click="">没有账号？去注册</el-link>
        </div>
      </el-form>
    </div>
    <div class="footer">© 2024 Laughing. All rights reserved.</div>
  </div>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #fff0f5;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.login {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/images/background.png');
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}
.loginForm {
  position: absolute;
  /*定位方式绝对定位absolute*/
  top: 50%;
  left: 50%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px;
  background: rgba(255, 204, 255, 0.3);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing: border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
  将border和padding划归到width范围内*/
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius: 15px;
  /*边框圆角，四个角均为15px*/
}
h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  /*文字居中*/
}
.btn {
  transform: translate(100px);
  width: 250px;
  height: 40px;
  font-size: 15px;
}
</style>
