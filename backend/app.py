from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/review", methods=["POST"])
def review_code():
    data = request.get_json()
    code = data.get("code", "")
    language = data.get("language", "Python")

    if not code:
        return jsonify({"error": "Code is required"}), 400

    feedback = f"""
AI Code Review for {language}

Potential Issues:
- Check edge cases and input validation.
- Improve error handling where needed.
- Keep functions small and readable.

Suggestions:
- Use meaningful variable names.
- Add comments for complex logic.
- Refactor repeated logic into helper functions.

Improved Approach:
- Make the code modular.
- Add unit tests.
- Handle exceptions properly.

Note:
This is a demo response. In production, this API can connect to OpenAI or another LLM provider.
"""

    return jsonify({"review": feedback})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
