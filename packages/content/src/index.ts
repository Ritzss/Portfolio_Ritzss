import type {
  Profile,
  Project,
  Experience,
  Education,
  Certification,
  SocialLink,
  About,
  SkillGroup,
  Capability,
  BeyondData,
  Contact,
} from "@portfolio/types";

export const profile: Profile = {
  name: "Ritanshu Babuta",
  role: "Associate Full Stack Developer",
  tagline: "Building production web applications for real-world problems",

  stack: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript"],
};

export const projects: Project[] = [
  {
    title: "VastraDrobe",
    description:
      "Built and maintained production web applications using Next.js, React, Node.js, and MongoDB. Developed the VastraDrobe e-commerce platform across product discovery, variants, cart, accounts, and checkout workflows. Built internal inventory and business workflows covering products, warehouses, stock movements, orders, users, and administration. Designed REST APIs, authentication flows, database operations, and production integrations.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Cloudinary",
    ],
    highlights: [
      "Built product discovery and category experiences",
      "Implemented product variants, sizes, designs, cart, and favorites",
      "Connected the storefront with backend inventory workflows",
      "Integrated Cloudinary media and production deployment",
    ],
    url: "https://www.vastradrobe.com/",
    image: "/projects/vastradrobe.webp",
    featured: true,
  },
  {
  title: "NexLocal",
  description:
    "Built and deployed a full-stack grocery e-commerce platform using React, TypeScript, Vite, and Tailwind CSS. Developed customer shopping workflows across product browsing, search, cart, checkout, authentication, order history, delivery tracking, and location-based store discovery. Integrated interactive maps and payment functionality, along with separate admin and dealer dashboard workflows.",
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "React Router",
    "Leaflet",
    "Stripe",
  ],
  highlights: [
    "Built product browsing, search, filtering, cart, and checkout workflows",
    "Implemented authentication, profiles, order history, and delivery tracking",
    "Integrated location detection and interactive store discovery maps",
    "Integrated Stripe payment functionality",
    "Built admin and dealer dashboard workflows",
    "Designed responsive customer and mobile shopping experiences",
  ],
  url: "https://rksgrocery.netlify.app/",
  image: "/projects/NexLocal.webp",
  featured: true,
},
];

export const experience: Experience[] = [
  {
    company: "ADS247365 India Pvt. Ltd.",
    role: "Associate MERN Full Stack Developer",
    location: "Delhi, India",
    startDate: "Nov 2025",
    description: [
      "Developed and maintained production web applications using Next.js, React.js, Node.js, Express.js, and MongoDB.",
      "Built responsive, reusable React and Next.js components integrated with REST APIs and backend services.",
      "Developed REST APIs, CRUD workflows, authentication, authorization, protected routes, and business logic.",
      "Worked on VastraDrobe, a fashion e-commerce platform covering product discovery, search, filtering, cart, favorites, checkout, accounts, and orders.",
      "Developed an Inventory Management System covering products, variants, warehouses, inventory, stock movements, orders, users, activity logs, and administrative workflows.",
      "Implemented inventory operations including stock addition, removal, transfers, and warehouse-level stock management.",
      "Worked with MongoDB data models and indexing for products, inventory, orders, customers, and operational workflows.",
      "Integrated services including Cloudinary, Postmark, payment gateway functionality, and ExcelJS-based exports.",
      "Worked on production deployment, debugging, API connectivity, environment configuration, and frontend performance optimization.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
    ],
  },

  {
    company: "Internshala Trainings",
    role: "Web Developer Trainee",
    location: "Remote",
    startDate: "Aug 2023",
    endDate: "Oct 2023",
    description: [
      "Completed an 8-week Web Developer Trainee internship focused on practical web development.",
      "Worked with HTML, CSS, JavaScript, PHP, and React.js to develop web interfaces and application functionality.",
      "Built responsive web pages and implemented frontend components following web development fundamentals.",
      "Gained practical experience with client-side development, server-side concepts, debugging, and cross-browser compatibility.",
    ],
    technologies: ["HTML5", "CSS", "JavaScript", "PHP", "React.js"],
  },

  {
    company: "National Council of Educational Research and Training (NCERT)",
    role: "Web Developer",
    location: "New Delhi, India",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    description: [
      "Assisted with inventory and operational management modules as part of the development team.",
      "Developed and optimized frontend and backend functionality using HTML, CSS, JavaScript, Bootstrap, PHP, and MySQL.",
      "Worked with MySQL databases and improved database response efficiency through query optimization.",
      "Participated in debugging, testing, software enhancement, and feature implementation under senior developer supervision.",
    ],
    technologies: ["HTML5", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
  },
];

export const education: Education[] = [
  {
    institution: "Delhi Technical Campus",
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    startDate: "August 2021",
    endDate: "August 2025",
    grade: "8 CGPA",
    description: [
      "Completed a B.Tech in Computer Science Engineering with a Minor in Artificial Intelligence.",
      "Built a strong foundation in software development, programming, databases, computer systems, and problem-solving.",
      "Explored Artificial Intelligence and its applications alongside the core computer science curriculum.",
    ],
  },
  {
    institution: "Sahoday Sr Sec School",
    degree: "Senior Secondary",
    field: "Science (PCM)",
    startDate: "May 2019",
    endDate: "May 2021",
    grade: "80%",
    description: [
      "Completed Senior Secondary education in the Science stream with Physics, Chemistry, and Mathematics.",
      "Developed a strong analytical and mathematical foundation through the PCM curriculum.",
      "Built the academic foundation that led to my interest in computer science, programming, and technology.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "MERN Full Stack Development",
    issuer: "QSpiders",
    issueDate: "May 2026",
    credentialId: "JSP261457",

    description: [
      "Completed professional training focused on full-stack web development using MongoDB, Express.js, React, and Node.js.",
      "Developed practical understanding of building responsive frontend applications, backend services, REST APIs, database-driven applications, and complete web development workflows.",
      "Worked with JavaScript-based technologies across the frontend and backend, with emphasis on component-based UI development, server-side logic, CRUD operations, authentication, and database integration.",
    ],

    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "HTML & CSS",
      "Git",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/Ritzss",
    label: "GitHub",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ritanshu-babuta/",
    label: "LinkedIn",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    children: [
      { value: "react", label: "React" },
      { value: "nextjs", label: "Next.js" },
      { value: "typescript", label: "TypeScript" },
      { value: "javascript", label: "JavaScript" },
      { value: "tailwind", label: "Tailwind CSS" },
    ],
  },
  {
    label: "Backend",
    children: [
      { value: "nodejs", label: "Node.js" },
      { value: "express", label: "Express.js" },
      { value: "rest", label: "REST APIs" },
      { value: "auth", label: "Authentication & Authorization" },
    ],
  },
  {
    label: "Database",
    children: [
      { value: "mongodb", label: "MongoDB" },
      { value: "mongoose", label: "Mongoose" },
      { value: "indexing", label: "Database Indexing" },
    ],
  },
  {
    label: "Tools",
    children: [
      { value: "git", label: "Git" },
      { value: "github", label: "GitHub" },
      { value: "cloudinary", label: "Cloudinary" },
      { value: "vercel", label: "Vercel" },
    ],
  },
];

export const capabilities = [
  {
    number: "01",
    title: "REST APIs",
    description: "Building structured APIs for products, inventory, orders, users, and business workflows.",
    language: "typescript",
    color: "#F97316",
    code: `export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      productId,
      warehouseId,
      quantity,
      size,
    } = body;

    if (!productId || !warehouseId || !quantity) {
      return Response.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const inventory = await Inventory.findOne({
      productId,
      warehouseId,
      size,
    });

    if (!inventory) {
      return Response.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    inventory.stock += quantity;
    await inventory.save();

    return Response.json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`,
  },
  {
    number: "02",
    title: "Database Design",
    description: "Designing MongoDB schemas, indexes, queries, and data structures around real application workflows.",
    language: "typescript",
    color: "#3B82F6",
    code: `const inventorySchema = new Schema(
  {
    productId: {
      type: Number,
      required: true,
    },

    warehouseId: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

inventorySchema.index(
  {
    productId: 1,
    warehouseId: 1,
    size: 1,
  },
  {
    unique: true,
  }
);`,
  },
  {
    number: "03",
    title: "Authentication",
    description: "Building protected routes, JWT authentication, role-based access, and permission-driven workflows.",
    language: "typescript",
    color: "#8B5CF6",
    code: `export async function authenticateRequest(
  request: Request
) {
  const token = request.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  if (!token) return null;

  try {
    const payload = verifyToken(token);

    if (!payload?.userId) {
      return null;
    }

    const user = await Admin.findById(
      payload.userId
    );

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}`,
  },
  {
    number: "04",
    title: "React / Next.js UI",
    description: "Building reusable interfaces with React and Next.js, from interactive components to responsive production pages.",
    language: "tsx",
    color: "#61DAFB",
    code: `export function ProductCard({
  product,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] =
    useState(product.sizes[0]);

  const addToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.productId,
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <article className="group">
      <Link
        href={\`/product/\${product.productId}\`}
        className="block overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={600}
          height={800}
          className="transition-transform duration-500
            group-hover:scale-105"
        />
      </Link>

      <h3 className="mt-4 font-medium">
        {product.name}
      </h3>

      <button
        onClick={addToCart}
        className="mt-4 rounded-full
          bg-black px-5 py-2 text-white"
      >
        Add to Cart
      </button>
    </article>
  );
}`,
  },
  {
    number: "05",
    title: "Business Logic",
    description: "Turning business requirements into workflows that keep inventory, orders, users, and application state consistent.",
    language: "typescript",
    color: "#10B981",
    code: `const session = await mongoose.startSession();

try {
  session.startTransaction();

  const inventory = await Inventory.findOne({
    productId,
    warehouseId,
    size,
  }).session(session);

  if (!inventory || inventory.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  inventory.stock -= quantity;

  await inventory.save({ session });

  await StockMovement.create(
    [{
      productId,
      warehouseId,
      size,
      quantity,
      type: "OUT",
    }],
    { session }
  );

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}`,
  },
  {
    number: "06",
    title: "Integrations & Production",
    description: "Connecting applications with external services and handling the realities of production deployments.",
    language: "typescript",
    color: "#F43F5E",
    code: `const upload =
  await cloudinary.uploader.upload(
    fileBuffer,
    {
      folder: "products",
      resource_type: "auto",
    }
  );

const payment = await razorpay.orders.create({
  amount: total * 100,
  currency: "INR",
  receipt: orderId,
});

await sendEmail({
  to: customer.email,
  subject: "Order confirmation",
  template: "order-confirmation",
  data: {
    orderId,
    amount: total,
  },
});`,
  },
];

export const about: About = {
  eyebrow: "A little about me",
  heading: "I build things that actually work.",
  paragraphs: [
    "I'm an Associate Full Stack Developer focused on building production web applications and solving practical problems through software.",
    "My work spans frontend interfaces, backend APIs, databases, authentication, business logic, and the workflows that connect them. I enjoy working on products where the interface is only one part of the problem.",
    "I've worked on e-commerce platforms as well as internal business systems, giving me experience with both customer-facing experiences and the operational systems behind them.",
  ],
  closingStatement:
    "From interface to database, I like understanding how the whole thing fits together.",
};

export const contact: Contact = {
  email: "ritanshubabuta399@gmail.com",
  heading: "Let's build something worth building.",
  description:
    "Whether it's a product, a web application, or a problem that needs solving, I'm always interested in working on meaningful software.",
};

export const beyond: BeyondData = {
  intro: {
    eyebrow: "08 / Beyond the Code",
    title: "More than just software.",
    description:
      "A closer look at the things I enjoy, the things I am curious about, and the interests that exist outside of building software.",
  },

  interests: [
    {
      id: "badminton",
      number: "01",
      title: "Badminton",
      description:
        "A sport I enjoy for the competition, movement, and the simple excuse to get away from a screen for a while.",
    },

    {
      id: "swimming",
      number: "02",
      title: "Swimming",
      description:
        "Something I enjoy for the combination of exercise, focus, and switching off from everything else for a while.",
    },

    {
      id: "space",
      number: "03",
      title: "Space",
      description:
        "I have always been fascinated by space, astronomy, planets, stars, and the sheer scale of the universe.",
    },

    {
      id: "nature",
      number: "04",
      title: "Nature",
      description:
        "Wildlife, ecosystems, dinosaurs, and the natural world. There is a lot to be curious about outside the human-built world.",
    },

    {
      id: "movies-series",
      number: "05",
      title: "Movies & Series",
      description:
        "A mix of action, adventure, science fiction, crime, comedy, documentaries, and some wonderfully ridiculous movies.",
      media: [
        {
          title: "Transformers",
          type: "movie",
          tmdbId: 1858,
          image:
            "https://image.tmdb.org/t/p/w500/fg2EyGLnIRmiH4TieHu4MoH08Q0.jpg",
        },
        {
          title: "Pirates of the Caribbean",
          type: "movie",
          tmdbId: 22,
          image:
            "https://image.tmdb.org/t/p/w500/z8onk7LV9Mmw6zKz4hT6pzzvmvl.jpg",
        },
        {
          title: "The Wolverine",
          type: "movie",
          tmdbId: 76170,
          image:
            "https://image.tmdb.org/t/p/w500/8lzmovtARDXnE7kTDOum02i6fXv.jpg",
        },
        {
          title: "Sharknado",
          type: "movie",
          tmdbId: 205774,
          image:
            "https://image.tmdb.org/t/p/w500/atEmHkVFTSGRYt2PeCiziQqbZnI.jpg",
        },
        {
          title: "The Mentalist",
          type: "series",
          tmdbId: 5920,
          image:
            "https://image.tmdb.org/t/p/w500/eT0D3GkAnq0AjA9ok0KE1GfGQhA.jpg",
        },
        {
          title: "Brooklyn Nine-Nine",
          type: "series",
          tmdbId: 48891,
          image:
            "https://image.tmdb.org/t/p/w500/hgRMSOt7a1b8qyQR68vUixJPang.jpg",
        },
        {
          title: "The Rookie",
          type: "series",
          tmdbId: 79744,
          image:
            "https://image.tmdb.org/t/p/w500/bL1mwXDnH5fCxqc4S2n40hoVyoe.jpg",
        },
        {
          title: "Our Planet",
          type: "series",
          tmdbId: 83880,
          image:
            "https://image.tmdb.org/t/p/w500/wRSnArnQBmeUYb5GWDU595bGsBr.jpg",
        },
        {
          title: "The Dinosaurs",
          type: "series",
          tmdbId: 313298,
          image:
            "https://image.tmdb.org/t/p/original/j64Q18ABQibT4rsy4Gpz2kU0hJY.jpg",
        },
      ],
    },
  ],

  currentlyExploring: [
    {
      id: "advanced-typescript",
      title: "Advanced TypeScript",
      description:
        "Going deeper into type-safe application architecture, reusable types, generics, utility types, and patterns that make larger codebases easier to maintain.",
      focus: ["Generics", "Utility Types", "Type-safe APIs", "Architecture"],
    },

    {
      id: "nextjs",
      title: "Next.js",
      description:
        "Exploring deeper patterns around the App Router, server and client boundaries, rendering strategies, caching, performance, and production application architecture.",
      focus: ["App Router", "Server Components", "Caching", "Performance"],
    },

    {
      id: "react-native",
      title: "React Native",
      description:
        "Learning how to take the component-driven approach I use on the web into mobile applications while understanding navigation, device capabilities, and platform-specific behaviour.",
      focus: ["Expo", "Navigation", "Native APIs", "Mobile UI"],
    },

    {
      id: "system-design",
      title: "System Design",
      description:
        "Developing a better understanding of how applications scale beyond individual features, including architecture, data flow, caching, APIs, databases, and reliability.",
      focus: ["Architecture", "Scalability", "Databases", "Caching"],
    },

    {
      id: "devops",
      title: "DevOps",
      description:
        "Learning more about the journey between writing code and reliably running it in production, including deployments, CI/CD, environments, monitoring, and cloud infrastructure.",
      focus: ["CI/CD", "Deployment", "Monitoring", "Cloud"],
    },

    {
      id: "ai-assisted-development",
      title: "AI-assisted Development",
      description:
        "Exploring how AI tools can fit into real development workflows for research, debugging, prototyping, documentation, and improving development speed without replacing engineering judgement.",
      focus: ["AI Tools", "Code Assistance", "Debugging", "Workflow"],
    },
  ],

  personalNote: {
    eyebrow: "05 / Beyond Software",
    title:
      "Building software is what I do. Curiosity is what keeps me doing it.",
  },
};
