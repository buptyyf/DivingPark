from multiprocessing.dummy import Pool as ThreadPool
from lxml.html import fromstring
import requests

class Byrbbs(object):
    def __init__(self):
        self.url = 'https://bbs.byr.cn/rss/topten'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.headers = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def _get_list_info(element):
        title, href, time = [''] * 3
        try:
            href = element.cssselect("guid")[0].text
            # open('text.txt', 'w').write(href)
            print(href)
            title = element.xpath('title')[0].xpath('string(.)')
            print("title:" + title)
            time = element.cssselect('pubDate')[0].text
            print("time: " + time)
        except IndexError:
            print("error!!!!")
            pass
        
        desc = ''
        subdesc = '发表时间: ' + time
        news_info = {
            'title': title,
            'url': href,
            'desc': desc,
            'subdesc': subdesc
        }
        return news_info

    def get_topten(self):
        r = requests.get(self.url, headers=self.headers)
        page_source = r.text
        # open('text.txt', 'w').write(page_source)
        root = fromstring(page_source.encode('utf-8'))
        topten_list = root.cssselect("channel item")

        pool = ThreadPool(8)
        self.records = pool.map(self._get_list_info, topten_list)
        self.records = [obj for obj in self.records if obj is not None]
        pool.close()
        pool.join()

        return self.records
