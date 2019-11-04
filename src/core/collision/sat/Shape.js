export default class Shape {
    constructor() {
        this.x = undefined
        this.y = undefined
        this.strokeStyle = 'rgba(255, 253, 208, 0.9)'
        this.fillStyle = 'rgba(147, 147, 147, .8)'
    }

    collidesWith(shape) {
        var axes = this.getAxes().concat(shape.getAxes())
        return !this.separationOnAxes(axes, shape)
    }
    separationOnAxes(axes, shape) {
        for(var i = 0, len = axes.length; i < len; i++) {
            const axis = axes[i];
            const projection1 = shape.project(axis);
            const projection2 = this.project(axis);

            if(!projection1.overlaps(projection2)) {
                return true
            }
        }
        return false
    }
    project(axis) {
        throw 'project(axis) not implemented'
    }
    getAxes() {
        throw 'getAxes() not implemented'
    }
    move(dx, dy) {
        throw 'move(dx, dy) not implemented'
    }

    
    createPath(context) {
        throw 'createPath(context) not implemented'
    }
    fill(context) {
        context.save()
        context.fillStyle = this.fillStyle
        this.createPath(context)
        context.fill()
        context.restore()
    }
    stroke(context) {
        context.save()
        context.strokeStyle = this.strokeStyle
        this.createPath(context)
        context.stroke()
        context.restore()
    }
    isPointInPath(context, x, y) {
        this.createPath(context)
        return context.isPointInPath(x, y)
    } 
}