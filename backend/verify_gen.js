import axios from 'axios';

const testGeneration = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/captions/generate', {
            inputText: "A beautiful sunset over the mountains in Sri Lanka",
            templateId: "social-media-caption",
            platform: "Instagram",
            tone: "Witty"
        });

        console.log("Status Code:", response.status);
        console.log("Caption Output:", response.data.caption);
    } catch (error) {
        console.error("Test Failed:", error.response ? error.response.data : error.message);
    }
};

testGeneration();
