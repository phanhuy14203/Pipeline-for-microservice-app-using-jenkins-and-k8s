function analyzeAndTranslateText() {
    const inputText = document.getElementById('inputText').value;

    // Kiểm tra nếu không có văn bản đầu vào
    if (!inputText) {
        alert("Please enter some text.");
        return;
    }

    // Gửi API dịch
    const translationPromise = fetch('http://192.168.1.172:7999/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        const translatedText = data.translation;
        // Hiển thị kết quả dịch
        document.getElementById('translatedText').innerText = translatedText;
        return translatedText;
    })
    .catch(error => {
        console.error("Translation error:", error);
        document.getElementById('translatedText').innerText = 'Error in translation';
        return null;  // Trả về null nếu có lỗi
    });

    // Gửi API phân tích cảm xúc
    const sentimentPromise = translationPromise.then(translatedText => {
        if (!translatedText) return null;  // Nếu dịch lỗi, không tiếp tục phân tích cảm xúc

        return fetch('http://192.168.1.172:7991/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: translatedText })
        })
        .then(response => response.json())
        .then(data => {
            // Hiển thị kết quả phân tích cảm xúc
            document.getElementById('sentimentRating').innerText = 
                `Polarity: ${data.polarity}, Subjectivity: ${data.subjectivity}`;
        })
        .catch(error => {
            console.error("Sentiment analysis error:", error);
            document.getElementById('sentimentRating').innerText = 'Unable to analyze sentiment';
        });
    });

    // Đợi cả hai promises (dịch và phân tích cảm xúc) hoàn thành
    Promise.allSettled([translationPromise, sentimentPromise]).then(results => {
        // Xử lý kết quả nếu cần (hoặc thêm logic ở đây nếu muốn phản hồi chi tiết hơn)
        console.log('API results:', results);
    });
}
