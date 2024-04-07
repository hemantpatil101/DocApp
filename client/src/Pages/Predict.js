import React, { useEffect, useState } from 'react';
import { Form, Select, Space } from 'antd';
import Layout from '../Components/Layout';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Predict = () => {
    const options = [
        { label: "Itching", value: "Itching" },
        { label: "Skin Rash", value: "Skin Rash" },
        { label: "Nodal Skin Eruptions", value: "Nodal Skin Eruptions" },
        { label: "Continuous Sneezing", value: "Continuous Sneezing" },
        { label: "Shivering", value: "Shivering" },
        { label: "Chills", value: "Chills" },
        { label: "Joint Pain", value: "Joint Pain" },
        { label: "Stomach Pain", value: "Stomach Pain" },
        { label: "Acidity", value: "Acidity" },
        { label: "Ulcers On Tongue", value: "Ulcers On Tongue" },
        { label: "Muscle Wasting", value: "Muscle Wasting" },
        { label: "Vomiting", value: "Vomiting" },
        { label: "Burning Micturition", value: "Burning Micturition" },
        { label: "Spotting urination", value: "Spotting urination" },
        { label: "Fatigue", value: "Fatigue" },
        { label: "Weight Gain", value: "Weight Gain" },
        { label: "Anxiety", value: "Anxiety" },
        { label: "Cold Hands And Feets", value: "Cold Hands And Feets" },
        { label: "Mood Swings", value: "Mood Swings" },
        { label: "Weight Loss", value: "Weight Loss" },
        { label: "Restlessness", value: "Restlessness" },
        { label: "Lethargy", value: "Lethargy" },
        { label: "Patches In Throat", value: "Patches In Throat" },
        { label: "Irregular Sugar Level", value: "Irregular Sugar Level" },
        { label: "Cough", value: "Cough" },
        { label: "Sunken Eyes", value: "Sunken Eyes" },
        { label: "Breathlessness", value: "Breathlessness" },
        { label: "Sweating", value: "Sweating" },
        { label: "Dehydration", value: "Dehydration" },
        { label: "Indigestion", value: "Indigestion" },
        { label: "Headache", value: "Headache" },
        { label: "Yellowish Skin", value: "Yellowish Skin" },
        { label: "Dark Urine", value: "Dark Urine" },
        { label: "Nausea", value: "Nausea" },
        { label: "Loss Of Appetite", value: "Loss Of Appetite" },
        { label: "Pain Behind The Eyes", value: "Pain Behind The Eyes" },
        { label: "Back Pain", value: "Back Pain" },
        { label: "Constipation", value: "Constipation" },
        { label: "Abdominal Pain", value: "Abdominal Pain" },
        { label: "Diarrhoea", value: "Diarrhoea" },
        { label: "Mild Fever", value: "Mild Fever" },
        { label: "Yellow Urine", value: "Yellow Urine" },
        { label: "Yellowing Of Eyes", value: "Yellowing Of Eyes" },
        { label: "Acute Liver Failure", value: "Acute Liver Failure" },
        { label: "Fluid Overload", value: "Fluid Overload" },
        { label: "Swelling Of Stomach", value: "Swelling Of Stomach" },
        { label: "Swelled Lymph Nodes", value: "Swelled Lymph Nodes" },
        { label: "Malaise", value: "Malaise" },
        { label: "Blurred And Distorted Vision", value: "Blurred And Distorted Vision" },
        { label: "Phlegm", value: "Phlegm" },
        { label: "Throat Irritation", value: "Throat Irritation" },
        { label: "Redness Of Eyes", value: "Redness Of Eyes" },
        { label: "Sinus Pressure", value: "Sinus Pressure" },
        { label: "Runny Nose", value: "Runny Nose" },
        { label: "Congestion", value: "Congestion" },
        { label: "Chest Pain", value: "Chest Pain" },
        { label: "Weakness In Limbs", value: "Weakness In Limbs" },
        { label: "Fast Heart Rate", value: "Fast Heart Rate" },
        { label: "Pain During Bowel Movements", value: "Pain During Bowel Movements" },
        { label: "Pain In Anal Region", value: "Pain In Anal Region" },
        { label: "Bloody Stool", value: "Bloody Stool" },
        { label: "Irritation In Anus", value: "Irritation In Anus" },
        { label: "Neck Pain", value: "Neck Pain" },
        { label: "Dizziness", value: "Dizziness" },
        { label: "Cramps", value: "Cramps" },
        { label: "Bruising", value: "Bruising" },
        { label: "Obesity", value: "Obesity" },
        { label: "Swollen Legs", value: "Swollen Legs" },
        { label: "Swollen Blood Vessels", value: "Swollen Blood Vessels" },
        { label: "Puffy Face And Eyes", value: "Puffy Face And Eyes" },
        { label: "Enlarged Thyroid", value: "Enlarged Thyroid" },
        { label: "Brittle Nails", value: "Brittle Nails" },
        { label: "Swollen Extremeties", value: "Swollen Extremeties" },
        { label: "Excessive Hunger", value: "Excessive Hunger" },
        { label: "Extra Marital Contacts", value: "Extra Marital Contacts" },
        { label: "Drying And Tingling Lips", value: "Drying And Tingling Lips" },
        { label: "Slurred Speech", value: "Slurred Speech" },
        { label: "Knee Pain", value: "Knee Pain" },
        { label: "Hip Joint Pain", value: "Hip Joint Pain" },
        { label: "Muscle Weakness", value: "Muscle Weakness" },
        { label: "Stiff Neck", value: "Stiff Neck" },
        { label: "Swelling Joints", value: "Swelling Joints" },
        { label: "Movement Stiffness", value: "Movement Stiffness" },
        { label: "Spinning Movements", value: "Spinning Movements" },
        { label: "Loss Of Balance", value: "Loss Of Balance" },
        { label: "Unsteadiness", value: "Unsteadiness" },
        { label: "Weakness Of One Body Side", value: "Weakness Of One Body Side" },
        { label: "Loss Of Smell", value: "Loss Of Smell" },
        { label: "Bladder Discomfort", value: "Bladder Discomfort" },
        { label: "Foul Smell Of urine", value: "Foul Smell Of urine" },
        { label: "Continuous Feel Of Urine", value: "Continuous Feel Of Urine" },
        { label: "Passage Of Gases", value: "Passage Of Gases" },
        { label: "Internal Itching", value: "Internal Itching" },
        { label: "Toxic Look (typhos)", value: "Toxic Look (typhos)" },
        { label: "Depression", value: "Depression" },
        { label: "Irritability", value: "Irritability" },
        { label: "Muscle Pain", value: "Muscle Pain" },
        { label: "Altered Sensorium", value: "Altered Sensorium" },
        { label: "Red Spots Over Body", value: "Red Spots Over Body" },
        { label: "Belly Pain", value: "Belly Pain" },
        { label: "Abnormal Menstruation", value: "Abnormal Menstruation" },
        { label: "Dischromic Patches", value: "Dischromic Patches" },
        { label: "Watering From Eyes", value: "Watering From Eyes" },
        { label: "Increased Appetite", value: "Increased Appetite" },
        { label: "Polyuria", value: "Polyuria" },
        { label: "Family History", value: "Family History" },
        { label: "Mucoid Sputum", value: "Mucoid Sputum" },
        { label: "Rusty Sputum", value: "Rusty Sputum" },
        { label: "Lack Of Concentration", value: "Lack Of Concentration" },
        { label: "Visual Disturbances", value: "Visual Disturbances" },
        { label: "Receiving Blood Transfusion", value: "Receiving Blood Transfusion" },
        { label: "Receiving Unsterile Injections", value: "Receiving Unsterile Injections" },
        { label: "Coma", value: "Coma" },
        { label: "Stomach Bleeding", value: "Stomach Bleeding" },
        { label: "Distention Of Abdomen", value: "Distention Of Abdomen" },
        { label: "History Of Alcohol Consumption", value: "History Of Alcohol Consumption" },
        { label: "Fluid Overload.1", value: "Fluid Overload.1" },
        { label: "Blood In Sputum", value: "Blood In Sputum" },
        { label: "Prominent Veins On Calf", value: "Prominent Veins On Calf" },
        { label: "Palpitations", value: "Palpitations" },
        { label: "Painful Walking", value: "Painful Walking" },
        { label: "Pus Filled Pimples", value: "Pus Filled Pimples" },
        { label: "Blackheads", value: "Blackheads" },
        { label: "Scurring", value: "Scurring" },
        { label: "Skin Peeling", value: "Skin Peeling" },
        { label: "Silver Like Dusting", value: "Silver Like Dusting" },
        { label: "Small Dents In Nails", value: "Small Dents In Nails" },
        { label: "Inflammatory Nails", value: "Inflammatory Nails" },
        { label: "Blister", value: "Blister" },
        { label: "Red Sore Around Nose", value: "Red Sore Around Nose" },
        { label: "Yellow Crust Ooze", value: "Yellow Crust Ooze" },
    ];

    const { user } = useSelector((state) => state.user);

    const [prediction, setPrediction] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);



    const handleChange = (value) => {
        setSelectedValues(value);
        console.log(`selected ${value}`);
    };

    const onFinishHandler = async () => {
        try {
            const symptomsString = selectedValues.join(',');
            // const res = await axios.post('https://disease-predictor-ml-model.onrender.com/predict',
            // {
            //     symptomsString
            // })
            console.log(symptomsString);
            let res = await fetch(`http://localhost:8080/api/v1/user/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    "symptoms": symptomsString
                }),
            })

            res = await res.json();
            setPrediction(res?.data?.prediction);
            /*const res = await axios.post('/api/v1/user/predict',
           {
                symptomsString
           },
           {headers:
               {
                   Authorization:`Bearer ${localStorage.getItem('token')}`,
               }
           })*/

            //setPrediction(res)
           // console.log('This is response from Backend' + res?.data);
        }
        catch (error) {
            console.log(error);
        }

        console.log('Form Submitted', selectedValues);
    };

    useEffect(() => {
        // This useEffect will trigger whenever prediction state changes
        // You can perform DOM updates here
        console.log('Prediction changed', prediction);
    }, [prediction]);

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form layout='vertical' onFinish={onFinishHandler} className='predict-form'>

                    <div style={{ marginTop: '25px', padding: '10px', borderRadius: '5px' }}>
                        <h4> 🩺 Enter Your Symptoms for Personalized Treatment 🧑🏼‍⚕️ </h4>
                    </div>

                    <Space
                        style={{
                            width: '100%',
                        }}
                        direction="vertical">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            defaultValue={[]}
                            onChange={handleChange}
                            options={options}
                        />
                    </Space>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                        <button className="btn btn-primary form-btn" type="submit">
                            Get Suggestion
                        </button>
                    </div>

                    <div style={{ marginTop: '25px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        {prediction.length > 0 && (
                            <p style={{ margin: '0' }}>{prediction}</p>
                        )}
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default Predict;
