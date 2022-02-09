import requests
from flask import Blueprint, request, jsonify, redirect
import urllib.parse
views = Blueprint("views", __name__)

@views.route('/fhir_server/get_code')
def program_main():
    response = requests.get('https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImUiOiJzbWFydC1QcmFjdGl0aW9uZXItNzE0ODI3MTMifQ/fhir/.well-known/smart-configuration').json()
    authorize_url = response['authorization_endpoint']
    global token_url 
    token_url = response['token_endpoint']
    url = f"{authorize_url}?response_type=code&client_id={'my-web-app'}&redirect_uri={urllib.parse.quote('http://localhost:3000/parse_code/', safe='')}&scope={urllib.parse.quote('openid fhirUser profile launch/patient patient/*.read', safe='')}&state=local_state&aud=https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImUiOiJzbWFydC1QcmFjdGl0aW9uZXItNzE0ODI3MTMifQ/fhir"

    return jsonify({'url': url, 'token_url': token_url}), 200

@views.route('/hello')
def hello():
    return jsonify("nice"), 200

@views.route('/fhir_server/set_token', methods=["POST"])
def hello2():
    auth_code = request.get_json()['code']
    auth_params = {'grant_type': 'authorization_code', 'code': auth_code, 'redirect_uri':'http://localhost:5000/hello', 'client_id': 'my-web-app'}
    response = requests.post(token_url, data=auth_params)

    return jsonify(response.json()), 200