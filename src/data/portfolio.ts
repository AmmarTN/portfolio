export interface SocialLink {
  kind: "github" | "linkedin" | "email";
  label: string;
  href: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  title: string;
  school: string;
  period: string;
  note?: string;
}

export interface CareerTimelineEntry {
  year: string;
  kind: "work" | "education";
  title: string;
  organization: string;
  period: string;
  summary: string;
  bullets: string[];
  meta?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const portfolio = {
  profile: {
    name: "Ahmed Ammar",
    role: "Flutter Engineer",
    heroEyebrow: "Hi, I'm Ahmed Ammar",
    heroTypewriterTitles: [
      "Software\nEngineer",
      "Flutter\nDeveloper",
      "Mobile\nEngineer",
      "Vibe\nCoder",
    ],
    heroDescription:
      "Building polished, multilingual mobile products with clean architecture and production-ready delivery through ",
    heroHighlight: "Flutter",
    heroDescriptionAfter: ".",
    title: "Flutter engineer building polished mobile products.",
    intro:
      "I ship cross-platform apps that feel intentional in the hand and stay maintainable under the hood, with a focus on Flutter, clean architecture, multilingual UX, and production-ready integrations.",
    location: "Sousse, Tunisia",
    proofPoints: [
      "2+ years in Flutter",
      "Clean Architecture + BLoC",
      "Cross-platform delivery",
      "Shipped multilingual products",
    ],
    socialLinks: [
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/AmmarTN",
      },
      {
        kind: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ammar-ahmed-tn/",
      },
      {
        kind: "email",
        label: "Email",
        href: "mailto:ahmed-ammar@outlook.com",
      },
    ] satisfies SocialLink[],
    logoWallTechnologies: [
      { slug: "flutter", label: "Flutter" },
      { slug: "dart", label: "Dart" },
      { slug: "react", label: "React" },
      { slug: "typeScript", label: "TypeScript" },
      { slug: "firebase", label: "Firebase" },
      { slug: "supabase", label: "Supabase" },
      { slug: "docker", label: "Docker" },
      { slug: "mysql", label: "MySQL" },
      { slug: "git", label: "Git" },
      { slug: "bash", label: "Bash" },
    ],
  },
  about: {
    headingAccent: "An overview",
    heading: "of how I work.",
    visualHighlights: [
      "Flutter first",
      "Product minded",
      "Clean systems",
    ],
    lead:
      "I build mobile products that feel clear in the hand and stay maintainable under real product pressure.",
    principles: [
      {
        title: "Thoughtful UX",
        body: "Clear, responsive interfaces with accessibility considered from the start.",
      },
      {
        title: "Clean systems",
        body: "Architecture that can absorb change without losing product quality.",
      },
      {
        title: "Reliable shipping",
        body: "Release flows, localization, auth, and integrations treated as core craft.",
      },
    ] satisfies Principle[],
    stats: [
      {
        value: "2+",
        label: "Years in Flutter delivery",
      },
      {
        value: "6",
        label: "Product contexts shipped",
      },
      {
        value: "4",
        label: "Featured case studies",
      },
    ] satisfies AboutStat[],
  },
  experience: [
    {
      role: "Flutter Developer",
      company: "Astrolab Agency",
      period: "Jul 2023 - Present",
      location: "Sousse, Tunisia",
      bullets: [
        "Delivered Flutter products across airport, government, health, sports, and marketplace contexts.",
        "Owned architecture, integrations, release workflows, and production maintenance from auth to payments to OTA updates.",
        "Built polished, responsive interfaces that stayed strong under multilingual, accessibility, and operational constraints.",
      ],
    },
    {
      role: "Flutter Developer Intern",
      company: "TEAMDEV",
      period: "Jul 2022 - Sep 2022",
      location: "Sousse, Tunisia",
      bullets: [
        "Built early production experience in Flutter delivery and cross-platform mobile fundamentals.",
        "Strengthened habits around maintainable implementation, responsive UI, and disciplined problem solving.",
        "Laid the base for later client-facing mobile work with a stronger engineering workflow.",
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      title: "Software Engineering Degree",
      school: "EPI Sousse",
      period: "2021 - 2023",
    },
    {
      title: "Professional Master's in Software Engineering and Rapid Application Development",
      school: "ISET Sousse",
      period: "2020 - 2021",
    },
    {
      title: "Applied Bachelor's Degree in IT",
      school: "ISET Sousse",
      period: "2019",
      note: "Embedded Systems and Mobile Development, top of class.",
    },
  ] satisfies EducationItem[],
  careerTimeline: [
    {
      year: "2019",
      kind: "education",
      title: "Applied Bachelor's Degree in IT",
      organization: "ISET Sousse",
      period: "2019",
      summary:
        "The academic base that grounded me in software, mobile development, and disciplined technical work.",
      bullets: [
        "Studied Embedded Systems and Mobile Development.",
        "Graduated top of class.",
        "Built the early foundation for later mobile product work.",
      ],
      meta: "Embedded Systems and Mobile Development",
    },
    {
      year: "2020",
      kind: "education",
      title: "Professional Master's in Software Engineering and Rapid Application Development",
      organization: "ISET Sousse",
      period: "2020 - 2021",
      summary:
        "A software-engineering focused chapter that pushed deeper into building applications quickly without losing structure.",
      bullets: [
        "Focused on software engineering and rapid application development.",
        "Strengthened the engineering habits behind maintainable application work.",
        "Built on the technical base from the IT bachelor's program.",
      ],
      meta: "Software Engineering and Rapid Application Development",
    },
    {
      year: "2021",
      kind: "education",
      title: "Software Engineering Degree",
      organization: "EPI Sousse",
      period: "2021 - 2023",
      summary:
        "The degree that sharpened my software engineering identity before stepping fully into production mobile delivery.",
      bullets: [
        "Completed a dedicated software engineering degree track.",
        "Deepened my understanding of application architecture and engineering workflow.",
        "Prepared the transition from academic work into client-facing product delivery.",
      ],
      meta: "Software Engineering",
    },
    {
      year: "2022",
      kind: "work",
      title: "Flutter Developer Intern",
      organization: "TEAMDEV",
      period: "Jul 2022 - Sep 2022",
      summary:
        "The first professional chapter where Flutter work became delivery work rather than just learning.",
      bullets: [
        "Built early production experience in Flutter delivery and cross-platform mobile fundamentals.",
        "Strengthened habits around maintainable implementation, responsive UI, and disciplined problem solving.",
        "Laid the base for later client-facing mobile work with a stronger engineering workflow.",
      ],
      meta: "Sousse, Tunisia",
    },
    {
      year: "2023",
      kind: "work",
      title: "Flutter Developer",
      organization: "Astrolab Agency",
      period: "Jul 2023 - Present",
      summary:
        "The main professional chapter so far: shipping polished Flutter products across multiple domains with real production constraints.",
      bullets: [
        "Delivered Flutter products across airport, government, health, sports, and marketplace contexts.",
        "Owned architecture, integrations, release workflows, and production maintenance from auth to payments to OTA updates.",
        "Built polished, responsive interfaces that stayed strong under multilingual, accessibility, and operational constraints.",
      ],
      meta: "Sousse, Tunisia",
    },
  ] satisfies CareerTimelineEntry[],
  skillGroups: [
    {
      title: "Primary Mobile Stack",
      items: [
        "Flutter",
        "Dart",
        "BLoC",
        "Clean Architecture",
        "Responsive UI",
        "Localization",
        "Push notifications",
        "Deep linking",
        "SDK integration",
      ],
    },
    {
      title: "Product Engineering",
      items: [
        "Authentication flows",
        "Payments",
        "Realtime chat and sockets",
        "Accessibility",
        "Arabic and English product delivery",
        "OTA updates with Shorebird",
      ],
    },
    {
      title: "Supporting Full-Stack",
      items: [
        "React and TypeScript",
        "React Native and Expo",
        "REST APIs",
        "Firebase",
        "Supabase",
        "PostgreSQL and MySQL",
      ],
    },
    {
      title: "Infrastructure & AI Workflow",
      items: [
        "Docker",
        "Linux",
        "Self-hosting",
        "Git and Azure DevOps",
        "Cursor",
        "Claude Code",
        "N8N",
      ],
    },
  ] satisfies SkillGroup[],
  contact: {
    heading: "Open to product teams and thoughtful collaborations.",
    body:
      "If you are hiring for Flutter or mobile product work, or you need a product-minded engineer to ship an app with care, I am open to the conversation.",
    opportunities: [
      "Flutter and mobile engineering roles",
      "Product-focused client collaborations",
      "Architecture, localization, or release-flow heavy projects",
    ],
  },
} as const;
