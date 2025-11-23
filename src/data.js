export const initialPets = [
    {
        id: 1,
        name: "Max",
        breed: "German Shepherd",
        dob: "2021-05-10",
        gender: "Male",
        photo: "https://placehold.co/600x400/c2b280/333333?text=Max",
        health: {
            vaccinations: [ { id: 1, name: 'Rabies', brand: 'Rabisin', date: '2024-05-15', clinic: 'City Vets', status: 'completed', nextDue: 
 '2025-05-15' }],
            deworming: [ { id: 1, name: 'Drontal', date: '2024-08-01', clinic: 'Home', status: 'completed', nextDue: '2024-11-01' } ],
            medications: [{ id: 1, name: 'Heartworm Prev.', dosage: '1 tablet', frequency: 'Monthly', startDate: '2024-01-01', endDate: null, status: 'active', notes: 'With food' }],
            medicalStatus: {
                allergies: 'Pollen, Chicken',
       
          conditions: 'Slight hip dysplasia',
                microchip: '985112009876543',
                bloodType: 'DEA 1.1+'
            },
            medicalHistory: [
                { id: 1, date: '2023-02-20', title: 'Broken Paw', vet: 'Dr. Smith', notes: 'Cast applied for 4 weeks.' }
            ]
        },
        growth: [
            { id: 1, date: '2021-07-10', weight_kg: 5.2, height_cm: 30, notes: 'First checkup', photo: 'https://placehold.co/100x100/c2b280/333333?text=5kg' },
            { id: 2, date: '2022-01-10', weight_kg: 15.8, height_cm: 55, notes: 'Growing fast!', photo: 'https://placehold.co/100x100/c2b280/333333?text=15kg' },
            
 { id: 3, date: '2022-05-15', weight_kg: 25.0, height_cm: 62, notes: 'Vet visit', photo: 'https://placehold.co/100x100/c2b280/333333?text=25kg' }
        ],
        reminders: [
            { id: 1, title: 'Annual Vaccination', type: 'Vet', date: '2025-10-23', time: '14:30', repeat: 'None', notes: 'Rabies and booster shots.', status: 'pending' },
            { id: 2, title: 'Full Grooming', type: 'Grooming', date: '2025-11-15', time: '11:00', repeat: 'None', notes: 'Ask for summer cut.', status: 'pending' },
   
          { id: 3, title: 'Heartworm Pill', type: 'Medication', date: '2025-09-01', time: '08:00', repeat: 'Monthly', notes: '', status: 'completed' }
        ],
        gallery: []
    },
    {
        id: 2,
        name: "Bella",
        breed: "Siamese",
        dob: "2023-01-15",
        gender: "Female",
   
      photo: "https://placehold.co/600x400/d1c4e9/333333?text=Bella",
        health: { 
            vaccinations: [],
            deworming: [],
            medications: [],
            medicalStatus: {
                allergies: 'Dairy',
               
  conditions: '',
                microchip: '',
                bloodType: ''
            },
            medicalHistory: [],
        },
        growth: [],
        reminders: [],
        gallery: []
    
 }
];

export const initialConsultations = [
     { id: 1, vetId: 3, vetName: 'Dr. Sarah Khan', pet: 'Bella', date: '2025-10-02', time: '10:00', reason: 'Checkup', status: 'Past', type: 'Online' },
     { id: 2, vetId: 1, vetName: 'Dr. Emily Carter', pet: 'Max', date: '2025-09-05', time: '14:30', reason: 'Vaccination', status: 'Past', type: 'Clinic' },
];
