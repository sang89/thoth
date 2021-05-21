import utils

import os
import flask
import flask_sqlalchemy
import flask_praetorian
import flask_cors
import pymongo
from pymongo import MongoClient
from flask import request
import json


guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()
'''
class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Text, unique = True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default = True, server_default = 'true')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username = username).one_or_none()
    
    @classmethod
    def identify(cls, id):
        return cls.query.get(id)
    
    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active
'''

# Initialize Flask app
app = flask.Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'top_secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}


# Initialize Flask praetorian 
#guard.init_app(app, User)

# initilize a local database
client = MongoClient('mongodb://localhost:27017/')
mongodb = client['Thoth']
user_credentials_collection = mongodb['User Credentials']

# Initialize CORS so that api_tool can talk to example app
cors.init_app(app)

# Find a user
@app.route('/find-user', methods = ['GET'])
def find_user():
    username = request.args.get('username', None)
    email = request.args.get('email', None)
    already_existed = check_if_user_exists(username, email)
    return_json = {
        'username': username,
        'email': email,
        'already_existed': already_existed
    }
    return return_json, 200

def check_if_user_exists(username, email=None):
    user_record = user_credentials_collection.find_one({'username': username})
    email_record = user_credentials_collection.find_one({'email': email})
    already_existed = (user_record != None) or (email_record != None)
    return already_existed

# Sign up a new user
@app.route('/signup', methods=['POST'])
def sign_up():
    res = request.get_json()
    username = res['username']
    email = res['email']
    password = res['password']
    new_record = dict()
    new_record['username'] = username
    new_record['email'] = email
    new_record['password'] = password
    try:
        res = user_credentials_collection.insert(new_record)
        return_json = {
            'input': new_record,
            'successful': True
        }
        return utils.parse_json(return_json), 200
    except:
        return utils.parse_json({
            'input': new_record,
            'successful': False
        }), 200


@app.route('/api/login', methods = ['POST'])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/api/login -X POST \
         -d '{"username":"Sang","password":"strongpassword"}'
    """
    req = flask.request.get_json(force = True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200

@app.route('/api/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200

@app.route('/api/protected')
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)