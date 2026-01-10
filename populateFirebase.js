// Simple script to populate Firebase - run this in browser console
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJag4KRMEm8XsMPBSvU5LG-g8CQavfqEI",
  authDomain: "psychologists-services-37310.firebaseapp.com",
  databaseURL: "https://psychologists-services-37310-default-rtdb.firebaseio.com",
  projectId: "psychologists-services-37310",
  storageBucket: "psychologists-services-37310.firebasestorage.app",
  messagingSenderId: "930144587787",
  appId: "1:930144587787:web:3da4bc607c2f9fb5e0370e",
  measurementId: "G-0RKPTJ2KMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Psychologists data
const psychologists = [
  {
    id: "1",
    name: "Dr. Sarah Davis",
    avatar_url: "https://ftp.goit.study/img/avatars/23.jpg",
    experience: "12 years",
    reviews: [
      { reviewer_name: "Michael Brown", reviewer_rating: 4.5, comment: "Dr. Davis has been a great help in managing my depression. Her insights have been valuable." },
      { reviewer_name: "Linda Johnson", reviewer_rating: 5, comment: "I'm very satisfied with Dr. Davis's therapy. She's understanding and empathetic." }
    ],
    price_per_hour: 120,
    rating: 4.75,
    license: "Licensed Psychologist (License #67890)",
    specialization: "Depression and Mood Disorders",
    initial_consultation: "Free 45-minute initial consultation",
    about: "Dr. Sarah Davis is a highly experienced and licensed psychologist specializing in Depression and Mood Disorders. With 12 years of practice, she has helped numerous individuals overcome their depression and regain control of their lives. Dr. Davis is known for her empathetic and understanding approach to therapy, making her clients feel comfortable and supported throughout their journey to better mental health."
  },
  {
    id: "2",
    name: "Dr. Mark Thompson",
    avatar_url: "https://ftp.goit.study/img/avatars/1.jpg",
    experience: "20 years",
    reviews: [
      { reviewer_name: "Susan Roberts", reviewer_rating: 4.8, comment: "I've had an excellent experience with Dr. Thompson. His expertise has been invaluable." },
      { reviewer_name: "David Lee", reviewer_rating: 4.6, comment: "Dr. Thompson's guidance has helped me improve my relationships and well-being." }
    ],
    price_per_hour: 180,
    rating: 4.7,
    license: "Licensed Psychologist (License #54321)",
    specialization: "Relationship Counseling",
    initial_consultation: "Free 60-minute initial consultation",
    about: "Dr. Mark Thompson is a highly experienced and licensed psychologist specializing in Relationship Counseling. With 20 years of practice, he has helped individuals navigate and improve their relationships, leading to better well-being and personal growth. Dr. Thompson is known for his expertise and ability to provide invaluable insights to his clients. His approach to therapy is tailored to each individual's unique needs, ensuring a supportive and effective counseling experience."
  },
  {
    id: "3",
    name: "Dr. Lisa Anderson",
    avatar_url: "https://ftp.goit.study/img/avatars/2.jpg",
    experience: "18 years",
    reviews: [
      { reviewer_name: "Emily White", reviewer_rating: 4.9, comment: "Dr. Anderson is an exceptional psychologist. Her insights have been life-changing for me." },
      { reviewer_name: "James Taylor", reviewer_rating: 4.7, comment: "I highly recommend Dr. Anderson. She's helped me overcome my personal challenges." }
    ],
    price_per_hour: 160,
    rating: 4.8,
    license: "Licensed Psychologist (License #98765)",
    specialization: "Trauma and PTSD",
    initial_consultation: "Free 30-minute initial consultation",
    about: "Dr. Lisa Anderson is a highly experienced and licensed psychologist specializing in Trauma and PTSD. With 18 years of practice, she has been a beacon of support for individuals who have experienced trauma and its aftermath. Dr. Anderson is widely regarded for her exceptional insights and her ability to bring about life-changing transformations in her clients. Her approach to therapy is compassionate and tailored to each individual's unique needs, creating a safe and healing environment for those seeking her expertise."
  }
];

// Populate function
async function populatePsychologists() {
  try {
    for (const psychologist of psychologists) {
      await set(ref(db, `psychologists/${psychologist.id}`), psychologist);
      console.log(`Added ${psychologist.name}`);
    }
    console.log('All psychologists added successfully! Refresh the page.');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Run the population
populatePsychologists();