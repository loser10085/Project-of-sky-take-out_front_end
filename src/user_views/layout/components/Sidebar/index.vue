<template>
  <div>
    <div class="logo">
      <!-- <img
        src="./../../../assets/logo.png"
        width="122.5"
        alt=""
      > -->
      <!-- <img
        src="@/assets/login/login-logo.png"
        alt=""
        style="width: 120px; height: 31px"
      /> -->
      <div v-if="!isCollapse" class="sidebar-logo">
        <img src="@/assets/login/logo.png" style="width: 120px; height: 31px">
      </div>
      <div v-else class="sidebar-logo-mini">
        <img src="@/assets/login/mini-logo.png">
      </div>
    </div>
    <div class="sidebar">
      <el-menu>
        <router-link to="/user/category">
          <el-menu-item index="1-1">
            <i class="el-icon-goods" style="font-size: 20px;max-width: 100%">
              首页
            </i>
          </el-menu-item>
        </router-link>
        <br>
        <router-link to="/user/address">
          <el-menu-item index="1-2">
            <i class="el-icon-location-outline" style="font-size: 20px ;max-width: 100%;">
              地址管理
            </i>
          </el-menu-item>
        </router-link>
        <br>
        <router-link to="/user/orderDetail" style="font-size: 20px;max-width: 100%">
          <el-menu-item index="1-3">
            <i class="el-icon-sell">
              历史订单查询
            </i>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
// import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/_variables.scss'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'
import Cookies from 'js-cookie'
@Component({
  name: 'SideBar'
})
export default class extends Vue {
  private restKey: number = 0
  // get defOpen() {
  //   // const urlArr = this.$route.path.split('/')
  //   // const openStr = urlArr.length > 2 ? `/${urlArr[1]}` : '/'
  //   let path = ['/']
  //   this.routes.forEach((n: any, i: number) => {
  //     if (n.meta.roles && n.meta.roles[0] === this.roles[0]) {
  //       path.splice(0, 1, n.path) //在这里替换了路径,加入了管理员身份判定/////////////////////////////////
  //     }
  //   })
  //   return path
  // }

  // get defAct() {
  //   let path = this.$route.path
  //   return path
  // }

  // get sidebar() {
  //   return AppModule.sidebar
  // }

  // get roles() {
  //   return UserModule.roles
  // }

  // get routes() {
  //   let routes = JSON.parse(
  //     JSON.stringify([...(this.$router as any).options.routes])
  //   )
  //   console.log('-=-=routes=-=-=', routes)
  //   console.log('-=-=routes=-=-=', this.roles[0])
  //   let menuList = []
  //   let menu = routes.find(item => item.path === '/')
  //   if (menu) {
  //     menuList = menu.children
  //   }
  //   console.log('-=-=routes=-wwww=-=', routes)
  //   return menuList
  // }

  get variables() {
    return variables
  }

  // get isCollapse() {
  //   return !this.sidebar.opened
  // }
  // private async logout() {
  //   this.$store.dispatch('LogOut').then(() => {
  //     // location.href = '/'
  //     this.$router.replace({ path: '/login' })
  //   })
  //   // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  // }
}
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  background-color: #ffc100;
  padding: 15px 0 0;
  height: 60px;

  img {
    display: inline-block;
  }
}

.sidebar-logo-mini {
  img {
    width: 30px;
    height: 30px;
  }
}

.el-scrollbar {
  height: 100%;
  background-color: rgb(52, 55, 68);
}

.el-menu {
  border: none;
  height: calc(95vh - 23px);
  width: 100% !important;
  padding: 47px 15px 0;
}
</style>
