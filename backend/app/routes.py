from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from app import db
from app.models import Product, User, Bid
import cloudinary.uploader

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return "¡Bienvenido a la Tienda de Subastas!"


@main.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@main.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_product = Product( 
        name=data['name'],
        description=data['description'],
        starting_bid=data['starting_bid'],
        owner_id=user_id
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201


@main.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200

@main.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    if product.owner_id != user_id:
        return jsonify({"error": "no tienes permiso para eliminar este producto"}), 403
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Producto eliminado exitosamente"}), 200

@main.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    if product.owner_id != user_id:
        return jsonify({"error": "no tienes permiso para editar este producto"}), 403
    
    data = request.get_json()
    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'starting_bid' in data:
        product.starting_bid = data['starting_bid']

    db.session.commit()

    return jsonify({"message": "Producto actualizado exitosamente", "product": product.to_dict()}), 200   

@main.route('/products/<int:product_id>/bids', methods=['POST'])
@jwt_required()
def place_bid(product_id):
    data = request.get_json()
    amount = data['amount']
    user_id = get_jwt_identity()

    product = Product.query.get_or_404(product_id)
    if amount <= product.starting_bid:
        return jsonify({"error": "Bid amount must be higher than the starting bid"}), 400

    new_bid = Bid(amount=amount, user_id=user_id, product_id=product.id)
    db.session.add(new_bid)
    db.session.commit()

    return jsonify(new_bid.to_dict()), 201

@main.route('/products/<int:product_id>/bids', methods=['GET'])
def get_bids(product_id):
    bids = Bid.query.filter_by(product_id=product_id).order_by(Bid.amount.desc()).all()
    return jsonify([bid.to_dict() for bid in bids]), 200

@main.route('/my-products', methods=['GET'])
@jwt_required()
def get_my_products():
    user_id = get_jwt_identity()
    products = Product.query.filter_by(owner_id=user_id).all()
    product_list = [product.to_dict() for product in products]
    return jsonify(product_list), 200

@main.route('/my-bids', methods=['GET'])
@jwt_required()
def get_my_bids():
    user_id = get_jwt_identity()
    bids = Bid.query.filter_by(user_id=user_id).all()
    bid_list = [{
        'id': bid.id,
        'amount': bid.amount,
        'created_at': bid.created_at,
        'product_name': bid.product.name,
        'product_id': bid.product_id
    } for bid in bids]

    return jsonify(bid_list), 200

@main.route('/my-account', methods=['GET'])
@jwt_required()
def get_account():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    user_data = {
        'username': user.username,
        'email': user.email,
        'profile_picture': user.profile_picture,  # Devuelve la URL de la imagen de perfil si existe
    }

    return jsonify(user_data), 200


@main.route('/update-account', methods=['PUT'])
@jwt_required()
def update_account():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 400
    
    data = request.form
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password_hash = generate_password_hash(data['password'])
    if 'profile_picture' in request.files:
        file = request.files['profile_picture']
        try:
            # Subir la imagen a Cloudinary
            upload_result = cloudinary.uploader.upload(file)
            # Guardar la URL de la imagen en la base de datos
            user.profile_picture = upload_result['url']
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    db.session.commit()

    return jsonify({'message': 'Your account has been updated!'}), 200

