import flask
from flask_cors import CORS
import sqlite3

# Connect to or create the database file
conn = sqlite3.connect("fanisu.db")
cursor = conn.cursor()

# Create a table
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS medical_conditions (
        id INTEGER PRIMARY KEY,
        symptom TEXT,
        remedy TEXT
    )
"""
)

# Insert some sample data
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('headache','lie down in a dark room and apply some balm.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('cold', 'Drink hot water and take paracetamol for now.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('sunburn','Apply aloe vera gel or a moisturizer with aloe vera to the affected area to soothe the skin and keep it hydrated')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('upset stomach or indigestion','Sip on ginger tea or chew on ginger candies to help ease stomach discomfort. Avoid spicy or heavy foods for a while.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('insomnia','Establish a consistent sleep schedule, limit caffeine and screen time before bedtime, and practice relaxation techniques like deep breathing')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('high blood pressure ','Reduce sodium intake, maintain a healthy weight, engage in regular exercise, and consider stress-reduction techniques such as yoga or meditation.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('migraine','Identify and avoid migraine triggers, keep a headache diary, and consult a neurologist for personalized treatment options if migraines persist')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('sore throat','Gargle with warm saltwater, stay hydrated, and suck on throat lozenges with soothing ingredients like honey and menthol.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('nausea','Ginger can help alleviate nausea; try ginger tea, ginger candies, or ginger ale. Eat small, bland meals and avoid strong odors.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('muscle cramps','Stretch and gently massage the affected muscle. Apply a warm compress or take a warm bath to relax the muscle')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('vomiting','Avoid trigger foods (spicy, acidic, fatty), eat smaller meals, and elevate your head while sleeping. Over-the-counter antacids can provide temporary relief.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('back pain','Maintain good posture, practice back-strengthening exercises, and consider physical therapy. Over-the-counter pain relievers and hot/cold therapy can also help.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('depression','TAKE A DEEP BREATH. FIND A LEDGE, GIVE UP ON UR DREAMS, JUMP AND DIE MF!!!!')"
)

# Commit changes and close the database connection
conn.commit()
conn.close()




app = flask.Flask(__name__)
CORS(app)


@app.route("/transcript", methods=["POST"])
def transcript():
    transcriptText = flask.request.json["transcriptText"].lower().split(".")[0]
    conn = sqlite3.connect("fanisu.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM medical_conditions WHERE symptom=?", (transcriptText,)
    )
    row = cursor.fetchone()
    conn.close()

    return flask.jsonify(row)
