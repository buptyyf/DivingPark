from multiprocessing.dummy import Pool as ThreadPool
from lxml.html import fromstring
import requests

class Hupu(object):
    def __init__(self, bbs_type, bbs_page):
        self.bbs_type = bbs_type
        self.bbs_page = bbs_page
        print("type: " + self.bbs_type)
        self.url = 'https://m.hupu.com/bbs/34-' + self.bbs_page
        if(self.bbs_type == 'shh'):
            self.url = 'https://m.hupu.com/bbs/1048-' + self.bbs_page
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.headers = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_news_info(element):
        title, href, hot, score, time, comments = [''] * 6
        try:
            href = element.cssselect('a')[0].get('href', '')
            title = element.cssselect('h3')[0].text
            time = element.cssselect('div.news-time')[0].text
            comments = element.cssselect('i.icon-comment')[0].getnext().text
            hot = element.cssselect('span.bright-no')[0].text
        except IndexError:
            print("error!!!!")
            score = "0"
            pass
        
        if(score != "0"):
            desc = ''
            subdesc = '亮了: ' + hot + ' | 评论数: ' + comments +  ' | ' + time
            news_info = {
                'title': title,
                'url': href,
                'desc': desc,
                'subdesc': subdesc
            }
            return news_info

    def get_news(self):
        r = requests.get(self.url, headers=self.headers)
        page_source = r.text
        open('text.txt', 'w').write(page_source)
        root = fromstring(page_source)
        element_sel = root.cssselect('div.common-list ul li')

        pool = ThreadPool(8)
        self.records = pool.map(self.get_news_info, element_sel)
        self.records = [obj for obj in self.records if obj is not None]
        pool.close()
        pool.join()

        return self.records
