def write_user(user: str, email: str):
  with open('userdb.csv', 'a') as file:
    file.write(f'{user},{email}\n')

def post(self, req):
  body = req.get_json()
  write_user(body['user'], body['email'])
  self.res('Registered')

def get(self, req):
  with open('userdb.csv', 'r') as file:
    data = file.read()
    data = data.split('\n')
    data.pop(len(data) -1)
    data = [line.split(',') for line in data]
    for index in range(len(data)):
      data[index] = [prop.strip() for prop in data[index]]
    props = data.pop(0)
    data = [dict(zip(props, line)) for line in data]
    self.res(data)
