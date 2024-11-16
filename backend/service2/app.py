from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator

from flask_cors import CORS
app = Flask(__name__)

CORS(app)

def translate_to_vietnamese(text):
    # Dịch văn bản sang tiếng Anh
    translator = GoogleTranslator(source='en', target='vi')
    return translator.translate(text)

@app.route('/api/translate', methods=['POST'])
def translate_text():
    # Lấy dữ liệu văn bản từ yêu cầu POST
    data = request.get_json()
    text = data.get('text', '')

    # Kiểm tra nếu văn bản không rỗng
    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Dịch văn bản
    translated_text = translate_to_vietnamese(text)

    # Tạo phản hồi JSON với kết quả dịch
    response = {
        "translation": translated_text
    }
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
