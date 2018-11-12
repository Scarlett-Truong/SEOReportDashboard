
const getCurrentDate = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const min = now.getMinutes();
    const s = now.getSeconds();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthStr = months[now.getMonth()];    
    const yyyymmdd = y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
    const monthyyyy = monthStr + ' '+ y; 
    const yyyymmddhhmmss = y + '-'+ (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d + ' ' + (h < 10 ? '0' : '')+ h + ':' +(min < 10 ? '0' : '')+ min + ':' + (s < 10 ? '0' : '')+s ;
    const arrDate = [yyyymmdd, monthyyyy,yyyymmddhhmmss ]
    return arrDate;
}

// console.log(getCurrentDate()[0]);
// console.log(getCurrentDate()[1]);
// console.log(getCurrentDate()[2]);

var initial_url = 'http://www.mymainsite.com/path/path/needthispath/somepath';
var url = initial_url .split( '/' );

// var updated_url= document.location.hostname + '/' + url[ url.length - 2 ] + '/' + url[ url.length - 1 ];
console.log(url[2])