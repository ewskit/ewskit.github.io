/*
*Console Plug
*
*A tool to take over the console
* Created November 28th 2021 by James Weigand
* Last edit November 28th 2021
*/

(function(){let a=Array,p=a.prototype,m='listen',s=p.slice,u={w:window,d:document,c,O:c,};u.c=u.w.console;u.c[m]=function(g){if(o){o(g)}}})();function o(l){"use strict";let a=Array,p=a.prototype,s=p.slice,u={w:window,d:document,c,O:c,};u.c=u.w.console;let t=['log','error','warn'];function k(m){if(typeof m=='string'){let _o=u.c[m];u.O=_o;u.c[m]=function(){if(l){let e={D:arguments['0'],aD:arguments,M:m,R:new Date()};let fd={Time:e.R,Mode:e.M,AddtionalData:e.aD,Data:e.D};l(fd);if(_o.apply){_o.apply(u.c,arguments);}else{let n=s.apply(arguments).join(' ');_o(n)}}}}}for(let i=0;i<t.length;i++){k(t[i])}};