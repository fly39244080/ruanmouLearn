<template>
    <div>phone

        <count-down></count-down>
        <Loading></Loading>


    </div>
</template>
<script>

export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }],
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    },

    mounted(){
        
        // this.$loading('正在加载中...');
    }
}
</script>

<style>

</style>
