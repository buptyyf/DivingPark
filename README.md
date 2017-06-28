# DivingPark(潜水党)

Typescript + React + Redux + Flask

* 首先创建一个python的虚拟环境给项目后台开一个干净的运行环境，使用python3.6

如果没有安装virtualenv，则先安装（其实也可以使用python3.3+自带的venv）
```python
pip install virtualenv
```
```
virtualenv -p /usr/local/bin/python3.6 venv
```
此时，虚拟的环境已经创建好了，接下来需要进入这个虚拟环境
```shell
source venv/bin/activate
```

然后再安装后台需要的包，包名都在requirement里，执行
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
如果是生产环境就执行
```
export NODE_ENV=production && npm start
```
在浏览器中打开下面的链接就可以看到内容啦~
```
http://localhost:8080
```

此项目的样式和大体思路来自于[React-News-Board](https://github.com/ethan-funny/React-News-Board)，然后就自己实现了一遍