/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import { GlobalComponents } from './../types/component.d'
import XtxSwiper from './XtxSwiper.vue'
import XtxGress from './XtxGress.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGress: typeof XtxGress
  }
}

//组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
