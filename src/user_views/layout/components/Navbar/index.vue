<template>
  <div class="navbar">
    <div class="statusBox">
      <span v-if="status === 1" class="businessBtn">营业中</span>
      <span v-else class="businessBtn closing">打烊中</span>
    </div>

    <div :key="restKey" class="right-menu">
      <div class="avatar-wrapper">
        <div :class="shopShow ? 'userInfo' : ''" @mouseenter="toggleShow" @mouseleave="mouseLeaves">
          <el-button type="primary" :class="shopShow ? 'active' : ''">
            用户<i class="el-icon-arrow-down" />
          </el-button>
          <div v-if="shopShow" class="userList">
            <p class="outLogin" @click="logout">
              退出登录<i />
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 修改密码 -->
    <!-- <Password :dialog-form-visible="dialogFormVisible"
              @handleclose="handlePwdClose" /> -->
    <!-- end -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
// import { AppModule } from '@/store/modules/app'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { getStatus } from '@/api/user/user'
import Cookies from 'js-cookie'
import { debounce, throttle } from '@/utils/common'
import { setNewData, getNewData } from '@/utils/cookies'

// 接口
import { getCountUnread } from '@/api/inform'
// 修改密码弹层
import Password from '../components/password.vue'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
    Password,
  },
})
export default class extends Vue {
  private restKey: number = 0
  private websocket = null
  private newOrder = ''
  private message = ''
  private audioIsPlaying = false
  private audioPaused = false
  private statusValue = true

  private shopShow = false
  private dialogVisible = false
  private status = 1
  private setStatus = 1
  private dialogFormVisible = false
  private ountUnread = 0
  // get ountUnread() {
  //   return Number(getNewData())
  // }
  onload() {
  }
  destroyed() {
    this.websocket.close() //离开路由之后断开websocket连接
  }
  // 下拉菜单显示
  toggleShow() {
    this.shopShow = true
  }
  // 下拉菜单隐藏
  mouseLeaves() {
    this.shopShow = false
  }
  // 触发空白处下来菜单关闭
  handleClose() {
    // clearTimeout(this.leave)
    // this.shopShow = false
  }
  // 退出
  private async logout() {
    this.$router.push('/');//回到登录页面
    localStorage.clear();//清除已有的token
  }
  // 营业状态
  async getStatus() {
    const { data } = await getStatus()
    this.status = data.data
    this.setStatus = this.status
  }

  // 修改密码
  handlePwd() {
    this.dialogFormVisible = true
  }
  // 关闭密码编辑弹层
  handlePwdClose() {
    this.dialogFormVisible = false
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  // overflow: hidden;
  position: relative;
  background: #ffc100;

  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .statusBox {
    float: left;
    height: 100%;
    align-items: center;
    display: flex;
  }

  .hamburger-container {
    // line-height: 54px;

    padding: 0 12px 0 20px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;

    margin-right: 20px;

    color: #333333;
    font-size: 14px;

    span {
      padding: 0 10px;
      width: 130px;
      display: inline-block;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.52);
      }
    }

    .amendPwdIcon {
      i {
        width: 18px;
        height: 18px;
        background: url(./../../../../assets/icons/btn_gaimi@2x.png) no-repeat;
        background-size: contain;
        margin-top: 8px;
      }
    }

    .outLogin {
      i {
        width: 18px;
        height: 18px;
        background: url(./../../../../assets/icons/btn_close@2x.png) no-repeat 100% 100%;
        background-size: contain;
        margin-top: 8px;
      }
    }

    .outLogin {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    // .avatar-container {
    // margin-right: 30px;

    // }
  }

  .rightStatus {
    height: 100%;
    line-height: 60px;
    display: flex;
    align-items: center;
    float: left;
  }

  .avatar-wrapper {
    margin-top: 14px;
    margin-left: 18px;
    position: relative;
    // vertical-align: middle;
    float: right;
    width: 120px;
    text-align: left;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }

    .el-button--primary {
      // height: 32px;
      background: rgba(255, 255, 255, 0.52);
      border-radius: 4px;
      padding-top: 0px;
      padding-bottom: 0px;
      position: relative;
      // top: -15px;
      width: 120px;
      // padding: 11px 12px 10px;
      padding-left: 12px;
      text-align: left;
      border: 0 none;
      height: 32px;
      line-height: 32px;

      &.active {
        background: rgba(250, 250, 250, 0);
        border: 0 none;

        .el-icon-arrow-down {
          transform: rotate(-180deg);
        }
      }
    }
  }

  .businessBtn {
    height: 22px;
    line-height: 20px;
    background: #fd3333;
    border: 1px solid #ffffff;
    border-radius: 4px;
    display: inline-block;
    padding: 0 6px;
    color: #fff;
  }

  .closing {
    background: #6a6a6a;
  }

  .navicon {
    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      vertical-align: sub;
      margin: 0 4px 0 0;
    }
  }

  .operatingState {
    i {
      background: url('./../../../../assets/icons/time.png') no-repeat;
      background-size: contain;
    }
  }

  .mesCenter {
    i {
      background: url('./../../../../assets/icons/msg.png') no-repeat;
      background-size: contain;
    }
  }

  // .el-badge__content.is-fixed {
  //   top: 20px;
  //   right: 6px;
  // }
}
</style>
<style lang="scss">
.el-notification {
  // background: rgba(255, 255, 255, 0.71);
  width: 419px !important;

  .el-notification__title {
    margin-bottom: 14px;
    color: #333;

    .el-notification__content {
      color: #333;
    }
  }
}

.navbar {
  .el-dialog {
    min-width: auto !important;
  }

  .el-dialog__header {
    height: 61px;
    line-height: 60px;
    background: #fbfbfa;
    padding: 0 30px;
    font-size: 16px;
    color: #333;
    border: 0 none;
  }

  .el-dialog__body {
    padding: 10px 30px 30px;

    .el-radio,
    .el-radio__input {
      white-space: normal;
    }

    .el-radio__label {
      padding-left: 5px;
      color: #333;
      font-weight: 700;

      span {
        display: block;
        line-height: 20px;
        padding-top: 12px;
        color: #666;
        font-weight: normal;
      }
    }

    .el-radio__input.is-checked .el-radio__inner {
      &::after {
        background: #333;
      }
    }

    .el-radio-group {
      &>.is-checked {
        border: 1px solid #ffc200;
      }
    }

    .el-radio {
      width: 100%;
      background: #fbfbfa;
      border: 1px solid #e5e4e4;
      border-radius: 4px;
      padding: 14px 22px;
      margin-top: 20px;
    }

    .el-radio__input.is-checked+.el-radio__label {
      span {}
    }
  }

  .el-badge__content.is-fixed {
    top: 24px;
    right: 2px;
    width: 18px;
    height: 18px;
    font-size: 10px;
    line-height: 16px;
    font-size: 10px;
    border-radius: 50%;
    padding: 0;
  }

  .badgeW {
    .el-badge__content.is-fixed {
      width: 30px;
      border-radius: 20px;
    }
  }
}

.el-icon-arrow-down {
  background: url('./../../../../assets/icons/up.png') no-repeat 50% 50%;
  background-size: contain;
  width: 8px;
  height: 8px;
  transform: rotate(0eg);
  margin-left: 16px;
  position: absolute;
  right: 16px;
  top: 12px;

  &:before {
    content: '';
  }
}

.userInfo {
  background: #fff;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  width: 100%;
  border-radius: 4px;
  line-height: 32px;
  padding: 0 0 5px;
  height: 105px;

  // .active {
  //   top: 0;
  //   left: 0;
  // }
  .userList {
    width: 95%;
    // // margin-top: -5px;
    // position: absolute;
    // top: 35px;
    padding-left: 5px;
  }

  p {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    padding: 0 5px 0 7px;

    i {
      margin-left: 10px;

      vertical-align: middle;
      margin-top: 4px;
      float: right;
    }

    &:hover {
      background: #f6f1e1;
    }
  }
}

.msgTip {
  color: #419eff;
  padding: 0 5px;
}

// .el-dropdown{
//   .el-button--primary{
//     height: 32px;
//     background: rgba(255,255,255,0.52);
//     border-radius: 4px;
//     padding-top: 0px;
//     padding-bottom: 0px;
//   }
//   margin-top: 2px;
// }
// .el-popper{
//   top: 45px !important;
//   padding-top: 50px !important;
//   border-radius: 0 0 4px 4px;
// }
// .el-popper[x-placement^=bottom] .popper__arrow::after,.popper__arrow{
//   display: none !important;
// }</style>
