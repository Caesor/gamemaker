import simplify from './simplify';

class Coords {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    angleInCycles() {
        var returnValue = Math.atan2(this.y, this.x) / (2 * Math.PI);
        if (returnValue < 0) {
            returnValue += 1;
        }
        return returnValue;
    }

    clone() {
        return new Coords(this.x, this.y);
    }

    dotProduct(other) {
        return this.x * other.x + this.y * other.y;
    }

    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    multiply(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }

    overwriteWith(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    randomize() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    toString() {
        return ("" + this.x + "," + this.y);
    }
    
}

export function convexHullOfPoints(points) {
    var startTime = Date.now();
    var numberOfPoints = points.length;

    var pointsSorted = sortPoints(points);
    var pointOnHull = pointsSorted[0];
    var pointsOnHull = [pointOnHull];

    var displacement = new Coords();
    var angleAbsolutePrev = 0;

    while (pointOnHull != pointsOnHull[0] || pointsOnHull.length == 1) {
        var minAngleRelativeSoFar = Number.POSITIVE_INFINITY;
        var pointWithMinAngleRelativeSoFar = null;

        for (var i = 0; i < numberOfPoints; i++) {
            var pointCandidate = points[i];

            displacement.overwriteWith(
                pointCandidate
            ).subtract(
                pointOnHull
            );

            var distanceFromPointOnHullToCandidate =
                displacement.magnitude();

            if (distanceFromPointOnHullToCandidate != 0) {
                var angleAbsolute = displacement.angleInCycles();
                var angleRelativeToHullEdge =
                    angleAbsolute - angleAbsolutePrev;

                if (angleRelativeToHullEdge < 0) {
                    angleRelativeToHullEdge += 1;
                }

                if (angleRelativeToHullEdge <= minAngleRelativeSoFar) {
                    if (angleRelativeToHullEdge == minAngleRelativeSoFar) {
                        // collinear points; use closest
                        var distancePrev = displacement.overwriteWith(
                            pointWithMinAngleRelativeSoFar
                        ).subtract(
                            pointOnHull
                        ).magnitude();

                        if (distanceFromPointOnHullToCandidate < distancePrev) {
                            minAngleRelativeSoFar =
                                angleRelativeToHullEdge;

                            pointWithMinAngleRelativeSoFar =
                                pointCandidate;
                        }
                    } else {
                        minAngleRelativeSoFar = angleRelativeToHullEdge;
                        pointWithMinAngleRelativeSoFar = pointCandidate;
                    }

                } // end if (angle < minSoFar)

            } // end if (distanceFromPointOnHullToCandidate != 0)

        } // end for (each candidate point)

        pointOnHull = pointWithMinAngleRelativeSoFar;
        pointsOnHull.push(pointOnHull);
        angleAbsolutePrev += minAngleRelativeSoFar;
    }
    // console.log('凸包', Date.now() - startTime);
    startTime = Date.now();
    // 矩形点集越小，碰撞性能越高
    console.log('')
    if(points.length > 2000){
        var simplifyList = simplify(pointsOnHull, 50, true);
    }else{
        var simplifyList = simplify(pointsOnHull, 5, true);
    }
    

    // console.log('简化', Date.now() - startTime);
    return simplifyList;
    // return pointsOnHull;
}

function insert (source, itemToInsert, indexToInsertAt) {
    source.splice(indexToInsertAt, 0, itemToInsert);
}

export function sortPoints(pointsToSort) {
    var pointsSorted = [];

    for (var i = 0; i < pointsToSort.length; i++) {
        var pointToSort = pointsToSort[i];

        var j;
        for (j = 0; j < pointsSorted.length; j++) {
            var pointSorted = pointsSorted[j];
            if (pointToSort.y <= pointSorted.y) {
                if (pointToSort.y == pointSorted.y) {
                    if (pointToSort.x < pointSorted.x) {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        insert(pointsSorted, pointToSort, j);
    }

    return pointsSorted;
}