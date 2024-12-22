"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

CORS(api)

@api.route('/register', methods=['POST'])
def register():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not email or not password:
            raise Exception('faltan datos: email o contrasena')
        
        check_user = User.query.filter_by(email=email).first()

        if check_user:
            return jsonify({"msg": "Ya existe un usuario con este correo, intenta iniciar sesion"}), 400

        new_user = User(email=email, password=password, is_active=True)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=str(new_user.id))
        return ({"msg": "Usuario registrado exitosamente", 'token': access_token}), 201

    except Exception as error:
        return jsonify({'error': str(error)}), 400

@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not email or not password:
            raise Exception('Faltan datos: email o contrasena')
        
        check_user = User.query.filter_by(email=email).first()

        if not check_user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        if check_user.password != password:
            return jsonify({"msg": "Contrasena incorrecta"}), 401

        access_token = create_access_token(identity=str(check_user.id))
        return jsonify({"msg": "Inicio de sesion exitoso", 'token': access_token}), 200
    
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    id = get_jwt_identity()
    user = User.query.get(id)

    if not user:
        return jsonify({"msg": "algo ha ido mal"}), 404
    
    return jsonify({"user": user.serialize()}), 200
