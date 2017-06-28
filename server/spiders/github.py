from multiprocessing.dummy import Pool as ThreadPool
from lxml.html import fromstring
import requests

class GitHub(object):
    def __init__(self):
        self.url = 'https://github.com/trending'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.headers = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_news_info(element):
        title, href, today_stars, stars, fork_num, desc = [''] * 6
        try:
            href = 'https://github.com' + element.cssselect('h3 a')[0].get('href')
            title = element.cssselect('h3 a')[0].get('href')[1:]
            desc = element.cssselect('div.py-1 p')[0].text.strip()
            fork_num = element.cssselect('a.muted-link.mr-3')[1].xpath('string(.)').strip()
            stars = element.cssselect('a.muted-link.mr-3')[0].xpath('string(.)').strip()
            today_stars = element.cssselect('span.float-right')[0].xpath('string(.)').strip()
        except IndexError:
            pass
        
        subdesc = today_stars + ' | total stars: ' + stars + ' | fork: ' + fork_num
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
        element_sel = root.cssselect('ol.repo-list li')

        pool = ThreadPool(8)
        self.records = pool.map(self.get_news_info, element_sel)
        self.records = [obj for obj in self.records if obj is not None]
        pool.close()
        pool.join()

        return self.records
