import os
from sys import argv
from inspect import getmembers, isfunction
from importlib import import_module
from typing import Iterable, List
from markdown import markdown, Markdown
from time import perf_counter
from flask import Flask, Response, make_response, render_template, request, copy_current_request_context, after_this_request, send_file, abort, session, jsonify

def check_argv(arg: str) -> bool:
  return argv.__contains__(arg)
RENDER_CACHE = check_argv('-c') or check_argv('--cache')
DEVELOPMENT = check_argv('-d') or check_argv('--dev')
Path = os.getcwd()  
app = Flask(__name__, '')
apiPrefix = '/api'
flaskPrefix = "/__flask_page_blob"
MD = Markdown(extensions=['meta'])

def calc_perf(app, render, convert):
  now = perf_counter()
  app = (now - app)
  render2 = render
  convert2 = convert
  if render > 0: render = (render - (now - app))
  if render < 0: render = (render2 - (app - now))
  if convert > 0: convert = ((now - render) - convert)
  if convert < 0: convert = (convert2 - (now - render))
  print('App:', app, 'Render:', render, 'Convert:', convert, 'Render 2:', render2, 'Convert2:', convert2)
  if app != 0: app = 'app;dur=' + str(app)
  else: app = 'miss'
  if render2 == 0: render =  'miss'
  else: render = 'render;dur=' + str(render)
  if convert2 == 0: convert = 'miss'
  else: convert = 'convert;dur=' + str(convert)
  return app + ', ' + render + ', ' + convert

def readDir(path, extension) -> List[str]:
  files = []
  for (pathwalk, _, filenames) in os.walk(Path + '/templates/' + path + '/'):
    for filename in filenames:
      filename = pathwalk + '/' + filename
      if filename.endswith(extension):
        files.append(filename
          .replace(Path, '')
          .replace('\\', '/')
          .replace('//', '/')
        )
  return files

pageCache = dict()
INJECTOR = '__injector.html__'
pageCache[INJECTOR] = None

def createRoute(route: str, filePath: str = '') -> None:
  name = route.replace('/', '_')
  print('Mapped', route, 'to', name)
  pageCache[name] = None
  perf = [0, 0, 0]
  def renderHTML(**kwargs):
    perf[0] = perf_counter()
    res = None
    if RENDER_CACHE or pageCache[name] == None:
      res = render_template(filePath, **kwargs)
      perf[1] = perf_counter()
      res = MD.convert(res)
      perf[2] = perf_counter()
      if not RENDER_CACHE:
        pageCache[name] = res
        print('Cached', name)
    else:
      res: str = pageCache[name]
      perf[1] = perf_counter()
    document = {}
    document['body'] = res
    document['meta'] = MD.Meta
    MD.reset()
    res = jsonify(document)
    res.headers['Content-Type'] = 'application/json'
    res.headers['Server-Timing'] = calc_perf(*perf)
    return res
  renderHTML.__name__ = name
  app.route(route)(renderHTML)
  rawRoute = route.removeprefix(flaskPrefix)
  def injector(**_):
    res = None
    if pageCache[INJECTOR] == None:
      perf[0] = perf_counter()
      res = render_template(
        'injector.html',
        flaskPrefix=flaskPrefix,
        flaskApiPrefix=apiPrefix,
        flaskEnv="true"
      )
      pageCache[INJECTOR] = res
      print('Cached injector')
    else: res = pageCache[INJECTOR]
    perf[1] = perf_counter()
    res = Response(res)
    res.headers['Server-Timing'] = calc_perf(*perf)
    return res
  injector.__name__ = rawRoute.replace('/', '_')
  app.route(rawRoute)(injector)

def createApiRoute(route: str, module: str) -> None:
  ROUTE: List[List[str | function]] = getmembers(import_module(module), isfunction)
  METHODS = [r[0] for r in ROUTE]
  ROUTE = [r[1] for r in ROUTE]
  def api():
    perf = [perf_counter(), 0, 0]
    METHOD = request.method.swapcase()
    if METHODS.__contains__(METHOD):
      response: List[Response] = [Response()]
      response[0].redirectTo = None
      response[0].send = send_file
      response[0].end = abort
      response[0].next = after_this_request
      def Redirect(location: str):
        response[0].redirectTo = location
      def RES(data: Iterable[bytes] | bytes | Iterable[str] | str | None = None):
        newRes = make_response(data)
        response[0].response = newRes.response
        response[0].headers['Content-Type'] = newRes.content_type
        response[0].content_type = newRes.content_type
      response[0].res = RES
      response[0].redirect = Redirect
      fun = ROUTE[METHODS.index(METHOD)]
      fun = fun.__get__(response[0], response[0].__class__)
      setattr(response[0], fun.__name__, fun)
      req = request
      req.session = session
      copy_current_request_context(fun(req=req))
      if METHODS.__contains__('next'):
        copy_current_request_context(ROUTE[METHODS.index('next')]())
      if response[0].redirectTo != None:
        response[0].headers['Form-Redirect'] = response[0].redirectTo
      response[0].headers['Server-Timing'] = calc_perf(*perf)
      return response[0]
  api.__name__ += route.replace('/', '_')
  app.route(route, methods=METHODS)(api)

for file in readDir('api', '.py'):
  createApiRoute(
    apiPrefix + file
      .removeprefix('/templates/api')
      .removesuffix('.py')
      .replace('index', '')
      .replace('//', '/')
      .removesuffix('/') + '/',
    file
      .removeprefix('/')
      .removesuffix('.py')
      .replace('/', '.')
  )

for file in readDir('pages', '.md'):
  createRoute(
    flaskPrefix + file
      .removeprefix('/templates/pages')
      .removesuffix('.md')
      .replace('index', '')
      .replace('//', '/')
      .replace('[', '<')
      .replace(']', '>')
      .removesuffix('/') + '/',
    file.removeprefix('/templates/'),
  )


default_routes: List[str] = ['/']
for route in default_routes:
  perf = [0, 0, 0]
  def injector(**_):
    perf[0] = perf_counter()
    res = None
    if pageCache[INJECTOR] == None:
      res = render_template(
        'injector.html',
        flaskPrefix=flaskPrefix,
        flaskApiPrefix=apiPrefix,
        flaskEnv="true"
      )
      pageCache[INJECTOR] = res
      print('Cached injector')
    else: res = pageCache[INJECTOR]
    perf[1] = perf_counter()
    res = Response(res)
    res.headers['Server-Timing'] = calc_perf(*perf)
    return res
  injector.__name__ = route.replace('/', '_')
  app.route(route)(injector)

if __name__ == '__main__':
  app.run(debug=DEVELOPMENT)