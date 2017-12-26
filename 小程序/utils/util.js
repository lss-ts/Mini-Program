const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//处理星星的函数
function formatStars(num){
  var first=num.toString().substr(0,1);
  var arr=[];
  for(var i=0;i<5;i++){
    if(i<first){
      arr.push(1);
    }else{
      arr.push(0);
    }
  }
  return arr;
}
//处理多条演员的函数
function formatCasts(castsArr){
  var sureArr=[];
  for (var i =0; i < castsArr.length;i++){
    var obj={
      name:castsArr[i].name,
      imgurl: castsArr[i].avatars.small,

    }
    sureArr.push(obj);
  }
  return sureArr;
}
module.exports = {
  formatTime: formatTime,
  formatStars: formatStars,
  formatCasts: formatCasts
}
