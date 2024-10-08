import { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormsInput = () => {
    const [age, setAge] = useState('');
    const [systolicBP, setSystolicBP] = useState('');
    const [diastolicBP, setDiastolicBP] = useState('');
    const [cbc, setCbc] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('Male');
    const [smokingStatus, setSmokingStatus] = useState('Non-smoker');
    const [alcoholConsumption, setAlcoholConsumption] = useState('None');
    const [physicalActivity, setPhysicalActivity] = useState('Sedentary');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [allergy, setAllergy] = useState('');
    const [otherAllergy, setOtherAllergy] = useState(''); // State for other allergies
    const [prediction, setPrediction] = useState('');
    const [image, setImage] = useState(null); // State for image
    const [email, setEmail] = useState(''); // Add this line


    const handleImageChange = (event) => {
        setImage(event.target.files[0]); // Set the selected file
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!age || !systolicBP || !diastolicBP || !cbc || !height || !weight || !medicalHistory || !email) {
    toast.error('Please fill in all required fields.');
    return;
}


        // Include the 'otherAllergy' if 'Other' is selected
        const allergyToSend = allergy === 'Other' ? otherAllergy : allergy;

        const formData = new FormData();
        formData.append('age', age);
        formData.append('systolic_blood_pressure', systolicBP);
        formData.append('diastolic_blood_pressure', diastolicBP);
        formData.append('cbc', cbc);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('gender', gender);
        formData.append('smoking_status', smokingStatus);
        formData.append('alcohol_consumption', alcoholConsumption);
        formData.append('physical_activity', physicalActivity);
        formData.append('medical_history', medicalHistory);
        formData.append('allergy', allergyToSend);
        formData.append('email', email); // Add this line
// Send the selected allergy
        if (image) {
            formData.append('image', image); // Append image file if present
        }

        try {
            console.log('Submitting form with data:', {
                age,
                systolicBP,
                diastolicBP,
                cbc,
                height,
                weight,
                gender,
                smokingStatus,
                alcoholConsumption,
                physicalActivity,
                medicalHistory,
                allergyToSend,
                image
            });

            const response = await axios.post('http://localhost:5000/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPrediction(response.data.prediction);
            toast.success("Records are successfully saved!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Error making prediction:', error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-black p-8 rounded-lg shadow-lg max-w-lg w-full text-white">
                <h1 className="text-2xl font-bold mb-6 text-center">Health Assessment Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        Age:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>

                    <label className="block">
                        Gender:
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label className="block">
                        Height (cm):
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter your height"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        Weight (kg):
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter your weight"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        Systolic Blood Pressure:
                        <input
                            type="number"
                            value={systolicBP}
                            onChange={(e) => setSystolicBP(e.target.value)}
                            placeholder="Enter systolic blood pressure"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        Diastolic Blood Pressure:
                        <input
                            type="number"
                            value={diastolicBP}
                            onChange={(e) => setDiastolicBP(e.target.value)}
                            placeholder="Enter diastolic blood pressure"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        CBC Value:
                        <input
                            type="number"
                            value={cbc}
                            onChange={(e) => setCbc(e.target.value)}
                            placeholder="Enter CBC value"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        Allergy:
                        <select
                            value={allergy}
                            onChange={(e) => setAllergy(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                        >
                            <option value="">Select an allergy</option>
                            <option value="Peanuts">Peanuts</option>
                            <option value="Shellfish">Shellfish</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Gluten">Gluten</option>
                            <option value="Eggs">Eggs</option>
                            <option value="Soy">Soy</option>
                            <option value="Other">Other</option>
                            <option value="None">None</option>
                        </select>
                        {allergy === 'Other' && (
                            <input
                                type="text"
                                value={otherAllergy}
                                onChange={(e) => setOtherAllergy(e.target.value)}
                                placeholder="Specify other allergy"
                                className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                            />
                        )}
                    </label>
                    <label className="block">
                        Smoking Status:
                        <select
                            value={smokingStatus}
                            onChange={(e) => setSmokingStatus(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                        >
                            <option value="Non-smoker">Non-smoker</option>
                            <option value="Current smoker">Current smoker</option>
                            <option value="Former smoker">Former smoker</option>
                        </select>
                    </label>
                    <label className="block">
                        Alcohol Consumption:
                        <select
                            value={alcoholConsumption}
                            onChange={(e) => setAlcoholConsumption(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                        >
                            <option value="None">None</option>
                            <option value="Light">Light</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Heavy">Heavy</option>
                        </select>
                    </label>
                    <label className="block">
                        Physical Activity Level:
                        <select
                            value={physicalActivity}
                            onChange={(e) => setPhysicalActivity(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                        >
                            <option value="Sedentary">Sedentary</option>
                            <option value="Lightly active">Lightly active</option>
                            <option value="Moderately active">Moderately active</option>
                            <option value="Very active">Very active</option>
                        </select>
                    </label>
                    <label className="block">
                        Medical History:
                        <textarea
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                            placeholder="Enter your medical history"
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white placeholder-opacity-50"
                        />
                    </label>
                    <label className="block">
                        Upload Image:
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-800 text-white"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
                {prediction &&
                    <p className="mt-4 text-center text-lg font-semibold text-white">Prediction: {prediction}</p>}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default FormsInput;
