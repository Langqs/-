<template>
  <div>
      <!-- inline:代表行内表单，代表一行可以放置多个表单 -->
    <el-form :inline="true" :model="formValue" class="demo-form-inline" :disabled='!!isShow'>
  <el-form-item label="一级分类">
    <el-select v-model="formValue.category1Id" placeholder="请选择" @change="get2">
      <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="二级分类" style="margin-left:10px">
    <el-select v-model="formValue.category2Id" placeholder="请选择" @change="get3">
      <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>

    </el-select>
  </el-form-item>
    <el-form-item label="三级分类" style="margin-left:10px">
    <el-select v-model="formValue.category3Id" placeholder="请选择" @change="getValue">
      <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>

    </el-select>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
export default {
  name: "CategorySelect",
  props:['isShow'],
  data() {
    return {
        list1:[],
        list2:[],
        list3: [],
        formValue: {
          category1Id: '',
          category2Id: '',
          category3Id: ''
        }
    };
  },
  mounted() {
      this.getCategory1List()
  },
  watch: {
      'formValue.category1Id':{
        //   deep:true,
          handler(){
            this.formValue.category2Id='',
            this.formValue.category3Id=''
          }
      },
      'formValue.category2Id':{
        //   deep:true,
          handler(){
            this.formValue.category3Id=''
          }
      }
  },
  methods: {
      //获取一级分类数据
      async getCategory1List(){
        let result = await this.$API.attr.reqCategory1List()
        if (result.code == 200) {
            this.list1 = result.data
        }else{
            this.$message({
                type: "success",
                message: result.message,
            })
        }
      },
      //一级分类得select回调
      async get2(){
          const {category1Id} =this.formValue
          let result = await this.$API.attr.reqCategory2List(category1Id)
          if (result.code == 200) {
              this.list2 = result.data
          }else{
            this.$message({
                type: "success",
                message: result.message,
            })
        }
      },
      //二级分类的select回调
      async get3(){
          const {category2Id} =this.formValue
          let result = await this.$API.attr.reqCategory3List(category2Id)
          if (result.code == 200) {
              this.list3 = result.data
          }else{
            this.$message({
                type: "success",
                message: result.message,
            })
        }
      },
      //三级分类的select回调
      getValue(){
          this.$emit('getCategory',this.formValue)
      }

    },
};
</script>
<style>
</style>