
const getCurrentDate = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthStr = months[now.getMonth()];    
    const yyyymmdd = y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
    const monthyyyy = monthStr + ' '+ y; 
    const arrDate = [yyyymmdd, monthyyyy ]
    return arrDate;
}

console.log(getCurrentDate()[0]);