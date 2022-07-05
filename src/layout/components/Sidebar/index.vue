<template>
  <div :class="{'has-logo':showLogo}">
    <!-- 侧边栏顶部title -->
    <logo v-if="showLogo" :collapse="isCollapse" />

    <!-- 侧边栏菜单列 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapState('user',['menuBar']),
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // return this.$router.options.routes //只显示了固定路由，如有权限控制需更改为权限路由
      return this.menuBar //权限路由
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo //是否在侧栏中显示顶部title
    },
    variables() {
      return variables
    },
    isCollapse() {
      //侧边栏是否折叠 折叠状态
      return !this.sidebar.opened
    }
  },
  mounted() {
    // console.log(this.menuBar)
  },
}
</script>
