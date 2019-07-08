<template>
  <div>
    <el-card class="box-card" v-for="(icons,title) in FontAwesome" :key="title">
      <div slot="header">
        <span>{{ title }}</span>
        <a href="http://fontawesome.io/" target="_blank" style="float: right; padding: 3px 0;font-size: 12px;"
           type="text">More <i class="el-icon-d-arrow-right"></i></a>
      </div>
      <el-row :gutter="20" class="font-awesome">
        <el-col :span="4" v-for="(v,i) in icons" :key="i">
          <i :class="'fa fa-'+v"></i><br/>{{ v }}
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
	
  const FontAwesome = {
    "50 New Icons in 4.7": [
      'address-book', 'address-book-o', 'address-card', 'address-card-o', 'bandcamp',
      'bath', 'bathtub', 'drivers-license', 'drivers-license-o', 'eercast', 'envelope-open', 'envelope-open-o', 'etsy',
      'free-code-camp', 'grav', 'handshake-o', 'id-badge', 'id-card', 'id-card-o', 'imdb', 'linode', 'meetup', 'microchip',
      'podcast', 'quora', 'ravelry', 's15', 'shower', 'snowflake-o', 'superpowers', 'telegram', 'thermometer', 'thermometer-0',
      'thermometer-1', 'thermometer-2', 'thermometer-3', 'thermometer-4', 'thermometer-empty', 'thermometer-full', 'thermometer-half',
      'thermometer-quarter', 'thermometer-three-quarters', 'times-rectangle', 'times-rectangle-o', 'user-circle', 'user-circle-o',
      'user-o', 'vcard', 'vcard-o', 'window-close', 'window-close-o', 'window-maximize', 'window-minimize', 'window-restore', 'wpexplorer'
    ],
  }
  

  export default {
    data() {
      return {
        FontAwesome: FontAwesome,
      }
    },
    methods: {},
    mounted: function () {

    }
  }
</script>
<style lang="scss">
  .box-card {
    border-radius: 0;
  }

  .font-awesome .el-col {
    margin: 20px 0;
    text-align: center;
  }
</style>
