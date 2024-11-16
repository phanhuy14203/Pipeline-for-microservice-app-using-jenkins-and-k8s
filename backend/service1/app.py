from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    text = data.get('text', '')


    if not text:
        return jsonify({"error": "No text provided"}), 400


    blob = TextBlob(text)
    sentiment = blob.sentiment


    response = {
        "polarity": sentiment.polarity,   # Đánh giá cảm xúc (tích cực/tiêu cực)
        "subjectivity": sentiment.subjectivity  # Mức độ chủ quan/khách quan
    }
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=7991)