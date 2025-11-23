export const calculateAge = (dob) => {
    if (!dob) return 'Unknown';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const callGeminiAPI = async (userPrompt, systemInstruction) => {
    // This is a mock function.
    console.log("Calling Gemini API with prompt:", userPrompt, "and instruction:", systemInstruction);
    return new Promise(resolve => setTimeout(() => {
        if (systemInstruction.includes("biographer")) {
            resolve(`Hi, I'm a fun-loving pet! I love long walks and chasing squirrels. I'm a good boy/girl and I love my human!`);
        } else if (systemInstruction.includes("veterinary assistant")) {
            resolve(`Based on the growth data, your pet has a healthy weight trend. Keep up the great work with a balanced diet and regular exercise!`);
        } else {
            resolve(`This is a general response from the mock API.`);
        }
    }, 1500));
};

export const calculateAgeAtDate = (dob, eventDate) => {
    if (!dob || !eventDate) return 'Unknown';
    const birthDate = new Date(dob);
    const gTargetDate = new Date(eventDate);
    let gYears = gTargetDate.getFullYear() - birthDate.getFullYear();
    let gMonths = gTargetDate.getMonth() - birthDate.getMonth();
    let gDays = gTargetDate.getDate() - birthDate.getDate();
    if (gDays < 0) {
        gMonths--;
        const gPrevMonth = new Date(gTargetDate.getFullYear(), gTargetDate.getMonth(), 0);
        gDays += gPrevMonth.getDate();
    }
    if (gMonths < 0) {
        gYears--;
        gMonths += 12;
    }
    
    let gResult = [];
    if (gYears > 0) gResult.push(`${gYears}y`);
    if (gMonths > 0) gResult.push(`${gMonths}m`);
    if (gYears === 0 && gMonths === 0 && gDays > 0) gResult.push(`${gDays}d`);
    if (gResult.length === 0) return 'Newborn';
    return gResult.join(' ');
};

