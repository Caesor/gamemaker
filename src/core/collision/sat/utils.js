
import Vector from './Vector';
import Point from './Point';

function getPolygonPointClosestToCircle(polygon, circle) {
    let min = 10000;
    let closestPoint;

    for(let i = 0, len = polygon.points.length; i < len; i++) {
        let testPoint = polygon.points[i]
        let length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2), Math.pow(testPoint.y - circle.y, 2))
        if(length < min) {
            min = length
            closestPoint = testPoint
        }
    }

    return closestPoint
}

export function polygonCollidesWithCircle(polygon, circle) {
    let axes = polygon.getAxes()
    const closestPoint = getPolygonPointClosestToCircle(polygon, circle)
    const v1 = new Vector(new Point(circle.x, circle.y))
    const v2 = new Vector(new Point(closestPoint.x, closestPoint.y))
    axes.push(v1.subtract(v2).normalize())
    return !polygon.separationOnAxes(axes, circle)
}