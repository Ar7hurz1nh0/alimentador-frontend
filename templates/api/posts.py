import os
from typing import List
from markdown import Markdown
from flask import render_template

MD = Markdown(extensions=['meta'])

def readDir(path, extension) -> List[str]:
  files = []
  for (pathwalk, _, filenames) in os.walk(os.getcwd() + '/templates/' + path + '/'):
    for filename in filenames:
      filename: str = pathwalk + '/' + filename
      if filename.endswith(extension) and filename.find('[id]') == -1:
        MD.convert(render_template(filename.removeprefix(os.getcwd()).replace('\\', '/').replace('//', '/').removeprefix('/templates/')))
        title = None
        try:
          title = MD.Meta['title'][0]
        except:
          title = ''
        document = {}
        document['id'] = 0
        document['path'] = filename.removeprefix(os.getcwd()).replace('\\', '/').replace('//', '/').removeprefix('/templates/' + path).removesuffix(extension)
        document['title'] = title
        files.append(document)
        MD.reset()
  count = 0
  for file in files:
    file['id'] = count
    count += 1
  return files

def get(self, req):
  self.res(readDir('pages', '.md'))