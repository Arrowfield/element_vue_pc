<script>
  export default {
    name: "FlAvatar",
    props: {
      size: {
        type: [Number, String],
        validator(val) {
          if (typeof val === 'string') {
            return ['large', 'medium', 'small'].includes(val)
          }
          return typeof val === 'number'
        }
      },
      shape: {
        type:String,
        default:"circle",
        validator(val){
          return ['circle','square'].includes(val)
        }
      },
      icon:String,
      src:String,
      alt:String,
      srcSet:String,
      error:Function,
      fit:{
        type:String,
        default:'cover'
      }
    },
    data(){
      return{
        isImageExist:true
      }
    },
    render(){
      return (
        <span>123</span>
      )
    }

  }
</script>

<style src="./avatar.scss" lang="scss" scoped></style>