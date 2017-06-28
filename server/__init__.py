from flask import Flask, jsonify

app = Flask(__name__)

from server.controllers.routers import *