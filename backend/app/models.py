from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    profile_picture = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relación con los productos y las pujas
    products = db.relationship('Product', backref='owner', lazy=True)
    bids = db.relationship('Bid', backref='bidder', lazy=True, overlaps="bids_made,bidder")
    direct_sale_products = db.relationship('DirectSaleProduct', backref='owner', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    starting_bid = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relación con las pujas
    bids = db.relationship('Bid', backref='product_link', lazy=True, overlaps="bids_associated,product")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'starting_bid': self.starting_bid,
            'created_at': self.created_at,
            'owner_id': self.owner_id,
            'image_url': self.image_url
        }

class Bid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    user = db.relationship('User', backref='bids_made', lazy=True, overlaps="bidder,bids")
    product = db.relationship('Product', backref='bids_associated', lazy=True, overlaps="product,bids")

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'username': self.user.username if self.user else None,
            'product_id': self.product_id
        }

class DirectSaleProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)  # Precio fijo para venta directa
    image_url = db.Column(db.String(255))  # Imagen del producto
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Relacionar con el usuario

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'owner_id': self.owner_id,
            'created_at': self.created_at
        }
