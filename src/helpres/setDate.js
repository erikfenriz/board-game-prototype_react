export default () => {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = monthNames[date.getMonth()];
    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
    let min = date.getMinutes();
    if (min < 10) min = '0' + min;
    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;
    return hour + ':' + min + '; ' + dd + ' ' + mm + ' ' + yy;
};