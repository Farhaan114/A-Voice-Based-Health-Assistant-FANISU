# A voice-based health assistant web app 

Users should be able to describe their symptoms verbally and receive personalized advice on potential remedies and quick-fixes, prioritizing privacy and accuracy.

*Done using React.JS, Node.JS, Express.JS and MySQL.
*The project aims at providing a quick-fix/remedy to the user based on the voice transcription given.

OUTPUT:
![output](https://github.com/Farhaan114/A-Voice-Based-Health-Assistant-FANISU/assets/110080291/79b21f5d-7cde-49a3-bd59-5c214cd79059)

## TECH STACK USED: 
Front-end: REACT.JS
Back-end: NODE.JS and EXPRESS.JS
Database: MYSQL


## WORKFLOW: 

![FLOW](https://github.com/Farhaan114/A-Voice-Based-Health-Assistant-FANISU/blob/master/CLIENT/src/assets/SPEECH%20RECOGNITION.png)


## IMPLEMENTATION: 

-Voice recording and transcription: The application uses Google's voice recognition API to record and transcribe user input accurately.

-Database structure: The SQL database is structured to categorize remedies by health concern, providing efficient retrieval.

-Back-end connector: A Node.JS and Express.JS server app is written to connect the front-end with the MySQL database using endpoints.

-User interface: A user-friendly web interface was designed, incorporating responsive design principles for various device types.

## How to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Farhaan114/A-Voice-Based-Health-Assistant-FANISU.git
   cd A-Voice-Based-Health-Assistant-FANISU
   ```

2. **Install dependencies**:
   - For backend:
     ```bash
     cd SERVER
     npm install
     ```
   - For frontend:
     ```bash
     cd CLIENT
     npm install
     ```

3. **Set up MySQL database**:
   - Create a database and import the provided schema in the `/SERVER/medicaldb.sql` file.

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Run the frontend**:
   ```bash
   npm run dev
   ```

## Future Enhancements

- Implement Skin lesion detection interface and model.
- Improve the Algoithm with an ML model.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

