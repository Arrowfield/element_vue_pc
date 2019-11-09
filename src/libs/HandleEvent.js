import Vue from 'vue'

export const handleEvent = {
    on: function (element, eventType, fun, handler) {//事件句柄
        //绑定事件
        if (element instanceof Vue) {
            element.$on(eventType,fun)
        } else {
            element.addEventListener(eventType, fun, handler)

        }
    },
    off: function () {

    }
}