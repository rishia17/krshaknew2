from flask import Flask, request, render_template
from flask import Flask, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import csv
import base64
from io import BytesIO
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
import pandas as pd



#flask app
app = Flask(__name__)
CORS(app)

# CORS(app, resources={r"/estimation": {"origins": "http://localhost:8081"}})
# app.run(host="0.0.0.0", port=5000, debug=True)


@app.route('/')
def default():
    return render_template('main.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/currentstatistics')
def currentstatistics():
    return render_template('current_statistics.html')

@app.route('/cropregistration')
def cropregistration():
    return render_template('crop_registration.html')

@app.route('/cropyield')
def cropyield():
    return render_template('crop_estimation.html')

def reg_dist(name, crop_name, dist, area, pro_predictions):
    if dist == 63:
        with open('user_entry/adilabad_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 62:
        with open('user_entry/karimnagar_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 55:
        with open('user_entry/hyderabad_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 61:
        with open('user_entry/khammam_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 58:
        with open('user_entry/mahabubnagar_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 57:
        with open('user_entry/medak_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 59:
        with open('user_entry/nalgonda_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 56:
        with open('user_entry/nizamabad_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    elif dist == 60:
        with open('user_entry/warangal_user_crop_entry.csv', 'a', newline='') as crop_entry:
            write_data = csv.writer(crop_entry, delimiter=',')
            write_data.writerow([name, 2022, crop_name, int(area), int(pro_predictions)])

    crop_entry.close()

@app.route('/estimation', methods=["POST","GET"])
def estimation():
    data = request.get_json()
    print("dffgffffggggggggggggggggggggggggggggggg")
    dist = int(data['dist'])
    n = int(data['crop'])
    area = int(data['area'])
    crop=''
    if n == 1:
        crop="paddy"
    elif n == 2:
        crop="sorghum"
    elif n == 3:
        crop="arhar"
    elif n == 4:
        crop="groundnut"
    elif n == 5:
        crop="sesamum"

    production=0
    price=0

    if crop == 'paddy':
        pro = pickle.load(open("pkl_files/paddy_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        pri = pickle.load(open("pkl_files/paddy_pri_model.pkl", "rb"))
        price = pri.predict([[2022, int(area / 2.47), int(production)]])

    elif crop == 'sorghum':
        pro = pickle.load(open("pkl_files/sorghum_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        pri = pickle.load(open("pkl_files/sorghum_pri_model.pkl", "rb"))
        price = pri.predict([[2022, int(area / 2.47), int(production)]])

    elif crop == 'arhar':
        pro = pickle.load(open("pkl_files/arhar_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        pri = pickle.load(open("pkl_files/arhar_pri_model.pkl", "rb"))
        price = pri.predict([[2022, int(area / 2.47), int(production)]])

    elif crop == 'groundnut':
        pro = pickle.load(open("pkl_files/groundnut_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        pri = pickle.load(open("pkl_files/groundnut_pri_model.pkl", "rb"))
        price = pri.predict([[2022, int(area / 2.47), int(production)]])

    elif crop == 'sesamum':
        pro = pickle.load(open("pkl_files/sesamum_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        pri = pickle.load(open("pkl_files/sesamum_pri_model.pkl", "rb"))
        price = pri.predict([[2022, int(area / 2.47), int(production)]])
    result_text = "Yield = {} Quintals\nPrice = {} Rs per Quintal".format(int(production), int(price))
    return result_text


    # return render_template("result_page.html", prediction_text = "Yield = {} Quintals/nPrice = {} Rs per Quintal".format(int(production), int(price)))

@app.route("/registration", methods=["POST", "GET"])
def registration():
    print("hello")
    data = request.get_json()
    print(data)  # For debugging
    name = data['userName']
    dist = int(data['district'])
    n =  int(data['crop'])
    area = int(data['area'])

    crop = ''
    if n == 1:
        crop = "paddy"
    elif n == 2:
        crop = "sorghum"
    elif n == 3:
        crop = "arhar"
    elif n == 4:
        crop = "groundnut"
    elif n == 5:
        crop = "sesamum"

    if crop == 'paddy':
        pro = pickle.load(open("pkl_files/paddy_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        reg_dist(name, crop, dist, area, production)

    elif crop == 'sorghum':
        pro = pickle.load(open("pkl_files/sorghum_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        reg_dist(name, crop, dist, area, production)

    elif crop == 'arhar':
        pro = pickle.load(open("pkl_files/arhar_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        reg_dist(name, crop, dist, area, production)

    elif crop == 'groundnut':
        pro = pickle.load(open("pkl_files/groundnut_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        reg_dist(name, crop, dist, area, production)

    elif crop == 'sesamum':
        pro = pickle.load(open("pkl_files/sesamum_pro_model.pkl", "rb"))
        production = pro.predict([[dist, 2022, int(area / 2.47)]])
        reg_dist(name, crop, dist, area, production)
    return jsonify({"prediction": f"Registration Successful!!!"})

def current_total(crop):

    x=0

    crop_entry = pd.read_csv('user_entry/adilabad_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/karimnagar_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/hyderabad_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/warangal_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/nalgonda_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/medak_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/nizamabad_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/khammam_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    crop_entry = pd.read_csv('user_entry/mahabubnagar_user_crop_entry.csv')
    index = crop_entry.index
    for i in range(0, len(index)):
        if crop_entry.iloc[i]['Crop'] == crop:
            x+= crop_entry.iloc[i]['Production']

    return x

@app.route("/statistics", methods=["POST", "GET"])
def statistics():
    #dist = int(request.form.get("dist"))
    data = request.get_json()
    n = int(data['crop'])
    print("yeahhhh")
    crop = ''
    if n == 1:
        crop = "paddy"
    elif n == 2:
        crop = "sorghum"
    elif n == 3:
        crop = "arhar"
    elif n == 4:
        crop = "groundnut"
    elif n == 5:
        crop = "sesamum"

    threshold=0
    total = current_total(crop)

    if crop=='paddy':
        demand = pickle.load(open('pkl_files/paddy_district_model.pkl', 'rb'))
        threshold = demand.predict([[2022]])

    elif crop=='sorghum':
        demand = pickle.load(open('pkl_files/sorghum_district_model.pkl', 'rb'))
        threshold = demand.predict([[2022]])

    elif crop=='arhar':
        demand = pickle.load(open('pkl_files/arhar_district_model.pkl', 'rb'))
        threshold = demand.predict([[2022]])

    elif crop=='groundnut':
        demand = pickle.load(open('pkl_files/groundnut_district_model.pkl', 'rb'))
        threshold = demand.predict([[2022]])

    elif crop=='sesamum':
        demand = pickle.load(open('pkl_files/sesamum_district_model.pkl', 'rb'))
        threshold = demand.predict([[2022]])

    x = '2023'
    y = total

    fig = Figure()
    ax = fig.subplots()
    ax.bar(x, y, color='g')
    ax.axhline(threshold, xmin=0, xmax=1, color='r')
    buf = BytesIO()
    fig.savefig(buf, format="png")
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    return f"<center><figure><img src='data:image/png;base64,{data}'/><figcaption>Total Estimated Production vs Demand Graph of {crop}</figcaption></figure></center>"

@app.route('/recommendfile', methods=["POST", "GET"])
def recommendfile():
    return render_template('recommend.html')

@app.route('/fertilizersfile', methods=["POST", "GET"])
def fertilizersfile():
    return render_template('fertilizers.html')

# @app.route("/recommend", methods=["POST", "GET"])
# def recommend():
#     print("dfdfffffffff")
#     model = pickle.load(open("pkl_files/model.pkl", "rb"))
#     n = int(request.form.get('n'))
#     p = int(request.form.get('p'))
#     k = int(request.form.get('k'))
#     temp = int(request.form.get('temp'))
#     ph = float(request.form.get('ph'))
#     rain = int(request.form.get('rain'))
#     humidity = int(request.form.get('h'))
#     # if state == 1:
#     #     temp=
#     #     ph=!
#     #     rain=
#     #     humidity=
#     # ph = int(request.form.get('ph'))
#     # rain = int(request.form.get('rain'))
#     # humidity = int(request.form.get('h'))
#     # if weather_fetch(city) is not None:
#     #     temperature, humidity = weather_fetch(city)
#     # print(n)
#     prediction = model.predict([[n, p, k, temp, humidity, ph, rain]])
#     # prediction = model.predict([[90, 42, 43, 21, 82, 6.5, 203]])
#     return render_template("result_page.html", prediction_text="crop Recommended is {}".format(prediction[0]))
@app.route("/recommend", methods=["POST"])
def recommend():
    print("Request received")
    model = pickle.load(open("pkl_files/model.pkl", "rb"))

    data = request.get_json()
    print(data)  # For debugging

    n = int(data['n'])
    p = int(data['p'])
    k = int(data['k'])
    temp = int(data['temp'])
    ph = float(data['ph'])
    rain = int(data['rain'])
    humidity = int(data['h'])

    prediction = model.predict([[n, p, k, temp, humidity, ph, rain]])
    print(prediction)
    return jsonify({"prediction": f"Crop Recommended is {prediction[0]}"})


@app.route("/fertilizers", methods=["POST", "GET"])
def fertilizers():
    print("Fertilizer Recommendation Request received")
    fertilizer_model = pickle.load(open("pkl_files/fertilizer.pkl", "rb"))

    data = request.get_json()
    print(data)  # For debugging incoming JSON data

    temp = int(data['temp'])
    humidity = int(data['humidity'])
    mc = int(data['moisture'])   # Moisture content
    crop = int(data['crop'])     # Crop index or encoded value
    n = int(data['N'])
    p = int(data['P'])
    k = int(data['K'])

    # Adjust the order based on your model's training input
    prediction = fertilizer_model.predict([[temp, humidity, mc, crop, n, k, p]])
    print(prediction)

    return jsonify({"prediction": f"Recommended Fertilizer is {prediction[0]}"})



if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)