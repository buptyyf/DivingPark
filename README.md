# DivingPark(潜水党)

Typescript + React + Redux + Flask

* 创建一个python的虚拟环境给项目后台开一个干净的运行环境，使用python3.6(3.5也没问题)

如果没有安装virtualenv，则先进行安装（其实也可以使用python3.3+自带的venv）
```python
pip install virtualenv
```
```
virtualenv -p /usr/local/bin/python3.6 venv
```
此时，虚拟的环境已经创建好了，接下来需要进入这个虚拟环境
```shell
source venv/bin/activate
```

然后再安装后台需要的包，包名都在requirement里，执行
```
pip install -r requirement.txt
```
启动后台
```
python manager.py
```

* 前端的安装并运行

```
npm install -g typescript webpack webpack-dev-server
cd client
npm install
```
启动前台
```
npm start
```
如果不想看前台的log等输出就执行
```
export NODE_ENV=production && npm start
```
在浏览器中打开下面的链接就可以看到内容啦~
```
http://localhost:8080
```

此项目的样式和大体思路来自于[React-News-Board](https://github.com/ethan-funny/React-News-Board)，然后就自己实现了一遍

* 关于部署（Nginx + uwsgi）

这次是第一次进行部署，有很多地方不清楚，就一点点查，看着别人的例子跟着做

首先在服务器上安装Nginx和uwsgi，Nginx用于反向代理的服务器，可以监听任意端口，相当于访问Nginx所代理的地址，在这个项目的例子中，在client中执行了npm run build 之后，前端所有的东西都被打包在了client/built/bundle.js中了，然后把Nignx配置文件中加如下配置就可以把前端的页面配置起来了
```
location / {
    root /usr/local/projectOnline/DivingPark/client/built;
}
```
但这时还不能让项目跑起来，因为还没有配置后台的接口。由于之后将要把Flask后台起在5000端口，所以进行如下配置
```
location /api/ {
    proxy_pass http://127.0.0.1:5000;
}
```
加个软链把这个配置文件放在Nginx和sites-enabled中，然后再重启Nginx就好了。
```
ln -s /usr/local/projectOnline/DivingPark/divingNginx.conf /usr/local/software/nginx/sites-enabled
/usr/local/software/nginx/sbin/nginx -s reload
```

uwsgi是用来启动后台的工具，配置如下
```shell
# 启动在5000
[uwsgi]
http = :5000

# chdir为项目文件的全路径  如果用了venv就用home指向这个虚拟环境
chdir           = /usr/local/projectOnline/DivingPark
home=/usr/local/projectOnline/DivingPark/venv

# 指定启动文件
wsgi-file = manager.py

# application name
callable = app 
```

wsgi配置完成后，执行uwsgi uwsgi.ini就可以把后台跑起来了

