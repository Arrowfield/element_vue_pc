export default {
    filterArray:function(){

    },
    hitPath:function(ctx,e){
        var canvas = ctx.canvas
        var bb = canvas.getBoundingClientRect()
        var x = (e.clientX - bb.left)*(canvas.width / bb.width)
        var y = (e.clientY - bb.top)*(canvas.height / bb.height)
        return ctx.isPointInPath(x,y)
    }
}


