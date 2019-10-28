/**
 * Created by yss on 9/18/16.
 */
'use strict';

class DateFormat {
    /**
     * 日期格式化
     * @param {Date} date
     */
    constructor (date) {
        this.date = date;
    }

    static toTwoDigit (num) {
        return num < 10 ? '0' + num : num;
    }

    get YY () {
        return this.YYYY.toString().slice(2);
    }

    get YYYY () {
        return this.date.getFullYear();
    }

    get M () {
        return this.date.getMonth() + 1;
    }

    get MM () {
        return DateFormat.toTwoDigit(this.M);
    }

    get d () {
        return this.date.getDay();
    }

    get dd () {
        return DateFormat.WEEK_NAMES[this.d];
    }

    get ddd () {
        return '周' + this.dd;
    }

    get dddd () {
        return '星期' + this.dd;
    }

    get D () {
        return this.date.getDate();
    }

    get DD () {
        return DateFormat.toTwoDigit(this.D);
    }

    get H () {
        return this.date.getHours();
    }

    get HH () {
        return DateFormat.toTwoDigit(this.H);
    }

    get h () {
        let h = this.H;
        return h > 12 ? h - 12 : h;
    }

    get hh () {
        return DateFormat.toTwoDigit(this.h);
    }

    get m () {
        return this.date.getMinutes();
    }

    get mm () {
        return DateFormat.toTwoDigit(this.m);
    }

    get s () {
        return this.date.getSeconds();
    }

    get ss () {
        return DateFormat.toTwoDigit(this.s);
    }
}

DateFormat.WEEK_NAMES = '日,一,二,三,四,五,六'.split(',');

/*
 * 格式化输出日期字符串
 * @param {string} formation
 */
Date.prototype.format = function (formation) {
    const dateFormat = new DateFormat(this);
    return ('' + formation).replace(/Y+|M+|D+|d+|H+|h+|m+|s+/g, function($0) {
        const result = dateFormat[$0];
        return (typeof result === 'undefined') ? $0 : result;
    });
};
