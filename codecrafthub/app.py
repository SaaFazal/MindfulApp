from flask import Flask, jsonify, request
import json
import os
from datetime import datetime

app = Flask(__name__)

# Enable CORS for frontend integration
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

DATA_FILE = 'courses.json'

def load_courses():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading courses: {e}")
        return []

def save_courses(courses):
    try:
        with open(DATA_FILE, 'w') as f:
            json.dump(courses, f, indent=4)
    except Exception as e:
        print(f"Error saving courses: {e}")

@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = load_courses()
    return jsonify(courses), 200

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    courses = load_courses()
    course = next((c for c in courses if c['id'] == course_id), None)
    if not course:
        return jsonify({"error": f"Course with ID {course_id} not found"}), 404
    return jsonify(course), 200

@app.route('/api/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No payload provided"}), 400
    
    required = ['name', 'description', 'target_date', 'status']
    for field in required:
        if field not in data or not data[field]:
            return jsonify({"error": f"Missing required field: {field}"}), 400
            
    if data['status'] not in ["Not Started", "In Progress", "Completed"]:
        return jsonify({"error": "Invalid status. Must be 'Not Started', 'In Progress', or 'Completed'"}), 400
        
    try:
        datetime.strptime(data['target_date'], '%Y-%m-%d')
    except ValueError:
        return jsonify({"error": "Invalid date format. Must be YYYY-MM-DD"}), 400

    courses = load_courses()
    new_id = max([c['id'] for c in courses], default=0) + 1
    
    new_course = {
        "id": new_id,
        "name": data['name'],
        "description": data['description'],
        "target_date": data['target_date'],
        "status": data['status'],
        "created_at": datetime.utcnow().isoformat()
    }
    
    courses.append(new_course)
    save_courses(courses)
    return jsonify(new_course), 201

@app.route('/api/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No payload provided"}), 400
        
    courses = load_courses()
    course = next((c for c in courses if c['id'] == course_id), None)
    if not course:
        return jsonify({"error": f"Course with ID {course_id} not found"}), 404
        
    if 'name' in data:
        course['name'] = data['name']
    if 'description' in data:
        course['description'] = data['description']
    if 'target_date' in data:
        try:
            datetime.strptime(data['target_date'], '%Y-%m-%d')
            course['target_date'] = data['target_date']
        except ValueError:
            return jsonify({"error": "Invalid date format. Must be YYYY-MM-DD"}), 400
    if 'status' in data:
        if data['status'] not in ["Not Started", "In Progress", "Completed"]:
            return jsonify({"error": "Invalid status. Must be 'Not Started', 'In Progress', or 'Completed'"}), 400
        course['status'] = data['status']
        
    save_courses(courses)
    return jsonify(course), 200

@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    courses = load_courses()
    course = next((c for c in courses if c['id'] == course_id), None)
    if not course:
        return jsonify({"error": f"Course with ID {course_id} not found"}), 404
        
    courses = [c for c in courses if c['id'] != course_id]
    save_courses(courses)
    return jsonify({"message": f"Course with ID {course_id} deleted successfully"}), 200

if __name__ == '__main__':
    print("- CodeCraftHub API is starting...")
    print(f"- Data will be stored in: {os.path.abspath(DATA_FILE)}")
    print("- API will be available at: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
