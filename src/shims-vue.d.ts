//解决not found "./App.vue" 问题
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const component: ComponentOptions
    export default component
}