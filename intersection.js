/**
 * created by yss on 2018/12/25
 */
'use strict';

/**
 * 为方便理解，说明几个关键命名含义：
 * 1. segment: 线段，就是由两个点构成的
 * 2. line: 由多个线段组成的长线。
 * 3. polygan: 多边形区域，主要是用于套索
 */

/**
 * 判断两个线段是否相交
 * @param {Point} p1
 * @param {Point} p2
 * @param {Point} p3
 * @param {Point} p4
 */
export const isIntersectionBySegmentAndSegment = function (p1, p2, p3, p4) {
    const uaT = (p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x);
    const ubT = (p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x);
    const uB = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);

    if (uB !== 0) {
        const ua = uaT / uB;
        const ub = ubT / uB;
        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            return true;
        }
    }
    return false;
};

/**
 * 判断一条线段是否和一条长线（有很多线段组成的线）相交
 * @param {Point} p1
 * @param {Point} p2
 * @param {Array} points
 */
export const isIntersectionBySegmentAndLine = function (p1, p2, points) {
    for (let i = 0, len = points.length - 1; i < len; ++i) {
        // 两点一线，后续考虑直接三个点去做
        if (isIntersectionBySegmentAndSegment(p1, p2, points[i], points[i+1])) {
            return true;
        }
    }
    return false;
};

/**
 * 获取所有和某条线段相交的长线
 * @param {Point} p1
 * @param {Point} p2
 * @param {Array} points
 */
export const getLinesOfIntersectionSegment = function (p1, p2, lines) {
    let len = lines.length;
    const result = [];

    // TODO: 增加矩形相交，排查不必要的计算
    while (len--) {
        if (isIntersectionBySegmentAndLine(p1, p2, lines[len])) {
            result.push(lines[len]);
        }
    }

    return result;
};

/**
 * 获取path2D路径
 * @param {Array} points
 */
function getPath2D (points) {
    const path2D = new Path2D();
    path2D.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; ++i) {
        path2D.lineTo(points[i].x, points[i].y);
    }
    return path2D;
}

/**
 * 多条线和某个区域是否相交
 * @param {CanvasRenderingContext2D} context
 * @param {Array} lines
 * @param {Array} points
 */
export const getLinesOfIntersectionPolygan = function (context, lines, points) {
    // 如果context只包含这个路径的话，下面这句可以忽略
    const path2D = getPath2D(points);
    const result = [];
    for (let i = 0; i < lines.length; ++i) {
        // TODO: 增加矩形相交，排除不必要的计算
        for (let j = 0, line = lines[i].length; j < line.length; ++j) {
            if (context.isPointInPath(path2D, line[j].x, line[j].y)) {
                result.push(line);
                break;
            }
        }
    }

    return result;
};

/**
 * 判断两个矩形是否相交
 * @param {Rect} r1
 * @param {Rect} r2
 */
export const isIntersectionByRectangleAndRectangle = function (r1, r2) {
    if (
        // r2的左上角在r1内
        (r2.x1 > r1.x1 && r2.x1 < r1.x2 && r2.y1 > r1.y1 && r2.y1 < r1.y2) ||
        // r2的左下角在r1内
        (r2.x1 > r1.x1 && r2.x1 < r1.x2 && r2.y2 > r1.y1 && r2.y2 < r1.y2) ||
        // r2的右上角在r1内
        (r2.x2 > r1.x1 && r2.x2 < r1.x2 && r2.y1 > r1.y1 && r2.y1 < r1.y2) ||
        // r2的右下角在r1内
        (r2.x2 > r1.x1 && r2.x2 < r1.x2 && r2.y2 > r1.y1 && r2.y2 < r1.y2)
    ) {
        return true;
    }

    return false;
};
