from datetime import datetime, timedelta
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
    products = db.relationship('Product', back_populates='owner', lazy=True)
    bids = db.relationship('Bid', back_populates='bidder', lazy=True, overlaps="bidder,bids_made")
    direct_sale_products = db.relationship('DirectSaleProduct', back_populates='owner', lazy=True)

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
    category = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow() + timedelta(days=7))  # Plazo de 7 días por defecto
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relación con las pujas
    bids = db.relationship('Bid', back_populates='product', lazy=True, overlaps="product,bids_associated")
    owner = db.relationship('User', back_populates='products')  # Relación bidireccional con User

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'starting_bid': self.starting_bid,
            'category': self.category,
            'created_at': self.created_at,
            'end_time': self.end_time,
            'owner_id': self.owner_id,
            'image_url': self.image_url
        }

class Bid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    bidder = db.relationship('User', back_populates='bids', overlaps="bidder,bids_made")
    product = db.relationship('Product', back_populates='bids', overlaps="product_link,bids")

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'username': self.bidder.username if self.bidder else None,
            'product_id': self.product_id
        }

class DirectSaleProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    category = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Relacionar con el usuario

    owner = db.relationship('User', back_populates='direct_sale_products')  # Relación bidireccional con User

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'image_url': self.image_url,
            'owner_id': self.owner_id,
            'created_at': self.created_at
        }
