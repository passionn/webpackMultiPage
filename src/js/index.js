import '../css/index.css';
import './print';

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}

var p = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve(2)
    }, 1000);
})

p.then(res=>{
    console.log(res);
})

if (module.hot) {
    module.hot.accept('./print.js', function () {
        // 使用更新过的 pint 模块执行某些操作...
        console.log('我会被打包进来吗？');
    })
}