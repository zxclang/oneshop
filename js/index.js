window.onload=function(){
    // 需要做三件事
    // 1.header滚动事件
    headerScroll();
    // 2.倒计时
    cutDownTime();
    // 3.轮播图
    banner();
}

function headerScroll(){
    // 找到所需要的Dom节点对象
    var header = document.querySelector(".jd_header");
    // 获取nav对象
    var nav = document.querySelector(".jd_nav");
    // 计算出需要滚动的最大距离
    var maxDistance = nav.offsetTop+nav.offsetHeight;
    // 注册滚动事件
    window.onscroll = function(){
        // 获得滚动的距离
        var srcollDistance = 0;
        // 各个浏览器获取滚动的对象有不同，需要进行浏览器兼容设定
        if(window.document.body.scrollTop != 0) {
            srcollDistance = document.body.scrollTop;
        } else {
            srcollDistance = document.documentElement.scrollTop;
        }
        var percent = srcollDistance/maxDistance;
        if(percent>1){
            percent = 1;
        }
        header.style.backgroundColor = "rgba(201,21,35,"+percent+")";

    }
}
// 倒计时显示的事件
function cutDownTime(){
    // 设置一个总时长
    var totalSec = 5 * 60 * 60;
    // 获取显示倒计时的标签
    var liObjs = document.querySelectorAll(".main_seckill .seckill_top ul li")
    // 一秒一秒减少需要定时函数
    var timer = setInterval(function(){
        if(totalSec<=0){// 停止定时函数
            clearInterval(timer);
            console.log("活动事件结束，没抢到的就去买原价吧。");
            return;
        }
        totalSec--;

        var hh = Math.floor(totalSec / 3600);
        var mm = Math.floor(totalSec % 3600 / 60)
        var ss = totalSec % 60;


        liObjs[0].innerHTML = Math.floor(hh/10);
        liObjs[1].innerHTML = hh%10;
        liObjs[3].innerHTML = Math.floor(mm/10);
        liObjs[4].innerHTML = mm%10;
        liObjs[6].innerHTML = Math.floor(ss/10);
        liObjs[7].innerHTML = ss%10;
    },1000)
}

function banner(){
    let speed = 3000;
    // 获得轮播图宽度
    var width = document.querySelector(".jd_banner").offsetWidth;
    var ulObj = document.querySelector(".banner_images");// 获取移动的对象
    var indexLiArr = document.querySelectorAll(".jd_banner .banner_index li");
    // 将第一张图片拷贝到最后的位置
    ulObj.appendChild(ulObj.children[0].cloneNode(true));
    var liObjs = ulObj.children;
    ulObj.style.width=liObjs.length+"00%";
    for(let i=0;i<liObjs.length;i++){
        liObjs[i].style.width = 100/liObjs.length+"%";
    }

    // 开始轮播图
    let index = 0;
    var timeID = setInterval(function () {
        ulObj.style.transition = "all 2s";// 开启过渡效果
        index++;// 累加
        ulObj.style.transform="translateX("+ (-index * width) +"px)";// 修改ul的位置，轮播图切换
    },speed)

    // 过渡结束事件 在过渡结束的时候会触发
    ulObj.addEventListener("webkitTransitionEnd",function (e) {
        if(index>=liObjs.length-1){
            index = 0;
            ulObj.style.transition = "";//关闭过渡效果
            ulObj.style.transform="translateX(0px)";
        }
        //设置焦点样式
        for(var i=0;i<indexLiArr.length;i++){
            indexLiArr[i].classList.remove("current");
        }
        let num = index;
        if(num>indexLiArr.length-1){
            num = 0;
        }
        indexLiArr[num].classList.add("current");
    })
    // 注册三个touch事件
    let startX = 0;     // 记录开始的x位置
    let moveX = 0;      // x方向移动的距离

    // 手指按下事件
    ulObj.addEventListener("touchstart",function (e) {
        clearInterval(timeID);
        ulObj.style.transition = "";//关闭过渡效果
        startX = e.touches[0].clientX;// 记录开始值
    })
    // 手指移动
    ulObj.addEventListener("touchmove",function (e) {
        moveX = e.touches[0].clientX - startX;
        ulObj.style.transform="translateX("+ (-index * width + moveX) +"px)";
    })
    // 手指离开事件
    ulObj.addEventListener("touchend",function (e) {
        // distanceX+=moveX;
        let maxDistance = width/3;//最大偏移量
        if(Math.abs(moveX)>maxDistance){//如果移动的距离大于最大偏移量，轮播图移动一张
            moveX>0?index--:index++;// 判断向左移还是向右移
            ulObj.style.transition = "all 2s";
            ulObj.style.transform="translateX("+ (-index * width) +"px)";//开始移动
        }else{//移动距离小于最大偏移量，图片回退
            ulObj.style.transition = "all 2s";
            ulObj.style.transform="translateX("+ (-index * width) +"px)";//开始移动
        }
        timeID = setInterval(function () {//重新开启定时函数
            index++;// 累加
            ulObj.style.transition = "all 2s";// 开启过渡效果
            ulObj.style.transform="translateX("+ (-index * width) +"px)";// 修改ul的位置，轮播图切换
        },speed)
    })
}