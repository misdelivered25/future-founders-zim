import logo from "@/assets/ff-logo.png.asset.json";
import students from "@/assets/students-studying.jpg.asset.json";
import speaking from "@/assets/public-speaking.jpg.asset.json";
import skills from "@/assets/skills.jpg.asset.json";
import graduate from "@/assets/graduate.jpg.asset.json";
import vendor from "@/assets/vendor.jpg.asset.json";
import financial from "@/assets/financial-literacy.jpg.asset.json";
import farmer from "@/assets/farmer.jpg.asset.json";
import classroom from "@/assets/classroom.jpg.asset.json";
import chess from "@/assets/chess.jpg.asset.json";

export const img = {
  logo: logo.url,
  students: students.url,
  speaking: speaking.url,
  skills: skills.url,
  graduate: graduate.url,
  vendor: vendor.url,
  financial: financial.url,
  farmer: farmer.url,
  classroom: classroom.url,
  chess: chess.url,
};

export const gallery = [
  { src: students.url, caption: "Students collaborating in our workshops", tag: "Learning" },
  { src: speaking.url, caption: "Youth leadership & public speaking", tag: "Leadership" },
  { src: chess.url, caption: "Strategic thinking — chess academy", tag: "Strategy" },
  { src: skills.url, caption: "Future-ready digital & business skills", tag: "Skills" },
  { src: classroom.url, caption: "Hands-on classroom sessions", tag: "Classroom" },
  { src: financial.url, caption: "Financial literacy in action", tag: "Finance" },
  { src: vendor.url, caption: "Empowering young vendors", tag: "Entrepreneurship" },
  { src: farmer.url, caption: "Young farmers building agri-businesses", tag: "Agribusiness" },
  { src: graduate.url, caption: "Tomorrow's founders, today's graduates", tag: "Success" },
];
