<template>
    <div>
        <div class="header-home">

            <div class="selectsource">
                <select id="select_source" v-model="selected">
                    <option v-for="(option,index) in options" v-bind:value="option.value" v-bind:key="index" >
                        {{ option.text }}
                    </option>
                    
                </select>
            </div>
            
        </div>
        
    </div>
    
    
</template>

<script>

export default {
  
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'header-home',
    data() {
        return {
            selected: 'webnonel',
            options :[
                { text: 'webnonel', value: 'webnonel' },
                { text: 'wuxiaxorld', value: 'wuxiaxorld' },
                { text: 'novelupdates', value: 'novelupdates' },
                { text: 'babelnovel', value: 'babelnovel' }
            ]   
        }
    },

    
  
}
</script>

<style scoped>
    .header-home{
        
        width: 100%;
        padding:24px;
        position: absolute;
    }

    .header-home #select_source{
        border-radius: 5px;
        padding: 10px;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 18px;
        
    }
    .header-home .selectsource{
        text-align: end;
    }

   

</style>