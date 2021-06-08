import utils

import pymongo
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from pymongo import MongoClient
import flask_cors

# Initialize Flask app
app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'top_secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

# initilize a local database
client = MongoClient('mongodb://localhost:27017/')
mongodb = client['Thoth']
user_credentials_collection = mongodb['User Credentials']

# Initialize CORS so that api_tool can talk to example app
cors = flask_cors.CORS()
cors.init_app(app)

# Initialize JWT
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "this-is-secret-key"

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


@app.route('/login', methods = ['POST'])
def login():
    res = request.get_json()
    username = res['username']
    password = res['password']
    
    user_credential = user_credentials_collection.find_one({"username": username,"password": password})
    print('User credential is:', user_credential)
    if user_credential:
        access_token = create_access_token(identity = username)
        return jsonify(message="Login Succeeded!", access_token=access_token), 201
    else:
        return jsonify(message="Bad Username or Password"), 401

# @app.route('/api/refresh', methods=['POST'])
# def refresh():
#     """
#     Refreshes an existing JWT by creating a new one that is a copy of the old
#     except that it has a refrehsed access expiration.
#     .. example::
#        $ curl http://localhost:5000/api/refresh -X GET \
#          -H "Authorization: Bearer <your_token>"
#     """
#     print("refresh request")
#     old_token = request.get_data()
#     new_token = guard.refresh_jwt_token(old_token)
#     ret = {'access_token': new_token}
#     return ret, 200


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)