from server import app
from flask import jsonify
from server.spiders.hupu import Hupu
from server.spiders.github import GitHub
from server.spiders.byrbbs import Byrbbs
from server.spiders.jobbole import Jobbole
from server.spiders.hacker import HackerNews
from server.spiders.segmentfault import SegmentFault

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/github/repo_list', methods=['GET', 'POST'])
def github():
    github = GitHub()
    github_trend_list = github.get_news()
    dataObj = {
        'list': github_trend_list
    }
    resp = jsonify(
        message = 'OK',
        data = dataObj
    )
    return resp

@app.route('/api/hupu/<bbs_type>/<page>', methods=['GET', 'POST'])
def hupu(bbs_type, page = 1):
    # print(bbs_type, bbs_page)
    hupu = Hupu(bbs_type, page)
    hupu_list = hupu.get_news()
    page_info = {
        'totalPage': 15,
        'curPage': page
    }
    dataObj = {
        'list': hupu_list,
        'page': page_info
    }
    return jsonify(
        message = 'OK',
        data = dataObj
    )
    
@app.route('/api/byrbbs/topten', methods=['GET', 'POST'])
def brybbs():
    byrbbs = Byrbbs()
    byrbbs_topten_list = byrbbs.get_topten()
    dataObj = {
        'list': byrbbs_topten_list
    }

    resp = jsonify(
        message = 'OK',
        data = dataObj
    )
    return resp


@app.route('/api/hacker/news/<page>', methods=['GET'])
def get_hacker_news(page = 1):
    hacker = HackerNews(page)
    news_list = hacker.get_news()
    page_info = {
        'totalPage': 15,
        'curPage': page
    }
    dataObj = {
        'list': news_list,
        'page': page_info
    }
    return jsonify(
        message='OK',
        data=dataObj
    )


@app.route('/api/segmentfault/blogs/<page>', methods=['GET'])
def get_segmentfault_blogs(page = 1):
    sf = SegmentFault(page)
    blogs = sf.get_blogs()
    page_info = {
        'totalPage': 15,
        'curPage': page
    }
    dataObj = {
        'list': blogs,
        'page': page_info
    }
    return jsonify(
        message='OK',
        data=dataObj
    )


@app.route('/api/jobbole/news/<page>', methods=['GET'])
def get_jobbole_news(page = 1):
    jobbole = Jobbole(page)
    blogs = jobbole.get_news()
    page_info = {
        'totalPage': 15,
        'curPage': page
    }
    dataObj = {
        'list': blogs,
        'page': page_info
    }
    return jsonify(
        message='OK',
        data=dataObj
    )