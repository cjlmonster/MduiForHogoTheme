import os
import sys
from getopt import getopt
import re
import json

__content__ = os.path.join(os.path.abspath('.'), 'content')

__static__ = os.path.join(os.path.abspath('.'), 'themes', 'mdui', 'static')


def search(buildDraft=False):
    articles = []
    for f1 in os.listdir(__content__):
        section = os.path.join(__content__, f1)
        if os.path.isdir(section) and not section.endswith('tags'):
            print('========= ', section, ' =========')
            for f2 in os.listdir(section):
                page = os.path.join(section, f2)
                if not page.endswith('_index.md'):
                    uri = '/%s/%s' % (f1.lower(), f2.lower()[0: len(f2) - 3])
                    with open(page, 'r', encoding='utf-8') as f:
                        li = f.readlines(500)
                        li = list(map(lambda e: e.replace('\n', ''), li))
                        li = li[1: 5]
                        x = dict(uri=uri)
                        for m in li:
                            key, value = m.split(': ')
                            if key == 'title':
                                value = re.sub(r"[\"]", '', value)
                            elif key == 'draft':
                                value = True if value == 'true' else False
                            elif key == 'tags':
                                value = [] if value == '' else re.sub(r"[\[\]\"]", '', value).split(',')
                            x[key] = value
                        if buildDraft:
                            articles.append(x)
                        elif not x['draft']:
                            articles.append(x)
    json_file = os.path.join(__static__, 'index.json')
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    buildDraft = False
    try:
        args = sys.argv[1:]
        opts, args = getopt(args, 'D')
        buildDraft = opts[0][0] == '-D'
    except Exception as e:
        print(e)
        buildDraft = False
    search(buildDraft)
