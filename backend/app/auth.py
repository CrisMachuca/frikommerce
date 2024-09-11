from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import create_access_token
import cloudinary.uploader


auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    profile_picture = request.files.get('profile_picture')

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    
    profile_picture_url = None
    if profile_picture:
        try:
            upload_result = cloudinary.uploader.upload(profile_picture)
            profile_picture_url = upload_result.get('url')
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    new_user = User(username=username, email=email, profile_picture=profile_picture_url)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "access_token": access_token,
        "profile_picture": user.profile_picture,
        "username": user.username
    }), 200