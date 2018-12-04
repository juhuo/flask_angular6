# 
# <code path>:
#         flask_main.py
#         static/chart/index.html, *.js, *.map, *.ico, ...etc
# <build AngularJS6>
#         ng build, 
#         copy dist/* to static/<project-name>/
#         change or set the index.html with correct route/path
# <debug angularJS seperatly>
#           . Take out "static path" in this file.  by # DEBUG = 1
#           . change URL at AngularJS Service
#
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from flask import render_template

app = Flask(__name__, static_url_path='')
api = Api(app)

CORS(app)


import logging, uuid
from mockData import get_json_chart_data 

#DEBUG = 1 #None
DEBUG = None

class StorageEngine(object):
    store = {}

    def get_things(self, marker, limit, user_id):
        #return [{'id': str(uuid.uuid4()), 'color': 'green'}]
        return self.store[user_id]

    def add_thing(self, thing, user_id):
        self.store[user_id] = thing
        thing['id'] = str(uuid.uuid4())
        return thing


class ChartResource(Resource):

    def __init__(self):
        super().__init__()
        db = StorageEngine()
        self.db = db
        self.logger = logging.getLogger('filesapp.' + __name__)
        self.optionReqData =[];

    def get(self, user_id=None, index_id=None):
        print("user_id", user_id)

        self.optionReqData =[];
        """
        for key, value in req.params.items():
            print (key, value)
            self.optionReqData.append(key);
        """
        print("Option data in Request", self.optionReqData);

        try:
            result = get_json_chart_data(user_id, index_id);
            # with selected data type from multiple sections
            # result = get_json_chart_data(user_id, index_id, self.optionReqData);

        except Exception as ex:
            self.logger.error(ex)

            description = ('Aliens have attacked our base! We will '
                           'be back as soon as we fight them off. '
                           'We appreciate your patience.')
            result = {'error', description}

        return jsonify(result)   


# @app.route('/hello/<name>')
@app.route("/")
def hello(name=None):    
    #return jsonify({'text':'Hello World!'})
    #return render_template('index.html', name=name)
    # below are working well. not above
    #return app.send_static_file('index.html')
    return send_from_directory('static/chart', 'index.html')

# Route_1
class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]} 

# Route_2
class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)       


api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_2

api.add_resource(ChartResource, '/api/files', '/api/files/<user_id>', '/api/files/<user_id>/<index_id>')

if __name__ == '__main__':
   app.run(port=8000)

