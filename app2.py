import requests

longitude = 78.486
latitude = 17.385

    # Request parameters for the NASA API
params = {
        "parameters": "PRECTOTCORR,QV2M,T2M,RH2M",
        "community": "AG",
        "longitude": longitude,
        "latitude": latitude,
        "format": "JSON"
    }

    # Fetch data from NASA API
url = "https://power.larc.nasa.gov/api/temporal/climatology/point"

response = requests.get(url, params=params)
data = response.json()
    
    # Extract values from the API response
rainfall = data["properties"]["parameter"]["PRECTOTCORR"]["ANN"]  # mm/day (Annual)
moisture_content = data["properties"]["parameter"]["QV2M"]["ANN"]  # g/kg
temperature = data["properties"]["parameter"]["T2M"]["ANN"]  # °C
humidity = data["properties"]["parameter"]["RH2M"]["ANN"]  # %

    # Convert rainfall from mm/day to mm/year (365 days)
rainfall_mm_per_year = rainfall * 365

print(rainfall,moisture_content,temperature,humidity)    
# print(f"🌧️ Annual Rainfall: {rainfall_mm_per_year:.2f} mm/year")
# print(f"💧 Moisture Content: {moisture_content} g/kg")
# print(f"🌡️ Temperature: {temperature} °C")
# print(f"💨 Humidity: {humidity} %")


import pandas as pd
import pickle
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/fertilizers", methods=["POST", "GET"])
def fertilizers():
    # # Load the trained model
    # fertilizer = pickle.load(open("pkl_files/fertilizer.pkl", "rb"))
    
    # # Get values from the form
    # temp = int(request.form.get('temp'))
    # humidity = int(request.form.get('h'))
    # mc = int(request.form.get('mc'))
    # crop = int(request.form.get('crop'))
    # n = int(request.form.get('n'))
    # p = int(request.form.get('p'))
    # k = int(request.form.get('k'))
    
    # # Define feature names
    # feature_names = ['Temperature', 'Humidity', 'Moisture Content', 'Crop Type', 'Nitrogen', 'Phosphorus', 'Potassium']
    
    # # Create a DataFrame with the input values and feature names
    # input_df = pd.DataFrame([[temp, humidity, mc, crop, n, k, p]], columns=feature_names)
    
    # # Make the prediction
    prediction = fertilizer.predict(input_df)
    print(prediction)
    
    return render_template("result_page.html", prediction_text="Recommended Fertilizer is {}".format(prediction[0]))
        # Load the trained model

if __name__ == "__main__":
    app.run(debug=True)
