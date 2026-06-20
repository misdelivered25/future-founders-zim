import { ffImages } from "@/lib/futureFoundersImages";

export type ContentPageKey =
  | "about"
  | "visionMission"
  | "coreValues"
  | "functions"
  | "financialLiteracy"
  | "entrepreneurship"
  | "leadership"
  | "whoWeServe"
  | "programsActivities"
  | "join";

export type ContentSection = {
  title: string;
  icon?: string;
  body?: string;
  bullets?: string[];
};

export type ContentPageData = {
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  supportingImages?: string[];
  sections: ContentSection[];
  quote?: string;
};

export const contentPages: Record<ContentPageKey, ContentPageData> = {
  about: {
    eyebrow: "About Future Founders",
    title: "About Future Founders",
    subtitle:
      "Future Founders is a youth-focused entrepreneurship and financial literacy organisation that equips young people with practical knowledge, business confidence, and leadership skills for real-world success.",
    image: ffImages.students,
    supportingImages: [ffImages.vendor, ffImages.graduate, ffImages.skills],
    sections: [
      {
        title: "Who We Are",
        bullets: [
          "A platform for young innovators and aspiring entrepreneurs.",
          "A community that promotes financial literacy, enterprise, and self-leadership.",
          "A bridge between ideas, skills, mentorship, and opportunity.",
        ],
      },
      {
        title: "What We Do",
        bullets: [
          "Teach financial literacy and money management.",
          "Develop entrepreneurial thinking and business skills.",
          "Support youth through mentorship, learning, and exposure.",
          "Build confidence, leadership, and practical problem-solving.",
        ],
      },
      {
        title: "Why It Matters",
        bullets: [
          "Youth need practical tools, not only theory.",
          "Strong money habits lead to stronger futures.",
          "Entrepreneurship creates jobs, purpose, and independence.",
        ],
      },
    ],
    quote: "Empowering young minds. Building stronger communities.",
  },
  visionMission: {
    eyebrow: "Vision and Mission",
    title: "Vision & Mission",
    subtitle:
      "We exist to turn potential into purpose, ideas into action, and youth into founders.",
    image: ffImages.chess,
    supportingImages: [ffImages.students, ffImages.skills],
    sections: [
      {
        title: "Vision",
        body:
          "To raise a generation of financially literate, innovative, and ethical founders who transform communities.",
      },
      {
        title: "Mission",
        body:
          "To equip youths aged 14 to 39 with entrepreneurship education, practical business skills, leadership development, and financial literacy for real-world success.",
      },
      {
        title: "Our Objectives",
        bullets: [
          "Build confident young entrepreneurs.",
          "Promote money management and financial discipline.",
          "Encourage innovation and problem-solving.",
          "Connect youth to mentorship and opportunity.",
          "Strengthen community impact through enterprise.",
        ],
      },
    ],
    quote: "Building Tomorrow’s Founders.",
  },
  coreValues: {
    eyebrow: "Core Values",
    title: "Core Values",
    subtitle:
      "These values guide our actions, decisions, and impact as we build tomorrow’s leaders.",
    image: ffImages.chess,
    supportingImages: [ffImages.students, ffImages.skills],
    sections: [
      { title: "Integrity", body: "We do what is right." },
      { title: "Innovation", body: "We solve problems creatively." },
      { title: "Discipline", body: "We build habits that create results." },
      { title: "Leadership", body: "We lead ourselves and others well." },
      { title: "Collaboration", body: "We grow better together." },
      { title: "Service", body: "We create value for people and communities." },
      { title: "Growth", body: "We keep learning, improving, and building." },
    ],
    quote: "Our values shape how we think, work, and serve.",
  },
  functions: {
    eyebrow: "Our Functions",
    title: "Our Functions",
    subtitle:
      "We empower young people with knowledge, skills, mentorship, and opportunities to build sustainable businesses and stronger communities.",
    image: ffImages.chess,
    supportingImages: [ffImages.classroom, ffImages.publicSpeaking, ffImages.financial, ffImages.skills],
    sections: [
      { title: "Training and Lectures", body: "Interactive sessions that build knowledge, critical thinking, and practical skills for real-world success." },
      { title: "Mentorship and Collaboration", body: "Guidance and collaboration with mentors and peers to innovate, solve problems, and grow together." },
      { title: "Community Outreach", body: "Youth-led initiatives, workshops, and public speaking engagements that strengthen communities." },
      { title: "Financial Literacy and Business Support", body: "Budgeting, financial planning, record keeping, pricing, profit, and business management support." },
      { title: "Digital and Skill Building", body: "Technical, digital, marketing, communication, and problem-solving skills for the future." },
      { title: "Leadership and Strategy", body: "Leadership mindsets, strategic thinking, decision-making, and disciplined execution." },
    ],
    quote: "We do more than teach. We prepare, support, and connect future founders.",
  },
  financialLiteracy: {
    eyebrow: "Financial Literacy",
    title: "Financial Literacy",
    subtitle:
      "Financial literacy gives young people the knowledge and tools to manage money, grow businesses, and build lasting independence.",
    image: ffImages.financial,
    supportingImages: [ffImages.vendor, ffImages.skills],
    sections: [
      { title: "Budgeting", body: "Plan income and spending wisely." },
      { title: "Saving", body: "Build reserves for emergencies and growth." },
      { title: "Goal Setting", body: "Set clear goals and work with purpose." },
      { title: "Record Keeping", body: "Track sales, costs, income, and cash flow." },
      { title: "Pricing and Profit", body: "Understand value, cost, pricing, and profit margins." },
      { title: "Reinvestment", body: "Grow your business and create more value." },
      { title: "Money Safety", body: "Protect money and avoid financial risks." },
    ],
    quote: "Strong money habits build stronger futures.",
  },
  entrepreneurship: {
    eyebrow: "Entrepreneurship and Business Development",
    title: "Entrepreneurship & Business Development",
    subtitle:
      "We equip young people with the mindset, tools, and strategies to build sustainable businesses, create value, and lead economic growth in their communities.",
    image: ffImages.students,
    supportingImages: [ffImages.skills, ffImages.financial, ffImages.vendor],
    sections: [
      { title: "Idea and Discovery", body: "Identify real problems and opportunities around you." },
      { title: "Skills and Validation", body: "Build essential skills and test your idea with real people." },
      { title: "Plan and Strategy", body: "Create a solid business plan and define your strategy." },
      { title: "Resources and Finance", body: "Understand money, budgeting, and how to fund your vision." },
      { title: "Build and Launch", body: "Turn your plan into action and launch your solution." },
      { title: "Grow and Impact", body: "Scale your business, create jobs, and transform communities." },
    ],
    quote: "We help young people turn ideas into real opportunities.",
  },
  leadership: {
    eyebrow: "Leadership and Personal Development",
    title: "Leadership & Personal Development",
    subtitle:
      "Great leaders are built. We equip young people with the mindset, skills, and character to lead with purpose, inspire others, and create lasting impact.",
    image: ffImages.chess,
    supportingImages: [ffImages.graduate, ffImages.publicSpeaking, ffImages.classroom],
    sections: [
      { title: "Confidence", body: "Build self-belief and courage to take action." },
      { title: "Communication", body: "Express ideas clearly and listen with impact." },
      { title: "Teamwork", body: "Collaborate, respect others, and achieve more." },
      { title: "Public Speaking", body: "Speak with clarity and engage any audience." },
      { title: "Decision-Making", body: "Think critically and choose with confidence." },
      { title: "Networking", body: "Build meaningful connections that open doors." },
      { title: "Resilience", body: "Bounce back, stay focused, and keep going." },
      { title: "Self-Leadership", body: "Set goals, manage yourself, and lead your life." },
    ],
    quote: "We build capable, ethical, and confident leaders.",
  },
  whoWeServe: {
    eyebrow: "Who We Serve",
    title: "Who We Serve",
    subtitle:
      "Future Founders supports and empowers young people with knowledge, skills, and confidence to build, grow, and lead in their communities and beyond.",
    image: ffImages.graduate,
    supportingImages: [ffImages.vendor, ffImages.farmer, ffImages.students, ffImages.publicSpeaking],
    sections: [
      { title: "High School Students", body: "Build confidence, financial literacy, and future-ready skills early." },
      { title: "University Students", body: "Develop practical business and leadership skills beyond the classroom." },
      { title: "Young Vendors", body: "Improve money management, pricing, and daily business growth." },
      { title: "Young Farmers", body: "Build enterprise thinking around agriculture and production." },
      { title: "Aspiring Entrepreneurs", body: "Turn ideas into action with mentorship, tools, and real opportunities." },
      { title: "Youth Aged 14 to 39", body: "Access inclusive programs that inspire growth, impact, and independence." },
    ],
    quote: "Future Founders welcomes dreamers, doers, learners, and builders.",
  },
  programsActivities: {
    eyebrow: "Programs and Activities",
    title: "Programs & Activities",
    subtitle:
      "We equip young people with knowledge, skills, networks, and opportunities through hands-on programs and experiences.",
    image: ffImages.publicSpeaking,
    supportingImages: [ffImages.classroom, ffImages.skills, ffImages.financial, ffImages.students],
    sections: [
      { title: "Workshops", body: "Interactive sessions to build practical skills and solve real-world problems." },
      { title: "Seminars", body: "Expert-led talks on entrepreneurship, finance, innovation, and leadership." },
      { title: "Bootcamps", body: "Intensive programs to accelerate learning, ideation, and execution." },
      { title: "Mentorship Circles", body: "Small groups guided by experienced mentors for growth and accountability." },
      { title: "Business Clinics", body: "Personalized support to refine ideas, strategies, and business plans." },
      { title: "Competitions", body: "Challenge events that inspire creativity, innovation, and winning solutions." },
      { title: "Networking Events", body: "Connect with peers, professionals, investors, and industry leaders." },
      { title: "Community Outreach", body: "Projects that create impact and build responsible, purpose-driven leaders." },
    ],
    quote: "Every activity moves young people from learning to leadership.",
  },
  join: {
    eyebrow: "Join Future Founders",
    title: "Join Future Founders",
    subtitle:
      "Your journey to financial confidence, entrepreneurship, and leadership starts here.",
    image: ffImages.students,
    supportingImages: [ffImages.vendor, ffImages.graduate, ffImages.farmer, ffImages.skills],
    sections: [
      { title: "Register", body: "Submit your details through the registration form." },
      { title: "Learn", body: "Join engaging sessions and build practical skills." },
      { title: "Build", body: "Apply what you learn, launch ideas, and create impact." },
      { title: "Why Join", bullets: ["Learn practical money skills.", "Develop business and leadership confidence.", "Connect with mentors and peers.", "Turn ideas into action.", "Grow your future with purpose."] },
    ],
    quote: "Take the next step. Register now.",
  },
};
