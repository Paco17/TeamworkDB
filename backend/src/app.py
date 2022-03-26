from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

db = mongo.db.users

@app.route('/')
def index():
    return "Pagina Prueba"

@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert_one({
        #Devuelve un id 
        'name':request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
        
    })
    return jsonify(str(ObjectId(id.inserted_id)))


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({})
    return 'received'

@app.route('/users/<id>', methods=['GET'])
def getUser():
    print(request.json)
    return 'received'

@app.route('/users/<id>', methods=['GET'])
def deleteUser():
    print(request.json)
    return 'deleted'

@app.route('/users/<id>', methods=['PUT'])
def updateUser():
    print(request.json)
    return 'updated'

if __name__ == "__main__":
    app.run(debug=True)