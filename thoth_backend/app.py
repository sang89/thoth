import os
import flask
import flask_sqlalchemy
import flask_praetorian
import flask_cors
from flask import request

db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()

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


# Initialize Flask app
app = flask.Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'top_secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

# Initialize Flask praetorian 
guard.init_app(app, User)

# initilize a local database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'database.db')}"
db.init_app(app)

# Initialize CORS so that api_tool can talk to example app
cors.init_app(app)

# Add users
with app.app_context():
    db.create_all()
    if db.session.query(User).filter_by(username='Sang').count() < 1:
        db.session.add(User(
          username='Sang',
          password=guard.hash_password('strongpassword'),
          roles='admin'
            ))
    db.session.commit()

# Set up some routes
@app.route('/api/')
def home():
    return {"Hello": "World"}, 200

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