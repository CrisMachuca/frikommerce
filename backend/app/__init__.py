from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import cloudinary.api


db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuraciones de la aplicación
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://Cristina:niandra85@localhost/mi_tienda'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'tu_secreto_jwt'

    # Configuración de Cloudinary
    cloudinary.config(
        cloud_name='dpgju6aj2',
        api_key='182768845167919',
        api_secret='UzhOlxQhJ8Z9NQxW8iVGxqy66Jg'
    )

    # Inicialización de las extensiones
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Importar y registrar los blueprints
    from .routes import main as main_blueprint
    from .auth import auth as auth_blueprint
    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app
