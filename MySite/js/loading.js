var loadingVM = new Vue({
    el:"#progress-wrapper",
    data:{
        loadingStyle:{
            position:"fixed",
            top:0,
            left:0,
            height:"100%",
            width:"100%",
            zIndex:"9999",
            paddingTop: (innerHeight / 2).toString() + "px",
            background:"rgb(20, 20, 30)",
            opacity:"1",
            transition:"width 1s"
        },
        barType:{
            'progress-bar-success':false
        },
        visiable: true,
        progress: 0
    },
    computed:{
        progressValue: function(){
            return this.progress.toString()+"%";
        }
    }
});


window.addEventListener("resize", function(){
    loadingVM.loadingStyle.paddingTop = (innerHeight / 2).toString() + "px";
});

setTimeout(function loop() {
    if(loadingVM.progress < 90)
    loadingVM.progress += 10;
    setTimeout(loop, 500)
}, 100);