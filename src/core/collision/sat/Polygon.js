import Shape from './Shape';
import Vector from './Vector';
import Point from './Point';
import Projection from './Projection';
import { polygonCollidesWithCircle } from './utils'

export default class Polygon extends Shape{
    constructor() {
        super();
        this.points = []
        this.strokeStyle = 'blue'
        this.fillStyle = 'white'
    }

    getAxes() {
        let v1 = new Vector(),
            v2 = new Vector(),
            axes = []
    
        for(let i = 0, len = this.points.length - 1; i < len; i++) {
            v1.x = this.points[i].x
            v1.y = this.points[i].y
    
            v2.x = this.points[i + 1].x
            v2.y = this.points[i + 1].y
    
            axes.push(v1.edge(v2).normal())
        }
    
        v1.x = this.points[this.points.length - 1].x
        v1.y = this.points[this.points.length - 1].y
    
        v2.x = this.points[0].x
        v2.y = this.points[0].y
    
        axes.push(v1.edge(v2).normal())
    
        return axes
    }
    
    project(axis) {
        let scalars = [],
            v = new Vector()
    
        this.points.forEach(function(point) {
            v.x = point.x
            v.y = point.y
            scalars.push(v.dotProduct(axis))
        })
    
        return new Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars))
    }
    
    addPoint(x, y) {
        this.points.push(new Point(x, y))
    }
    
    createPath(context) {
        if(this.points.length === 0) {
            return
        }
    
        context.beginPath()
        context.moveTo(this.points[0].x,this.points[0].y)
    
        for(let i = 0, len = this.points.length; i < len; i++) {
            context.lineTo(this.points[i].x, this.points[i].y)
        }
    
        context.closePath()
    }
    
    move(dx, dy) {
        for(let i = 0, point, len = this.points.length; i < len; i++) {
            point = this.points[i]
            point.x += dx
            point.y += dy
        }
    }
    
    collidesWith(shape) {
        let axes = shape.getAxes()
        if(axes === undefined) {
            return polygonCollidesWithCircle(this, shape)
        } else {
            axes = axes.concat(this.getAxes())
            return !this.separationOnAxes(axes, shape)
        }
    }
}