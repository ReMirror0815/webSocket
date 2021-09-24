const ws = require('nodejs-websocket');
const PORT = 6678

const arr = []
const server = ws.createServer(connect => {
    const useId = new Date().getTime()
    connect.userName = `用户${useId}`;
    arr.push({
        userName:connect.userName,
        value: '加入聊天室',
        connect,
    })
    broadcast(arr)
    
    connect.on('text', data => {
        const params = {
            connect,
            userName:connect.userName,
            value: data,
        }
        arr.push(params)
        broadcast(arr)
    });

    //连接关闭触发close事件
    connect.on('close',()=>{
        arr.push({
            userName:connect.userName,
            value: '离开了聊天室',
        })
    });

    //注册error事件,用户端口后就会触发该异常
    connect.on('error',()=>{
        console.log('用户连接异常');
    });
});

const broadcast = (arr) => {
    const params = arr.map(({userName,value})=>({
        userName,
        value
    }))
    server.connections.forEach(item => {
        item.send(JSON.stringify(params));
    });
}

server.listen(PORT);
